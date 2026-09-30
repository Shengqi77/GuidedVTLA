"""Render author-owned PDF figures into web assets. No visual content is synthesized."""
import argparse
from pathlib import Path
import fitz
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('figure_dir', type=Path)
args = parser.parse_args()
out = Path(__file__).resolve().parents[1] / 'assets'
out.mkdir(exist_ok=True)
for source, name, width in [
    ('fig01_overview.pdf', 'overview.webp', 1800),
    ('fig02_framework.pdf', 'method.webp', 2000),
    ('fig05_platform_tasks.pdf', 'platforms.webp', 1800),
]:
    with fitz.open(args.figure_dir / source) as doc:
        page = doc[0]
        pix = page.get_pixmap(matrix=fitz.Matrix(width / page.rect.width, width / page.rect.width), alpha=False)
        Image.frombytes('RGB', (pix.width, pix.height), pix.samples).save(out / name, 'WEBP', quality=92)
        print(name, pix.width, pix.height, (out / name).stat().st_size)
