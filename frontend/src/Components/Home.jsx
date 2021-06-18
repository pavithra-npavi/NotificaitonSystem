import React from "react"
import axios from "axios"
import styles from "./Home.module.css"

const HomePage =()=>{

    const [data,setData] = React.useState([])
    const getData =()=>{
        axios.get("https://json-server-pavithra.herokuapp.com/beetlenutdata")
       .then((res)=>{
         setData(res.data)    
       })
    }
   
     React.useEffect(()=>{
         getData()
     })
   
    return(
        <>
        <h3>Beetle Nut </h3>
        <div style={{display:"flex",flexWrap:"wrap"}}>
                {
                    data.map((item)=>
                        <div className={styles.cardWrapper}>
                        <p>Branch Name : {item["BranchName"]}</p>
                        <p>Branch Incharge : {item["BranchIncharge"]}</p>
                        <p>Pincode Covered : {item["Pincodecovered"]}</p>
                        <p>Address :{item["Address"]}</p>
                        <p>City : {item["City"]}</p>
                    </div>
                    )
                }
        </div>
        </>
    )
}

export default HomePage;
