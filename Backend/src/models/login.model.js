	

const mongoose = require("mongoose")


const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    // name:{type: String, required: true},
    email : { type : String , required : true, unique : true},
    password : {type : String, required : true, minLength : 8}
},
{
    timestamps : true
}
)


userSchema.pre("save" , function(next){ // mongoosepre save hook 

    //hash the password before save it to database
    if(!this.isModified("password"))
    {
        return next();
    } // if pass not modified dont do anything

        bcrypt.hash(this.password, 8,(err, hash)=>{
            if(err)
            {
                return next(err)
            }
            this.password = hash;
            next();

        })
})


userSchema.methods.checkPassword = function(password){
    // we need to fetch the password from the db
    const passwordHash = this.password
    // then we will compare that with the password provided by using bcrypt
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, passwordHash,(err,same)=>{
            console.log("err, same", err, same)
            if(err){ return reject(err)}
            resolve(same)
        })
    })
}

const User = mongoose.model("user", userSchema)

module.exports = User