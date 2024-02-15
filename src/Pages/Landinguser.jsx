import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoIosPeople } from 'react-icons/io';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Landinguser() {
  let [searchParams] = useSearchParams();

  let email = searchParams.get("email")
  let role = searchParams.get("role")
  let token = searchParams.get("token")
  const userInfo = { email, role, };


  const checkToken = () => {
    if ((token !== null || localStorage.getItem("token") !== "") && (role === "user" || JSON.parse(localStorage.getItem("userInfo"))?.role === "user")) {
      const modToken = token !== null ? token : localStorage.getItem("token")

      const modUser = role === "user" ? JSON.stringify(userInfo) : localStorage.getItem("userInfo")



      localStorage.setItem("token", modToken);
      localStorage.setItem("userInfo", modUser);
    }
    else {
      window.location.href = "https://uhfe-ewqw9iobk-peggys-projects.vercel.app/login";
    }
  }


  useEffect(() => {
    checkToken()
  }, [token]);


  const [families, setFamilies] = useState([]);
  const fetchCitizen = () => {
    fetch("https://umudugudu-hub.onrender.com/api/UH/v1/citizen/list")
      .then((res) => res.json())
      .then((data) => {
        setFamilies(data.citizen);
      });
  };



  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchCitizen();
  }, []);
  return (

    <>
      <div className='user-landing'>
        <h3 data-aos="fade-down" className='h2-user'>WELCOME TO </h3>
        <br />


        <h2 data-aos="fade-up" className='h1-user'>VILLAGE-CONNECT </h2>
      </div>

      <div className='user-leftside' data-aos="fade-up">
        <h2 className='user-count'>Number Of Counted Families</h2>
        <p className='user-icoon'><IoIosPeople size={100} /></p>
        <p className='user-num'>{families.length}</p>
      </div>

    </>
  )
}

export default Landinguser
