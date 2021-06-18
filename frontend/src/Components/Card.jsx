import React from "react"
import styles from "./Card.module.css"
const Card =({item})=>{

    return(
        <div className={styles.cardWrapper}>
            <p>Branch Name : {item["BranchName"]}</p>
            <p>Branch Incharge : {item["BranchIncharge"]}</p>
            <p>Pincode Covered : {item["Pincodecovered"]}</p>
            <p>Address :{item["Address"]}</p>
            <p>City : {item["City"]}</p>
        </div>
    )
}

export default Card;