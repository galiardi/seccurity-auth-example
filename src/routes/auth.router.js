const { Router } = require("express");
const passport = require("../passport");

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  })
);

authRouter.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});

module.exports = authRouter;
