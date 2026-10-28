# Thasneem A. — Search × Intelligence Portfolio

A custom, responsive static portfolio preserving the original editorial dark/cream/coral visual direction and motion system, now updated with the resume, supplied portfolio documentation, photos, project screenshots, certificate previews, and dedicated case-study pages.

## Run locally in VS Code

1. Extract the ZIP and open the extracted project folder in VS Code.
2. Open **Terminal → New Terminal** in VS Code. Confirm the terminal is in the folder containing `index.html`.
3. Run one of these commands:

   **Windows**
   ```bash
   py -m http.server 8000
   ```

   **macOS / Linux**
   ```bash
   python3 -m http.server 8000
   ```

   If `python` is available, `python -m http.server 8000` also works.
4. Open `http://localhost:8000` in your browser.
5. Stop the server with `Ctrl+C` in the terminal.

This is a static HTML/CSS/JavaScript website. It does not require `npm install`, React, or a build step.

## Files and structure

- `index.html` — homepage, hero, about, expertise, skills, projects, work history, education, languages, certificates, contact
- `styles.css` — responsive layouts, theme, animations, reduced-motion support
- `script.js` — mobile navigation, scroll reveal, project filters, cursor and ambient canvas
- `projects/` — individual pages for the SEO work and six technical/product projects
- `assets/thasneem-hero.jpg` — second supplied photo, featured prominently in the homepage hero
- `assets/thasneem-professional.jpg` — first supplied photo, used in About
- `assets/thasneem-resume.pdf` — downloadable original resume
- `assets/project-screenshots/` — all five screenshots extracted from the portfolio document and mapped to their matching project/work section
- `assets/certificates/` — INMAKES internship certificate, M Squared experience letter, and Building Web Applications in PHP certificate previews

## Source-backed project links

- Salon ERP: https://formsaloonerp.invendoi.com/
- Salon Web Application: https://form.invendoi.com/
- Video-Based Motion Detection & Object Tracking System: https://github.com/Thasni121/Video-Based-Motion-Object-Tracking-System
- AI-Powered CCTV Surveillance and Video Analytics System: https://github.com/Thasni121/AI-CCTV-surveillance-system-
- GitHub profile: https://github.com/Thasni121
- LinkedIn: https://www.linkedin.com/in/thasneem-a-11b042297
- Earlier website: https://thasneem-samad.lovable.app

The resume describes the Tailoring Haggling Economizing System and Face Blurring Social Entertainment Platform, but the supplied files did not contain their live URLs, GitHub repository URLs, or screenshots. Those pages therefore show accurate resume descriptions and clearly state that links/screenshots were not supplied, rather than inventing them.

The portfolio document contains the SEO/local-search report screenshot, salon dashboard and public website screenshots, a video-tracking annotated frame, a traffic-scene image under the CCTV project, the INMAKES internship certificate, M Squared experience letter, and University of Michigan PHP certificate. The images are assigned according to their placement/context in the source document. NPTEL Cloud Computing is listed because it appears in the resume; its certificate image was not included in the supplied files.

Two Drive URLs supplied earlier are preserved under “Additional Shared Documents” with neutral labels because their exact document titles could not be confirmed from the uploaded materials:
- https://drive.google.com/file/d/17AXrRDlewJBHls555DAX39avZMretm8i/view?usp=drive_link
- https://drive.google.com/file/d/1qw6q7yTXuSfHMyBU5Fjf-apCU__kf2l4/view?usp=drive_link

## Publish later

This is a zero-build static site. Commit the contents of this folder to GitHub. In Vercel, import the repository, choose **Other** as the Framework Preset, leave the build command empty, and set the output directory to `.` (the repository root).

## Notes

- No unverified rankings, marketing performance results, or extra project links are claimed.
- The supplied local-search screenshot is shown as source evidence, not a promise of results.
- The site includes responsive desktop/tablet/mobile styles, keyboard focus states, a skip link, accessible mobile navigation, and `prefers-reduced-motion` support.
