import passport from 'passport';
import refresh from 'passport-oauth2-refresh';

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const manipulateUser = async (User, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });
    if (user) {
      user.accessToken = profile.token;
      user.refreshToken = profile.refreshToken;
      await user.save();
      return done(null, user);
    }
    const newUser = new User();
    newUser.googleId = profile.id;
    newUser.name = profile.displayName;
    newUser.avatar = profile.photos[0].value;
    newUser.accessToken = profile.token;
    newUser.refreshToken = profile.refreshToken;
    profile.emails.forEach((email) => { newUser.emails.push(email.value); });
    await newUser.save();
    return done(null, newUser);
  } catch (err) {
    console.error('err at manipulateUser passport', err);
    return done(err);
  }
};

const strategy = (User, config) => new GoogleStrategy({
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: config.googleAuth.callbackURL,
}, async (token, refreshToken, profile, done) => {
  profile.token = token;
  profile.refreshToken = refreshToken;
  return manipulateUser(User, profile, done);
});

export const setup = (User, config) => {
  passport.use('google', strategy(User, config));
  refresh.use('google', strategy(User, config));
};
