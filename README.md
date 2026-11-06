# Eventora — Event Management Website

A responsive event discovery and registration website built with **HTML5, CSS3 and vanilla JavaScript**.

## Features
- Responsive landing page for mobile, tablet and desktop.
- Event cards with date, category, venue, image and description.
- Live search across event title, category, venue and description.
- Category filters.
- Event details modal with a registration call-to-action.
- Registration form with JavaScript validation for name, email, phone and event selection.
- Successful registration confirmation.
- Registrations saved in browser `localStorage`.
- Dark/light theme toggle (theme preference is also saved).
- Mobile navigation, modal close controls and keyboard support.

## Run locally
No build tools or dependencies are required.

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a browser.

For a local development server, use the VS Code **Live Server** extension and click **Go Live**.

## Project structure
```text
eventora-event-management/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Customize the events
Edit the `events` array near the top of `script.js`. Each event contains:
- `title`, `category`, `date`, `time`, `venue`
- `price`, `image`, `short`, `description`

Use image URLs that you have permission to use. The demo currently uses remote Unsplash images.

## Registration data
This is a front-end demo. Submissions are stored only in the visitor's browser using the `eventoraRegistrations` localStorage key. They are not sent to a server and are not shared between devices or browsers.

To inspect saved registrations, open browser DevTools → Console and run:
```js
JSON.parse(localStorage.getItem("eventoraRegistrations") || "[]")
```

For a production website, connect the form to a backend/API and database. Do not store sensitive personal information in localStorage.

## Deploy
### GitHub Pages
1. Create a GitHub repository and push these files.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.
5. Wait for the deployment URL to appear in the Pages section.

### Netlify
1. Sign in to Netlify and choose **Add new site → Import an existing project**.
2. Connect the GitHub repository.
3. Leave build command blank and publish directory as `.`.
4. Deploy the site.

## Git commands
```bash
git init
git add .
git commit -m "Build Eventora event management website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example remote URL with your own GitHub repository URL.
