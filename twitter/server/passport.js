import { configTwitter } from './keys';

const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');

module.exports = () => {
  passport.use(
    new TwitterTokenStrategy(
      {
        consumerKey: configTwitter.twitter.consumerKey,
        consumerSecret: configTwitter.twitter.consumerSecret,
      },
      (token, tokenSecret, profile, cb) => {
        cb(null, profile);
      },
    ),
  );
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
