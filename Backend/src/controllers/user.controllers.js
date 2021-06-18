
// const {app} = require("../index")

const express = require("express")
const router = express.Router()

const User = require("../models/user.model")
//get all posts

   router.get("/",async(req,res)=>{
       console.log("get")
    const user = await User.find().sort({id:1}).lean().exec(); 
    
    return res.status(200).json({data:user})
})






module.exports = router