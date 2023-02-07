import React from 'react'
import {Link} from "react-router-dom"
const Navbar = () => {
 const loc = window?.location?.pathname
 console.log("location", loc)
  return (
   
<nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      
      <a className="navbar-brand" href="#">PUCIT</a>
    </div>

      <ul className="nav navbar-nav">
        <li className={loc === "/" ? "active" : ""}><Link to="/">S-DES </Link></li>
        <li className={loc === "/rc4" ? "active" : ""} ><Link to="/rc4">RC4</Link></li>
       
      </ul>
     
  </div>
</nav>
  )
}

export default Navbar