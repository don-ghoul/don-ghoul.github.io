# Benchmark ERS Marketing Site

This is a static website built for GitHub Pages.

## Files
- `index.html` (Home)
- `about.html` (About)
- `contact.html` (Contact)
- `assets/styles.css` (shared styles)
- `assets/main.js` (content rendering + contact form validation)
- `content/siteCopy.js` (all editable text)
- `assets/img/` (local placeholder images)

## Edit website text (non-technical workflow)
1. Open `content/siteCopy.js`.
2. Find the comment `EDIT TEXT HERE`.
3. Update the wording inside the `window.BenchmarkERSCopy` object.
4. Save and refresh the page.

## Preview locally
1. Double-click `index.html`, or open it in a browser.
2. Navigate to About and Contact using the top navigation.

## Publish on GitHub Pages
1. Push this repository to GitHub.
2. In GitHub, open `Settings` for the repo.
3. Open `Pages`.
4. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
5. Click **Save**.
6. Wait for GitHub to publish and open the site URL shown in Pages settings.

No build step, package manager, or deployment script is required.

## Enable real email submissions from Contact form (Formspree)
This site already includes the submit logic. You only need to add your endpoint.

1. Create a free form at Formspree and verify your destination email.
2. Copy your endpoint URL (looks like `https://formspree.io/f/xxxxx`).
3. Open `content/siteCopy.js`.
4. Find:
```js
delivery: {
  provider: "Formspree",
  endpoint: "REPLACE_WITH_FORMSPREE_ENDPOINT"
}
```
5. Replace `REPLACE_WITH_FORMSPREE_ENDPOINT` with your real Formspree URL.
6. Save, then test locally from `contact.html`.
7. Push to GitHub; the same endpoint will work on GitHub Pages.

Notes:
- Keep `shared.contact.emailHref` set to your real email as fallback.
- If endpoint is not set, the page will show a clear “not configured” message and keep the mailto fallback.
