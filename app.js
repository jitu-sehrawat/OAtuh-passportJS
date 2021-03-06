const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const { mongodb, session} = require('./config/keys');
const cookieSession = require('cookie-session');

const app = express();

// set up view engine
app.set('view engine','ejs');

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [session.cookieKey]
}))

// initialise passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(mongodb.dbURL, () => {
  console.log(`Connected to DB`);
})

// setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
})

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});