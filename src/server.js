import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App.jsx";

const PORT = 3000;

function page() {
  const component = ReactDOMServer.renderToString(<App />);
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <script defer src="/static/main.js"></script>
    </head>
    <body>
      <div id="root">${component}</div>
    </body>
    </html>
  `;
}

const app = express();

app.get("/", (_req, res) => {
  const html = page();
  res.send(html);
});

const publicDir = path.resolve(__dirname, "public");
app.use("/static", express.static(publicDir));

app.listen(PORT);
