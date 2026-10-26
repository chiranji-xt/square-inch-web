"""Extract the embedded photographs from the client's portfolio PDF.

Usage: python scripts/extract-pdf-images.py "<portfolio.pdf>" portfolio-assets
Requires PyMuPDF (pip install pymupdf). Originals are written untouched
(embedded streams are saved as-is where possible) into one folder per
portfolio section, plus portfolio-assets/inventory.csv.
Repeated logo/decoration images (same xref on many pages) are skipped.
"""
import csv
import hashlib
import sys
from collections import Counter
from pathlib import Path

import pymupdf

# PDF page ranges (1-based, inclusive) -> section folder
SECTIONS = [
    ((1, 4), "front-matter"),
    ((5, 7), "abstract"),
    ((8, 12), "art-deco"),
    ((13, 14), "contemporary"),
    ((15, 16), "fusion"),
    ((17, 23), "traditional"),
    ((24, 29), "luxury"),
    ((30, 33), "minimalistic"),
    ((34, 36), "rustic"),
    ((37, 38), "traditional"),
    ((39, 41), "achievement"),
    ((42, 42), "contact"),
]


def section_for(page_no):
    for (a, b), name in SECTIONS:
        if a <= page_no <= b:
            return name
    return "misc"


def main(pdf_path, out_dir):
    doc = pymupdf.open(pdf_path)
    out = Path(out_dir)
    # xrefs that appear on more than 3 pages are logos / watermarks
    usage = Counter()
    for page in doc:
        for im in page.get_images(full=True):
            usage[im[0]] += 1
    seen = {}
    rows = []
    counters = Counter()
    for page in doc:
        pno = page.number + 1
        sec = section_for(pno)
        for im in page.get_images(full=True):
            xref, w, h = im[0], im[2], im[3]
            if usage[xref] > 3 or (w < 200 and h < 200):
                continue
            info = doc.extract_image(xref)
            data, ext = info["image"], info["ext"]
            digest = hashlib.md5(data).hexdigest()
            if digest in seen:
                rows.append([seen[digest], "", sec, pno, w, h, ext, "duplicate of " + seen[digest]])
                continue
            counters[sec] += 1
            name = f"{sec}-p{pno:02d}-{counters[sec]:02d}.{ext}"
            folder = out / sec
            folder.mkdir(parents=True, exist_ok=True)
            (folder / name).write_bytes(data)
            seen[digest] = name
            rows.append([name, f"xref {xref}", sec, pno, w, h, ext, ""])
    with open(out / "inventory.csv", "w", newline="", encoding="utf-8") as f:
        wr = csv.writer(f)
        wr.writerow(["file", "source", "section", "pdf_page", "width", "height", "format", "note"])
        wr.writerows(rows)
    print(f"{len(seen)} unique images, {len(rows) - len(seen)} duplicates -> {out}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
