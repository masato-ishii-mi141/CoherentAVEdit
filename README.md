# AVEdit Project Page

Static project page for "Coherent Audio-Visual Editing via Conditional Audio Generation Following Video Edits"
(ECCV 2026, under review). No build step — plain HTML/CSS/JS.

## Before publishing

- `images/ablation_study.png` is not included yet. Export `ECCV_2026_AVEdit/fig/lpaps_vs_imagebind_both_ablation.pdf`
  as a PNG or SVG and place it at `images/ablation_study.png`. Until then the page shows a text fallback instead of
  the figure.

## Publish to GitHub Pages

1. Create a new GitHub repository (or reuse the code repo) and push this folder's contents to it:
   ```
   git remote add origin <your-repo-url>
   git add .
   git commit -m "Add project page"
   git push -u origin main
   ```
2. In the repo, go to **Settings &gt; Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", pick the branch (e.g. `main`) and
   `/ (root)` folder, then save.
4. The page will be published at `https://<user-or-org>.github.io/<repo>/` after a minute or two.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static file server so relative
video paths resolve correctly.
