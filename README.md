# GuidedVTLA website

A lightweight, responsive research project page. Pure HTML, CSS and JavaScript; no build system, CDN dependency or framework.

## Preview locally

Run from this directory:

```bash
python -m http.server 8088 --bind 127.0.0.1
```

Open http://127.0.0.1:8088. You can also open index.html directly.

## Current version

- Warm white, charcoal and restrained #c1272d accents.
- Original paper overview with three manually selectable design explanations.
- Original method figure with three-step text guidance. Scanning boxes were removed after design review.
- Optional real-video hero via media-config.js, with pause, offscreen pause and reduced-motion support.
- Interactive six-task / eight-task UniVTAC comparisons; scopes are kept separate.
- Paper figures serve as honest still-image placeholders until task videos arrive.
- No fabricated robot videos, tactile measurements or runtime frequencies.
- No paper PDF or source manuscript is included in this repository.
- Author and citation metadata are intentionally pending.

This is a **design preview**, not a finalized publication site. The robots meta tag currently disables indexing. Check the figures against the final manuscript before release.

## Files

- index.html: page sections and manuscript-derived text
- style.css: layout, design tokens, responsive behavior
- app.js: figure highlights, playback and matched-scope results
- media-config.js: optional real robot hero video and poster paths
- video.css: hero video styles and static figure presentation
- assets/: WebP versions of the paper figures and project icon
- SITE_PLAN_ZH.md: design references, animation plan and prioritized asset checklist
- scripts/export_assets.py: reproducible PDF figure conversion (requires PyMuPDF and Pillow)

No third-party project assets or website source are copied. Figure ownership remains with the paper authors.

## GitHub

Target repository: https://github.com/Shengqi77/GuidedVTLA-web

For GitHub Pages, after final media and author review: Settings → Pages → Deploy from a branch → main → /(root). All asset paths are relative and work under /GuidedVTLA-web/. Publication is a separate step from preparing the preview.

## Before publishing

1. Replace robot figure with a real video montage with a poster image; retain a visible play/pause button.
2. Supply final author list, affiliations, paper URL and verified BibTeX.
3. Recheck quantitative claims against the final paper.
4. Confirm original figure labels, equations and frequencies match the final method.
5. Add accessible captions to videos, record playback speed and identify simulation footage.
6. Remove the preview messages and noindex only when the page is ready.
