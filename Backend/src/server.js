const {connect,app} = require("./index")

app.listen(2212,async()=>{
    await connect();
    console.log("listening to port 2212")
})