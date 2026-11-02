# Durasab website

Static site, no build step. Open `index.html` in a browser or upload the whole folder to any web host.

## Structure
- `index.html` home page; `projects.html` filterable project gallery
- `css/style.css` all styles (colour and type tokens at the top, under `:root`)
- `js/main.js` animations and interactions; `js/projects.js` gallery filters
- `js/data.js` editable content: service descriptions, departures-board cities, project list
- `js/vendor/` GSAP 3.12.5 and ScrollTrigger (local copies, no CDN needed)
- `fonts/` Big Shoulders Display and Instrument Sans (self-hosted, SIL Open Font License)
- `images/projects/` project photos; `images/brand/` logo mark and favicon

## Adding a project
Drop a JPG into `images/projects/`, then add a line to `projects` in `js/data.js`:
`{ img: "file-name-without-.jpg", title: "Client", type: "Island stand", cat: "stands" }`
Categories: stands, kiosks, stages, malls, roadshows.

## Before launch
- Replace `hello@durasab.com` and `+971 0 000 0000` (search for TODO in `index.html` and `js/main.js`).
- Confirm the figures (18+ years, 72K+ sqm, 450+ clients, 92+ brands), office addresses and client names.
- Swap in higher-resolution photos where available (current ones are taken from the PDF, about 900px).
- The contact form opens the visitor's email app. To receive submissions directly, connect it to a form service (Formspree, Netlify Forms) or your own backend.
