

const express = require ("express")

const router = express.Router()
const User = require("../models/login.model")

const protect = require("../middlewares/protect")

router.get("/login" , async(req,res)=>{
    //-password to remove from sending
console.log("user", await req.user)
    const users = await User.find({}).select("-password").lean().exec();

    return res.status(200).json({ data : users})
})
module.exports = router;