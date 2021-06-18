import React, { useState } from "react";
import axios from "axios";
import styles from "./Branch.module.css";

const Branch = ({ message }) => {
  console.log(message);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [result, setResult] = useState([])
  function performValidation() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username, password);
    getData();
    console.log(data);
  }

  const getData = () => {
    axios
      .get("https://json-server-pavithra.herokuapp.com/beetlenutdata")
      .then((res) => {
        setData(res.data);
        var pincode = data.filter((item)=>item["Pincodecovered"].split(", ").filter((item)=>item == password).join("")==password)
        console.log(pincode)
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].BranchName === username) {
              // console.log(data[i]["BranchName"],"jkjk");
            setAuth(true);
            break;
          }
        }
      });
  };

  return (
    <>
      {!auth ? (
        <div className={styles.mainContainer}>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <br />
            <br />
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <br />
            <br />
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
      ) : (
        <div className={styles.cardWrapper}>
         
          {data && data.filter(item=>username in item).map((item) => <p>{item["BranchName"]} </p>)}
        </div>
      )}
    </>
  );
};

export default Branch;
