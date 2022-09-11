const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/auth/google", (req, res) => {});

app.get("/auth/google/callback", (req, res) => {});

app.get("/auth/logout", (req, res) => {});

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return res.status(401).json({ error: "You must log in" });
  }
  next();
}

app.get("/secret", checkLoggedIn, (req, res) => {
  res.json({ secret: "hello" });
});

module.exports = app;
