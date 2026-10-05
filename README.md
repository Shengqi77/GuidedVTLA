# GuidedVTLA website

Static research website built with HTML, CSS and JavaScript. No build step is required.

## Local preview

Run `python -m http.server 8088 --bind 127.0.0.1` from this directory, then open http://127.0.0.1:8088.

## Current version (October 5, 2026)

- Full-width video hero with matching pastel-gradient GuidedVTLA wordmarks.
- Top-center More Related Research dropdown linking four related projects.
- Paper, arXiv and Code are Coming soon placeholders without outbound links.
- Paper-order narrative: overview, method, tactile dynamics, spectral analysis, setup, qualitative and quantitative results, robustness and cross-sensor evaluation.
- Five independent task carousels contain 17 clips cut from the supplied 4K demo. The website serves 1080p H.264 derivatives.
- Videos loop silently while visible, pause offscreen, and respect reduced-motion preferences.
- Quantitative results use tables only. Real-world scores show final-stage success rates over 20 trials per task. Their six-task mean is computed from final-stage scores. Simulation reports shared-six-task and complete-eight-task means separately. Missing entries are not zeros.
- Warm off-white background and restrained blue table highlighting. Bold marks column-best values including ties.
- No manuscript PDF or private training files are included.

## Active files

- `index.html`: content, metadata, result tables and resource buttons.
- `project.css/js`: base layout and figure zoom.
- `hero.css/js`: video hero and playback behavior.
- `story.css`, `identity.css`: paper narrative and title/author presentation.
- `tasks.css/js`: task video carousels and autoplay.
- `quantitative.css`: result tables and background.
- `related.css/js`: related-project dropdown.
- `resources.css`: placeholder resource buttons.
- `assets/tasks/`: 17 task video clips and posters.
- `assets/hero-montage.mp4`: silent 12-second montage.
- `scripts/export_assets.py`: author-owned PDF figure conversion (PyMuPDF and Pillow).

Legacy `style.css`, `app.js`, `video.css` and `media-config.js` are retained but not loaded. Local chapter-length videos under `assets/demos/` and local preview files are not needed or included in this update.

## Hosting

Repository: https://github.com/Shengqi77/GuidedVTLA-web

For GitHub Pages, use Settings > Pages > Deploy from a branch > main > /(root).
All asset paths are relative and support the /GuidedVTLA-web/ project path.

The robots meta tag still disables indexing while release links are pending. Replace resource placeholders with verified URLs and add the final citation when ready.

## Visual references

Layout references include RVD, DP3, Seeing Touch from Motion, 4K4D, OptiWorld, T-Rex, Touch in the Wild and ActiveMimic. Implementations are original; third-party videos and website source are not bundled. Media belongs to the paper authors.
