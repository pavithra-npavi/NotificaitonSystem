require("dotenv").config();
let {v4: uuidv4} = require("uuid")

const User = require("../models/login.model")

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const  newToken= require("../controllers/authController.js")
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4412/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, done) {
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    
    
    let user = await User.findOne({email: profile._json.email}).lean().exec();
    console.log(user)
    console.log("profile", profile)

    if(!user)
    {
      user = await User.create({email : profile._json.email, password:uuidv4})
    }


    // const token = newToken(user)
    console.log("TOken" , token)
    
    return done(null, {user,token});
    //    });
  }
));


module.exports = passport;