const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const User = require("../models/user-model");
const URL = require("./URL");
const { default: axios } = require("axios");

require("dotenv").config();

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

// serialize the user.id to save in the cookie session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    })
    .catch((err) => {
      console.error("Error during deserialization:", err);
      done(err);
    });
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const response = await axios.post(URL.Verify_URL, {
          access_token_key: token,
          access_token_secret: tokenSecret,
        });
        const twitterAccess = response.data.tokens.access;

        const currentUser = await User.findOneAndUpdate(
          { twitterId: profile._json.id_str },
          {
            $set: {
              name: profile._json.name,
              screenName: profile._json.screen_name,
              profileImageUrl: profile._json.profile_image_url,
              twitterAccess: twitterAccess,
            },
          },
          { new: true, upsert: true }
        );

        done(null, currentUser);
      } catch (err) {
        console.error("Error during authentication:", err);
        done(err);
      }
    }
  )
);
