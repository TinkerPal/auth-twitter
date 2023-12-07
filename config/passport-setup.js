const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const keys = require("./keys");
const User = require("../models/user-model");
const URL = require("./URL");
const { default: axios } = require("axios");

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((e) => {
//       done(new Error("Failed to deserialize an user"));
//     });
// });

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
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      // console.log(token);
      // console.log(tokenSecret);
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
          { new: true, upsert: true } // Creates a new user if not found
        );

        done(null, currentUser);
      } catch (err) {
        console.error("Error during authentication:", err);
        done(err);
      }
    }
  )
);

//     async (token, tokenSecret, profile, done) => {
//       try {
//         const response = await axios.post(URL.Verify_URL, {
//           access_token_key: token,
//           access_token_secret: tokenSecret,
//         });
//         const twitterAccess = response.data.tokens.access;

//         const currentUser = await User.findOneAndUpdate(
//           { twitterId: profile._json.id_str },
//           { $set: { twitterAccess: twitterAccess } },
//           { new: true, upsert: true } // Creates a new user if not found
//         );

//         done(null, currentUser);
//       } catch (err) {
//         console.error("Error during authentication:", err);
//         done(err);
//       }
//     }
//   )
// );

//     async (token, tokenSecret, profile, done) => {
//       const response = await axios.post(URL.Verify_URL, {
//         access_token_key: token,
//         access_token_secret: tokenSecret,
//       });
//       const twitterAccess = response.data.tokens.access;
//       // console.log(twitterAccess);

//       try {
//         const currentUser = await User.findOne({
//           twitterId: profile._json.id_str,
//         });

//         if (currentUser) {
//           // // If the user exists, simply pass the user data to done()
//           // const updatedUser = {
//           //   ...currentUser.toObject(), // Convert Mongoose model to a plain JavaScript object
//           //   twitterAccess: twitterAccess,
//           // };
//           done(null, currentUser);
//         } else {
//           // Create a new user and pass the new user data to done()
//           const newUser = await new User({
//             name: profile._json.name,
//             screenName: profile._json.screen_name,
//             twitterId: profile._json.id_str,
//             profileImageUrl: profile._json.profile_image_url,
//             twitterAccess: twitterAccess,
//             // Add any other necessary fields here
//           }).save();

//           done(null, newUser);
//         }
//       } catch (err) {
//         console.error("Error during authentication:", err);
//         done(err);
//       }
//     }
//   )
// );
