

// first get the token, and verify the token , retrive the user and if user exist then good else bad token 

const jwt = require("jsonwebtoken")

const User = require("../models/user.model")

const verifyToken = (token)=>{
  return  new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload)=>{
            if(err)
            {
                return reject(err);
            }
            resolve(payload)
        })
    })
}
const protect = async(req, res, next)=>{
    
    const bearer = req.headers.authorization;

    if(!bearer || !bearer.startWith("Bearer "))
    {
        return res.status(401).json({status : "failed" , message :"something went wrong"})
    }


const token = bearer.split("Bearer")[1].trim();

console.log("token", token)

let payload ;
try{
    payload = await verifyToken(token)
    console.log("payload", payload)
}
catch(err)
{
    return res.status(401).json({status : "failed" , message :"something went wrong"})
}

let user ;
try{
    user = await User.findById(payload.id).lean().exec()
}
catch(err)
{
    return res.status(500).json({status : "failed" , message :"something went wrong"})
}

if(!user)
{
    return res.status(401).json({status : "failed" , message :"something went wrong"})
}

req.user = user;
next();
}



//bearer token send using headers


module.exports = protect