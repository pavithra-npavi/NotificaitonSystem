import React from "react"
import {NavLink} from "react-router-dom"
import styled from "styled-components"
const Navbar = ()=>{
    const links = [
        {
            to:"/",
            title:"Home",
            exact:true
        },
    
        {
            to:"/login",
            title:"Login User",
            exact:false
        },
        {
            to:"/branch",
            title:"Branch Login",
            exact:false
        },
    ];
    return(
        <>
        <div style={{fontSize:"20px", marginBottom:"50px", background:"aliceblue",padding:"50px"}}>
        {
            
            links?.map(({to,title,exact})=>(
            

                <NavLink exact={exact} to={to} key = {to} style={{marginLeft:"50px",padding:"50px",textDecoration:"none"}}>
                
                    {title}
                 
                    </NavLink>
                    
                    
    
            ))
        }
        </div>
        </>
    )
}

export default Navbar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

