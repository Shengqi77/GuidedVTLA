"""Render PDF pages 1-11 as a single clickable website preview strip."""
import argparse
from pathlib import Path
import fitz
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument("pdf", type=Path)
args = parser.parse_args()
out = Path(__file__).resolve().parents[1] / "assets"
with fitz.open(args.pdf) as doc:
    if len(doc) < 11:
        raise ValueError("The paper must contain at least 11 pages.")
    thumbs = []
    for page in list(doc)[:11]:
        pix = page.get_pixmap(matrix=fitz.Matrix(280 / page.rect.width, 280 / page.rect.width), alpha=False)
        thumbs.append(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))
gap, pad = 10, 8
height = max(im.height for im in thumbs) + 2 * pad
width = sum(im.width for im in thumbs) + gap * 10 + 2 * pad
strip = Image.new("RGB", (width, height), "#faf6f8")
x = pad
for im in thumbs:
    strip.paste(im, (x, pad))
    x += im.width + gap
strip.save(out / "paper-pages-01-11.webp", quality=90)
print("Preview:", width, height, "pages:", len(thumbs))
