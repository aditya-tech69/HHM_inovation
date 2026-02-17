# HHM Innovation – The Art of the Table

Production‑ready marketing site for **HHM Innovation**, deployed on Vercel.

## Structure

- `stitch/` – **production frontend + serverless API**
  - `index.html` – main marketing homepage (Vercel entry)
  - `stories.html` – brand stories page
  - `craftsmanship.html` – craftsmanship/process page
  - `main.js` – lightweight frontend logic (cart + booking form)
  - `api/` – Vercel serverless functions
    - `bookings.js` – POST `/api/bookings` (private viewing requests)
    - `health.js` – GET `/api/health` (simple status check)
    - `products.js` – GET `/api/products` (example product data)

- `backend/` – optional local Express server (not required for Vercel).

## Local development

You can open the static site directly or serve it:

```bash
cd stitch
# Option 1: open index.html in a browser
# Option 2: run a static server
npx serve .
```

For local API using Express (optional):

```bash
cd backend
npm install
npm start
```

Then update `main.js` to call `http://localhost:4000/api/bookings` if you want to use the Express backend instead of Vercel functions.

## Deploying to Vercel

1. Connect this repo on Vercel.
2. Set **Root Directory** to `stitch`.
3. Framework preset: **Other**.
4. No build command needed – Vercel serves `index.html` and `api/*` directly.

After each push to `main`, Vercel will:

- Serve the site at `https://<project>.vercel.app`
- Expose the API routes:
  - `GET /api/health`
  - `GET /api/products`
  - `POST /api/bookings`

