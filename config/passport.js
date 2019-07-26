const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: 'Incorrect username' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: 'Incorrect password' });
    }

    return next(null, user);
  });
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email', 'picture']
}, (accessToken, refreshToken, profile, cb) => {
  User.findOne({ facebookId: profile.id })
    .then((user) => {
      if (user) {
        return cb(null, user);
      }

      const newUser = new User({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.email

      });
      console.log(profile);
      newUser.save()
        .then((user) => {
          cb(null, newUser);
        });
    })
    .catch(err => console.log(err));
}));



module.exports = passport;