const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const cookieSession = require("cookie-session");

const config = require("./config");
const passport = require("./passport");
const authRouter = require("./routes/auth.router");
const checkLoggedIn = require("./functions/checkLoggedIn");

const app = express();

app.use(helmet());

app.use(morgan("dev"));

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/auth", authRouter);

app.get("/secret", checkLoggedIn, (req, res) => {
  res.json({ secret: "hello" });
});

app.get("/failure", (req, res) => {
  return res.send("Failed to log in!");
});

module.exports = app;
