const express = require("express");
const session = require("express-session");
const port = process.env.PORT || 3001;
const secret = process.env.SECRET || "jhdadgiy_3543#@$3a546A//";
const passport = require("passport");
const path = require("path");
const cors = require("cors");
//var flash = require('connect-flash');
const app = express();
const LocalStrategy = require("passport-local").Strategy;


//check if user exists
passport.use(
  new LocalStrategy((username, password, done) => {
    try {
      // user exists
      if (username === user.username && password === user.password) {
        return done(null, user);
      }
      // user doesn't exists
      done(null, false);
    } catch (e) {
      done(e);
    }
  })
);

//save data in session
passport.serializeUser((user, done) => {
  const { username, email } = user;
  done(null, { username, email }); //doesnt includ the password
});

//get user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(cors({
  origin: 'http://localhost',
  credentials: true
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));


app.use(
  session({
    name: "sessionID",
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
    },
  })
);

//initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

////Routes by index file
app.use("/", require("./routes/index.js"));
////Routes by users file
app.use("/users", require("./routes/users.js"));


app.listen(port, () => console.log(`Server is listning on port ${port}`));
