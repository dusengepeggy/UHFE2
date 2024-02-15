
import React, { useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import { RiGuideLine } from "react-icons/ri";
import { SiGoogleforms } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { RiGroupLine } from "react-icons/ri";
import { MdAccountBalance } from "react-icons/md";
import {useSearchParams } from 'react-router-dom';




function Sidebar({children}) {
  let [searchParams] = useSearchParams();

  const email = searchParams.get("email")
  const role = searchParams.get("role")
  
  const data = JSON.parse(localStorage.getItem("userInfo"))
  console.log(data);
  
 

  const menuItem=[

    {

      path:"/",
      name:"Counted",
      icon:<MdAccountBalance />

    },

    
    {

      path:"/Guideline",
      name:"Guidelines",
      icon:<RiGuideLine />

    },

     
    {

      path:"/CitizenForm",
      name:"Form to collect data",
      icon:<SiGoogleforms />

    },
    {

      path:"/citizen",
      name:"Citizens",
      icon:<RiGroupLine />

    },

       
  ]

  const logout = () => {
    localStorage.clear();
    window.location.href = "https://uhfe-peggys-projects.vercel.app";
  };

  //button js handler
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      // Redirect to the login page
      logout();
      // Replace '/login' with your actual login page URL
      //   <Link to="/test">Go to Login Page</Link>
    }
    // If the user clicks "Cancel" in the confirmation dialog, do nothing
  };
  return (
    <>
      <div className='user-container'>
        <div className="user-sidebar">
          <div className="user-top-section">
            <div className="user-logo">
            
            <div className='user-icoo'>
              <img src="/motto.png" alt="" />
              {/* <FaRegUser size={60} /> */}
              </div>
            </div><br /><br /><br />
            <div className="email"> {email!==null?email:JSON.parse(localStorage.getItem("userInfo"))?.email}
             <br />
             Mutwarasibo
             {/* {role!==null?role:JSON.parse(localStorage.getItem("userInfo"))?.role} */}
             </div>
            {/* <div className='email'>{data?.role}</div> */}
         
            {
  menuItem.map((item, index) => (
    <NavLink
      key={index}
      to={item.path}
      className="user-link"
      activeClassName="active"
    >
      <div className="user-icon">{item.icon}</div>
      <div className="user-link-text">{item.name}</div>
    </NavLink>
  ))
}
         
          </div>

          <div>
        
        <input 
        type="button" 
        value="Logout" 
        className='user-btn' 
        onClick={handleLogout}
        />
      </div>
        </div>
      
        <main>{children}</main>

      </div>

    
      
  </>
  )
}

export default Sidebar