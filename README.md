# AIDLC App

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

A production-ready full-stack JavaScript application built with Node.js and Express, deployable on [Render.com](https://render.com).

---

## Local Development

```bash
# Install dependencies
npm install

# Start with hot-reload (Node.js >= 18 required)
npm run dev

# Or start normally
npm start
```

The server starts on [http://localhost:3000](http://localhost:3000) by default.

---

## Deploy to Render

### Option A – Manual

1. Push this repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Web Service**.
3. Connect this repository.
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Create Web Service**.

### Option B – Blueprint (one-click)

A `render.yaml` file is included. Click the **Deploy to Render** badge above or go to the Render Dashboard and import this repo as a Blueprint.

---

## API Endpoints

| Method | Path           | Description                              |
|--------|----------------|------------------------------------------|
| GET    | `/api/health`  | Returns service health and UTC timestamp |
| GET    | `/api/message` | Returns a greeting message from backend  |

---

## Environment Variables

| Variable   | Default | Description                              |
|------------|---------|------------------------------------------|
| `PORT`     | `3000`  | Port the server listens on               |
| `NODE_ENV` | —       | Set to `production` in Render deployment |

---

## Project Structure

```
aidlc-gh/
├── package.json      # Dependencies and scripts
├── server.js         # Express entry point
├── render.yaml       # Render Blueprint configuration
├── .gitignore
├── public/
│   ├── index.html    # SPA shell
│   ├── style.css     # Modern styles
│   └── app.js        # Vanilla JS frontend
└── README.md
```
