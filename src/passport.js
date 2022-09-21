const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const config = require("./config");

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile: ", profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Read the session from the cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});

module.exports = passport;
