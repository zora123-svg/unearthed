# UnEarthed

UnEarthed is a small gift-browsing web app. A Node.js and Express server provides the gift data, and a browser client fetches that data and displays it as a list of gift cards with a detail page for each gift.

## Why this project exists

This project is part of a lab that I am using to study client and server architecture and to pick up Node.js and Express.js. The app is intentionally small so the focus stays on how the two sides fit together:

- How a client and a server are separated and communicate over HTTP
- How to create a Node.js server and define routes with Express
- How to organize routes with `express.Router`
- How to serve static files with `express.static` middleware
- How a client uses `fetch` to request JSON and build the page from it
- How a Vite build produces production files for the server to host

## Tech stack

| Part | Tools |
| --- | --- |
| Server | Node.js, Express 5, nodemon |
| Client | HTML, CSS, vanilla JavaScript, Vite |

Gift data is stored in a JavaScript module, `server/data/gifts.js`, so there is no database to set up.

## Project structure

```
unearthed/
├── client/              # Front end
│   ├── index.html       # Gift list page
│   ├── public/          # Detail and 404 pages, browser scripts, logo
│   ├── src/style.css    # Styles
│   └── vite.config.js   # Build output and dev proxy settings
└── server/              # Back end
    ├── server.js        # Express app and entry point
    ├── routes/gifts.js  # Routes under /gifts
    ├── data/gifts.js    # Gift data
    └── public/          # Client build output served by Express
```

## How the client and server interact

1. The browser loads a page from the client.
2. The page's script calls `fetch('/gifts')`.
3. Express handles the request and responds with the gift data as JSON.
4. The script uses the JSON to create the page content.

During development, the Vite dev server forwards `/gifts` requests to the Express server on port 3001, so the client can use relative URLs.

## Server routes

| Method | Path | Response |
| --- | --- | --- |
| `GET` | `/` | HTML heading that identifies the API |
| `GET` | `/gifts` | All gifts as JSON |
| `GET` | `/gifts/:giftId` | The gift detail page, which loads that gift's data in the browser |

## Running locally

You need [Node.js](https://nodejs.org/) and npm installed.

Start the server in one terminal:

```bash
cd server
npm install
npm start
```

The server runs at `http://localhost:3001` unless the `PORT` environment variable is set. If you change the port, also update the proxy target in `client/vite.config.js`.

Start the client in a second terminal:

```bash
cd client
npm install
npm run dev
```

Then open the local URL that Vite prints in the terminal.

## Building the client

```bash
cd client
npm run build
```

The production files are written to `server/public`. This replaces everything already in that folder.
