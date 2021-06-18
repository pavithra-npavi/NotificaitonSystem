
const mongoose = require("mongoose")
//DB CONNECTION
const connect = async ()=>{
    return new mongoose.connect("mongodb://127.0.0.1:27017/test",{
        useNewUrlParser:true,
        useUnifiedTopology : true,
        useCreateIndex : true,
    })
}


module.exports = connect