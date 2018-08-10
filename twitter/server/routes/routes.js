import express from 'express';
import { configTwitter } from '../keys';
import { generateToken, sendToken } from '../utils/token.utils';

const request = require('request');
const hmacsha1 = require('hmacsha1');
const passport = require('passport');

require('../passport')();

const router = express.Router();

router.route('/auth/twitter/reverse').post((req, res) => {
  request.post(
    {
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: configTwitter.twitter.callBack,
        consumer_key: configTwitter.twitter.consumerKey,
        consumer_secret: configTwitter.twitter.consumerSecret,
      },
    },
    (err, r, body) => {
      if (err) {
        res.send(500, { message: 'error conection' });
      }
      const JsonStr = `{ "${body
        .replace(/&/g, '", "')
        .replace(/=/g, '": "')}"}`;
      res.send(JSON.parse(JsonStr));
    },
  );
});

router.route('/auth/twitter').post(
  (req, res, next) => {
    request.post(
      {
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: configTwitter.twitter.consumerKey,
          consumer_secret: configTwitter.twitter.consumerSecret,
          token: req.query.oauth_token,
        },
        form: { oauth_verifier: req.query.oauth_verifier },
      },
      (error, r, body) => {
        if (error) {
          res.send(500, { message: error.message });
        }
        const BodyString = `{ "${body
          .replace(/&/g, '", "')
          .replace(/=/g, '": "')}"}`;
        const ParsedBody = JSON.parse(BodyString);
        req.body = {
          oauth_token: ParsedBody.oauth_token,
          oauth_token_secret: ParsedBody.oauth_token_secret,
          user_id: ParsedBody.user_id,
        };

        next();
      },
    );
  },
  passport.authenticate('twitter-token', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
      id: req.user.id,
    };
    return next();
  },
  generateToken,
  sendToken,
);

router.route('/consults').post((req, res) => {
  const consumerKey = configTwitter.twitter.consumerKey;
  const consumerSecret = configTwitter.twitter.consumerSecret;
  const oauthToken = req.body.accesToken;
  const oauthTokenSecret = req.body.accesTokenSecret;
  const oauthTimesTamp = parseInt(Date.now() / 1000, 10);
  const oauthNonce = oauthToken.toString('base64');
  const keySignature = `${consumerSecret}&${oauthTokenSecret}`;
  let options;
  let qss;
  let count;
  let screenName;
  if (req.body.users) {
    count = req.body.qs.count;
    qss = req.body.qs;
    const trueScreenName = typeof req.body.qs.screen_name === 'undefined';
    screenName = '';
    if (!trueScreenName) {
      screenName = req.body.qs.screen_name;
      screenName = `&screen_name=${screenName}`;
    }
    count = `count=${count}&`;
  } else {
    count = '';
    screenName = '';
  }
  let oauthSignature = `${count}oauth_consumer_key=${consumerKey}&oauth_nonce=${oauthNonce}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${oauthTimesTamp}&oauth_token=${oauthToken}&oauth_version=1.0${screenName}`;
  const consult = req.body.consult;
  oauthSignature = `GET&${encodeURIComponent(consult)}&${encodeURIComponent(
    oauthSignature,
  )}`;
  oauthSignature = hmacsha1(keySignature, oauthSignature);
  oauthSignature = encodeURIComponent(oauthSignature);
  const oauth_consult = `OAuth oauth_consumer_key="${consumerKey}", oauth_nonce="${oauthNonce}", oauth_signature="${oauthSignature}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${oauthTimesTamp}", oauth_token="${oauthToken}", oauth_version="1.0"`;
  if (req.body.users) {
    options = {
      method: 'GET',
      url: consult,
      qs: qss,
      headers: {
        Authorization: oauth_consult,
      },
    };
    console.log(options);
  } else {
    options = {
      method: 'GET',
      url: consult,
      headers: {
        Authorization: oauth_consult,
      },
    };
    console.log(options);
  }

  request(options, (error, response, body) => {
    if (error) {
      console.log('error no conection');
    } else {
      if (body.user) {
        const Tweets = body.user;
        res.send(Tweets);
      }
      const Tweets = body;
      res.send(Tweets);
    }
  });
});

module.exports = router;
