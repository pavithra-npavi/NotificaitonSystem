import React, { useState ,useEffect} from "react";
import axios from "axios"
import {io} from "socket.io-client"
import Branch from "./Branch";
import styles from "./Login.module.css"
import Card from "./Card";
export const Socket = io.connect("http://localhost:8000")
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([])
  const [ pincode, setPincode] = useState([])
  const [ message, setMessage] = useState("")
  const [ result, setResult] = useState([])
  const [branch, setBranch] = useState(false)
  function performValidation() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(pincode)
    getData()
    
  }

  const getData =()=>{
     axios.get("https://json-server-pavithra.herokuapp.com/beetlenutdata")
    .then((res)=>{
      setData(res.data)
      filtering(data)})
  
  }

  // console.log(data)

  const filtering =(data)=>{
    var obj = {}
    var list = data.filter((item)=>item["Pincodecovered"].split(", ").filter((item)=>item == pincode).join("")==pincode)
    setResult(list)
    for(let i =0 ; i<list.length; i++)
    {
      obj[list[i]["BranchName"]] = false;
    }
    Socket.emit("notification",({username,pincode,branch:true,...obj}))
  }

  useEffect(()=>{
    // getData()
    Socket.on("notification",pincode=>{
      setMessage([...pincode])
    })
  },[message])


  return (
    <>
    <div className={styles.mainContainer}>
      <br/><br/>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          autoFocus
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> <br/><br/>
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        /> <br/><br/>
        <label>Pincode</label>
        <input type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
    <br/><br/>
        <button
          block
          bsSize="large"
          disabled={!performValidation()}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>

  {branch && <Branch message={message}/>}
  <div className={styles.cardConatiner}>
    {
      result&&result.map((item)=><Card item={item}/>)
    }
    </div>
    </>
  );
};

export default Login;
