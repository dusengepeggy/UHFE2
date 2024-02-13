import React, {useEffect, useState} from 'react'
import { IoIosPeople } from "react-icons/io"
import AOS from 'aos';
import 'aos/dist/aos.css';


function Guideline() {

//   const [families, setFamilies] = useState([]);
//   const fetchCitizen = () => {
//   fetch("http://localhost:4000/api/UH/v1/citizen/list")
//   .then((res) => res.json())
//   .then((data) => {
//     setFamilies(data.citizen);
//   });
// };

  useEffect(() => {
    AOS.init({duration: 1000});
    // fetchCitizen();
  }, []);
  return (
    <>
      
   
    <div className='user-form'>
    <h2 data-aos="fade-up" className='user-guide'>Guidelines</h2>
    <form action="" className='user-form-container' data-aos="fade-up">
        

        <fieldset className='user-fieldset'>
          <legend>
            <h1>Guidelines </h1>
          </legend>
          <p className='user-sub-heading' >
            This is a system that will help the village leaders to collect information about 
            the citizen in the village through form filling and giving some 
            announcements to the villagers through the message so that the
             people in the village kept updated and the village leaders know the information about
              the villagers either new comers or ancients in the region. </p>
        </fieldset>
      </form>
      </div>
      {/* <div className='user-leftside' data-aos="fade-up">
        <h2 className='user-count'>Number Of Counted Families</h2>
        <p className='user-icoon'><IoIosPeople size={100} /></p>
        <p className='user-num'>{families.length}</p>
      </div> */}
    </>
  )
}

export default Guideline
