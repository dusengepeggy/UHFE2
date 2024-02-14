import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// import Modal from "../../../uDashbrd/src/Components/modal/Modal";
import Modal from "./modal/Modal";
// import { notify } from "./utils/Notify";
// import '../Pages/Register.css'
import './newEditCitizen.css'

import { MdCancelPresentation } from "react-icons/md";
import { notify } from "./utils/Notify";
import Citizen from "../Pages/Citizen";

function EditingCitizen({
  open,
  handleClose,
  data,
  setData,
  fetchCitizens

}) {
  const [updating, setUpdating] = useState(false);
  const {handleSubmit} = useForm();
  const onUpdate= async()=>{
   
    const updates = {
      id:data.id,
      fullNames: data.fullNames,
      dateOfBirth: data.dOB,
      placeOfBirth: data.pOB,
      nationalId: data.nId,
      email: data.email,
      phone: data.phone,
      demoInfo:{
      gender: data.gender,
      maritalStatus: data.martStatus,
      },
      resInfo:{
        isibo: data.isibo,
        tenure: data.tenure,
      },
      citAndImmi:{
        countryOrigin: data.countOrigin,
      },
      empOccupation:{
        empStatus: data.empStatus,
        occupation: data.occopStatus,
        industryOfWork: data.industOfwork,
      },
      availableAmenities: data.availAmenities,
      houseComp:{
        numberOfChildren: data.numberChildren,
        numberOfHousePeople: data.numberPeople,
      },
      
    };
    setUpdating(true);
    await axios
    .put(`https://umudugudu-hub.onrender.com/api/UH/v1/citizen/update/?id=${data.id}`, updates)
    .then((res)=>{
      setUpdating(false);
      window.location.reload()
      // handleClose();
     
      notify("success", "Citizen updated successfuly!!!");
      console.log(res);
    })
    .catch((error)=>{
      setUpdating(false);
      notify("error", "Failed to update citizen!!!");
    });
  };

  return (
    <div
    style = {{
      display: "block",
        // padding: 10,
        margin: "auto",
        zIndex: 1000,

    }}
    >
    <Modal isOpen={open} onClose={handleClose} >
      <>
      
      <div className='register-container'>
        {/* <h2 className='h2register' data-aos="fade-down">citizen edit form</h2> */}
        <form onSubmit={handleSubmit(onUpdate)} className='citizen-edit' data-aos="fade-right">
        <h3 className='h4-residence'>Individual information:</h3> 

        <div className='part1-register'>
            <div className='first-name'> <label id='fname' >FullName:</label>  <br /> 
              <input
               type="text"
              name='fullNames'  
              required 
              className='reg-input'
              value={data?.fullNames} 
              onChange={(e)=>
                setData((prev)=>({
                  ...prev,
                  fullNames: e.target.value
                }))
              }
              />
            </div>
              
           
            <div className='reg-email'><label id='email'>Place of Birth:</label>  <br />    
                  <input
                   type="text"
                    name='email' 
                    required
                    className='reg-input' 
                    value={data?.pOB}
                    onChange={(e)=>
                      setData((prev)=>({
                        ...prev,
                        pOB: e.target.value
                      }))
                    }
                     />
            </div>
            <div className='reg-date'>
              <label id='date'>Date of birth:</label>      <br />
              <input 
              type="date" 
              name='DOB' 
              required
              value={data?.dOB}
              onChange={(e)=>
                setData((prev)=>({
                  ...prev,
                  dOB: e.target.value
                }))
              }
              className='reg-dob' />
            </div>
              
              
        </div>
        <div className='part1-register-2'>
        <div className='first-name'> <label id='fname' >National Id:</label>  <br /> 
              <input 
              type="number" 
              name='firstName'  
              required 
              className='reg-input'
              value={data?.nId}
              onChange={(e)=>
                setData((prev)=>({
                  ...prev,
                  nId: e.target.value
                }))
              }
               />
            </div>
            <div className='first-name'> <label id='fname' >Email:</label>  <br /> 
              <input 
              type="email" 
              name='firstName'  
              required className='reg-input'
              value={data?.email} 
              onChange={(e)=>
                setData((prev)=>({
                  ...prev,
                  email: e.target.value
                }))
              }
              />
            </div>
              
           
            <div className='reg-email'><label id='email'>Phone:</label>  <br />    
                  <input 
                  type="text" 
                  name='email' 
                  required 
                  className='reg-input' 
                  value={data?.phone}
                  onChange={(e)=>
                    setData((prev)=>({
                      ...prev,
                      phone: e.target.value
                    }))
                  }
                   />
            </div>
                   
              
        </div>

       <br />

      
        <h3 className='h4-role'>Demographic information :</h3>
              
          <div className='demographic'>
          <h4>Gender:</h4>
            <div id='role'> 

           <div className='adminoption'>
           <input 
           type="radio" 
           name='option' 
           value="male"
           required
           checked={data.gender === "male"}
           onClick={()=>
          setData((prev)=>({
            ...prev, gender: "male"
          }))
        }

           />
            <label for="Admin">Male</label>
            
          </div>
          
           <div className='useroption'>
           <input 
           type="radio" 
           name='option' 
           value="female" 
           id='user' 
           className='useropt'
           checked={data.gender === "female"}

           onClick={()=>
            setData((prev)=>({
              ...prev, gender: "female"
            }))
          }
           />
            <label for="User">Female</label>
            
          </div>
        
          </div>
          <h4>Martal status</h4>
          <div id='role'> 

           <div className='adminoption'>
           <input 
           type="radio" 
           name='opt' 
           value="Single"
           required
           checked={data.martStatus==="Single"}
           onClick={()=>
            setData((prev)=>({
              ...prev, martStatus: "Single"
            }))
          }

           />
            <label for="Admin">Single</label>
            
          </div>
          
           <div className='useroption'>
           <input 
           type="radio" 
           name='opt' 
           value="Married" 
           id='user' 
           className='useropt'
           checked={data.martStatus==="Married"}
           onClick={()=>
            setData((prev)=>({
              ...prev, martStatus: "Married"
            }))
          }
           />
            <label for="User">Married</label>
            
          </div>
        
          </div>
          </div>
         <h3 className='h4-role'>Residential Information</h3><br />
          <div className='demographic'>
          <h4>Isibo:</h4>
            <div id='role'> 

           <div className='adminoption'>
           <label for="Admin"></label>
           <input
            type="text" 
            name='opt'
            className="isibo"
            value={data?.isibo}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                isibo: e.target.value,
              }))
            }
            
            />
            
            
          </div>
          
           
        
          </div>
          <h4>Tenure:</h4>
          <div id='role'> 

           <div className='adminoption'>
           <input 
           type="radio" 
           name='tenureopt' 
           value="OWned"
           checked={data.tenure ==="Owned"}
           onClick={()=>
            setData((prev)=>({
              ...prev, tenure: "Owned"
            }))
          }
           
           />
            <label for="Admin">Owned:</label>
            
          </div>
          
           <div className='useroption'>
           <input 
           type="radio" 
           name='tenureopt' 
           value="Rented" 
           id='user' 
           className='useropt'
           checked={data.tenure === "Rented"}
           onClick={()=>
            setData((prev)=>({
              ...prev, tenure: "Rented"
            }))
          }
           />
            <label for="User">Rented:</label>
            
          </div>
        
          </div>
          </div>

          <h3 className='h4-residence'>Citizenship and Employment status:</h3>
          <div className='part3-register'>
            
         

          <div className='reg-sector'>
               <label id='sec'> Country of Origin:</label>   <br />
               <input 
               type="text" 
               id='sector' 
               name='sector' 
               className='reg-input3' 
               value={data?.countOrigin}
               onChange={(e) =>
                setData((prev) => ({ ...prev, countOrigin: e.target.value }))
              }
               />
          </div>

          <div className='reg-cell'>
                <label id='cel'>Employment Status:</label>   <br />
                <input 
                type="text" 
                id='cell' 
                name='cell' 
                className='reg-input4'
                value={data?.empStatus}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, empStatus: e.target.value }))
                }
                />
            </div>
          
            
      </div>


       <div className='part4-register'>

          
            
          <div className='reg-village'>
              <label id='ville'>Occupation:</label>   <br />
              <input 
              type="text" 
              className='reg-input4'
              value={data?.occopStatus}

              onChange={(e) =>
                setData((prev) => ({ ...prev, occopStatus: e.target.value }))
              }
               />
          </div>
          <div className='reg-village'>
              <label id='ville'>Industry of Work:</label>   <br />
              <input 
              type="text" 
              className='reg-input4'
              value={data?.industOfwork}
              onChange={(e) =>
                setData((prev) => ({ ...prev, industOfwork: e.target.value }))
              }
               />
          </div>
            <br />
            <br />
          </div>
              <div id='marital'>
             <h4 className='h4-menities'> Availability of basic amenities:</h4>
               <div className='maritaloption'>
               <input 
               type="checkbox" 
               name='optionamen' 
               value="Water" 
               id='single'
               checked={data.availAmenities === "Water"}
               onClick={() =>
                setData((prev) => ({ ...prev, availAmenities: "Water" }))
              }
               />
              <label for="Single">Water:</label>
               
              
              </div> 
              <div className='maritaloption'>
              <input 
              type="checkbox" 
              name='optionamen' 
              value="married" 
              id='married' 
              className='marriedopt'
              checked={data.availAmenities === "Electricity"}
              onClick={() =>
                setData((prev) => ({ ...prev, availAmenities: "Electricity" }))
              }
              />
              <label for="Married">Electricity:</label>
               
               
              </div>
              <div className='maritaloption'>
              <input 
              type="checkbox" 
              name='optionamen' 
              value="married" 
              id='married' 
              className='marriedopt'
              checked={data.availAmenities === "Sanitation"}
              onClick={() =>
                setData((prev) => ({ ...prev, availAmenities: "Sanitation" }))
              }
              />
              <label for="Married">Sanitation:</label>
               
               
              </div>
              
              </div>

              <h4 className='h4-role'> House Hold composition :</h4>
              
              <div className='part1-register'>
            <div className='first-name'> <label id='fname' >Number of children:</label>  <br /> 
              <input 
              type="text" 
              name='firstName'  
              required 
              className='reg-input' 
              value={data?.numberChildren}
              onChange={(e) =>
                setData((prev) => ({ ...prev, numberChildren: e.target.value }))
              }
              />
            </div>
              
           
            <div className='reg-email'><label id='email'>Number of people:</label>  <br />    
                  <input 
                  type="text" 
                  name='email' 
                  required 
                  className='reg-input' 
                  value={data?.numberPeople}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, numberPeople: e.target.value }))
                  }
                   />
            </div>
           
              
        </div>
        
             
        
          <button type='submit' className='reg-btn'>
          {updating ? "Updating..." : "Update"}
             </button>
             <div className="cancel-update-user" onClick={handleClose}>  <MdCancelPresentation size={20} /> Cancel</div>
        </form>
      </div>
      </>
    </Modal>
    </div>
  )
}

export default EditingCitizen