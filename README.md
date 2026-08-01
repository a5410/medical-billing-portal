# ClearBill Health Portal Prototype

A static React/Vite single-page application that demonstrates a transparent, consolidated medical billing patient experience. All patients, providers, charges, insurance information, and documents are fictional.

## Features

- Episode-centered patient dashboard
- Interactive billing progress timeline
- Consolidated bill with category and line-item drill-down
- Plain-English charge explanations
- Insurance status and activity
- Messages and documents
- Scenario switcher for normal processing, authorization delay, denial/appeal, and patient action required
- Responsive layout
- GitHub Pages deployment workflow

## Run locally

Install Node.js 20 or newer, then run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a new public GitHub repository, such as `medical-billing-portal`.
2. Upload or push all project files to the repository's `main` branch.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open the **Actions** tab and allow the included workflow to finish.
6. The deployment URL will appear in the workflow summary and in **Settings → Pages**.

The included workflow automatically sets Vite's base path to the repository name, builds the application, and deploys the `dist` directory.

## Important

GitHub Pages is public static hosting. Do not add real patient data, protected health information, passwords, payment credentials, API secrets, or production authentication tokens.
