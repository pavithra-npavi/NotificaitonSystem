const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/login.model");

const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
};

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).json({ data: { token } });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "failed", message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  //find the user with the email
  // try to match the password with sytem password stored in
  // if ok create a new token  and return the token

  let user ;
  try{
   user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res
        .status(401)
        .json({ status: "failed", message: "email or password not correct" });
    }
  }

  catch(err)
  {
      return res.status(500).json({ status:"failed", message : "something went wrong"})
  }
  

  try{
    const match = await user.checkPassword(req.body.password)
    // console.log(match)
    // if password doesnt matcht then send error of bad request
    if(!match)
    {
      return res.status(401).json({ status:"failed", message : "something went wrong"})
    }
  }

  catch(err)
  {
    return res.status(500).json({ status:"failed", message : "something went wrong"})
  }
  
  // create a new user token
  const token = newToken(user)
  // return the token to the frontend
  return res.status(201).json({data : {token}})
//   return res.send("User");
};

module.exports = {
  signup,
  signin,
  newToken
};