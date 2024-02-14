import { useState } from "react";
import { useEffect } from "react";
import AOS from "aos";

import "../CitizenForm.css";
import { notify } from "../Components/utils/Notify";


// Validation function for checking if a field is empty
const isFieldEmpty = (value) => {
  return value.trim() === "";
};
function CitizenForm() {
  const [validationErrors, setValidationErrors] = useState({});//input validation
  const [msg, setMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saving,setSaving] = useState(false)
  const [formData, setFormData] = useState({
    fullNames: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationalId: "",
    email: "",
    phone: "",
    demoInfo: {
      gender: "",
      maritalStatus: "",
    },
    resInfo: {
      isibo: "",
      tenure: "",
    },
    citAndImmi: {
      citizenshipStat: "",
      countryOrigin: "",
      immigrationStat: "",
    },
    empOccupation: {
      empStatus: "",
      occupation: "",
      industryOfWork: "",
    },
    availableAmenities: [],
    houseComp: {
      numberOfChildren: "",
      numberOfHousePeople: "",
    },
  });

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

     // Validation for email field
  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);

    setValidationErrors({
      ...validationErrors,
      [name]: isValidEmail ? "" : "Please enter a valid email address",
    });

    setFormData({
      ...formData,
      [name]: value,
    });

    return;
  }

    //email validation ends by here

      // Validation for nationalId field
      if (name === "nationalId" && (value.length < 16 || value.length > 16)) {
        setValidationErrors({
          ...validationErrors,
          [name]: "National ID must be exactly 16 digits",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          [name]: "",
        });
      }

    //id validation here

    
   

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate each field
    const isEmptyFullNames = isFieldEmpty(formData.fullNames);
    const isEmptyDateOfBirth = isFieldEmpty(formData.dateOfBirth);
    const isEmptyPlaceOfBirth = isFieldEmpty(formData.placeOfBirth, "placeOfBirth");
  const isEmptyNationalId = isFieldEmpty(formData.nationalId, "nationalId");
  const isEmptyEmail = isFieldEmpty(formData.email, "email");
  const isEmptyPhone = isFieldEmpty(formData.phone, "phone");

     // Check for empty fields
     if (isEmptyFullNames 
      || isEmptyDateOfBirth 
      || isEmptyPlaceOfBirth
      || isEmptyNationalId
      || isEmptyEmail
      || isEmptyPhone
      /* Add similar conditions for other fields */) {
      setErrorMessage("Please no field should be empty!!!");
      return;
    }

    // Check for validation errors before submitting
    const hasErrors = Object.values(validationErrors).some((error) => error !== "");

    if (hasErrors) {
      notify("error", "Form validation failed. Please check the fields.");
      return;
    }
    //id check for validation ends here

    setSaving(true);

    const response = await fetch(
      "https://umudugudu-hub.onrender.com/api/UH/v1/citizen/add", // API endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setFormData(
        {
          fullNames: "",
          dateOfBirth: "",
          placeOfBirth: "",
          nationalId: "",
          email: "",
          phone: "",
          demoInfo: {
            gender: "",
            maritalStatus: "",
          },
          resInfo: {
            isibo: "",
            tenure: "",
          },
          citAndImmi: {
            citizenshipStat: "",
            countryOrigin: "",
            immigrationStat: "",
          },
          empOccupation: {
            empStatus: "",
            occupation: "",
            industryOfWork: "",
          },
          availableAmenities: [],
          houseComp: {
            numberOfChildren: "",
            numberOfHousePeople: "",
          },
        }
      )
      setSaving(false);

      notify("success","Citizen saved successfully!");
        } else {
          setSaving(false);
      
      notify("error","Citizen not saved!")
        }

    if (data.message) {
      setMsg(data.message);
      setTimeout(() => {
        setMsg("");
      }, 8000);
    }
    setErrorMessage(""); // Clear the error message after successful submission
  };

  return (
    <>
      {/* {msg !== "" && <div className="msg1">{msg}</div>} */}

      <div className="citizen-App" data-aos="fade-up">
        <h2 className="user-guide" data-aos="fade-right">
          Citizen Form
        </h2>
        <form className="citizen-form">
        
          <h2>1. Individual Information</h2>
          <div className="citizen-form-group">
            <label htmlFor="fullnames" className="citizen-form-label">
              FullNames:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="fullNames"
              value={formData.fullNames}
              onChange={handleChange}
              placeholder="your names ........."
              required
            />
          </div>

          <div className="citizen-form-group">
            <label htmlFor="dateOfBirth" className="citizen-form-label">
              Date Of Birth:
            </label>
            <input
              type="date"
              className="citizen-form-control"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="citizen-form-group">
            <label htmlFor="placeOfBirth" className="citizen-form-label">
              Place Of Birth:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              placeholder="country of birth...."
              required
            />
          </div>

          <div className="citizen-form-group">
            <label htmlFor="nationalId" className="citizen-form-label">
              National Id:
            </label>
            <input
              type="number"
              className="citizen-form-control"
              name="nationalId"
              maxLength={16}
              value={formData.nationalId}
              onChange={handleChange}
              placeholder="your national id...."
              required
            />
             {validationErrors.nationalId && (
            <div className="validation-error">{validationErrors.nationalId}</div>
          )}
          </div>

          <div className="citizen-form-group">
            <label htmlFor="email" className="citizen-form-label">
              Email:
            </label>
            <input
              type="email"
              className="citizen-form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your email...."
              required
            />
             {validationErrors.email && (
            <div className="validation-error">{validationErrors.email}</div>
          )}
          </div>

          <div className="citizen-form-group">
            <label htmlFor="phone" className="citizen-form-label">
              Phone:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="phone"
              maxLength={13}
              value={formData.phone}
              onChange={handleChange}
              placeholder="your phone number...."
              required
            />
          </div>

          <h2>2. Demographic Information</h2>
          <div className="citizen-form-group">
            <b>
              <label htmlFor="gender" className="citizen-form-label">
                Gender
              </label>
            </b>
          </div>
          <div>
            <div className="citizen-check-box">
              <input
                type="radio"
                name="demoInfo.gender"
                value="Male"
                onChange={handleChange}
                required
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="demoInfo.gender"
                value="Female"
                onChange={handleChange}
                required
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          <div className="citizen-form-group">
            <b>
              <label htmlFor="maritalStatus" className="citizen-form-label">
                MaritalStatus
              </label>
            </b>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="demoInfo.maritalStatus"
                value="Single"
                onChange={handleChange}
                required
              />
              <label htmlFor="single">Single</label>
            </div>
            <div>
              <input
                type="radio"
                name="demoInfo.maritalStatus"
                value="Married"
                onChange={handleChange}
                required
              />
              <label htmlFor="married">Married</label>
            </div>
            <div>
              <input
                type="radio"
                name="demoInfo.maritalStatus"
                value="Divorced"
                onChange={handleChange}
                required
              />
              <label htmlFor="married">Divorced</label>
            </div>
            <div>
              <input
                type="radio"
                name="demoInfo.maritalStatus"
                value="Widowed"
                onChange={handleChange}
                required
              />
              <label htmlFor="married">Widowed</label>
            </div>
          </div>

          <h2>3. Residential Information</h2>
          <div className="citizen-form-group">
            <label htmlFor="isibo" className="citizen-form-label">
              Isibo:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="resInfo.isibo"
              value={formData.resInfo.isibo}
              onChange={handleChange}
              placeholder="isibo residence...."
              required
            />
          </div>

          <div className="citizen-form-group">
            <b>
              {" "}
              <label htmlFor="tenure" className="citizen-form-label">
                Tenure
              </label>
            </b>
          </div>

          <div>
            <input
              type="radio"
              name="resInfo.tenure"
              value="Owned"
              onChange={handleChange}
              required
            />
            <label htmlFor="owned">Owned</label>
          </div>
          <div>
            <input
              type="radio"
              name="resInfo.tenure"
              value="Rented"
              onChange={handleChange}
              required
            />
            <label htmlFor="rented">Rented</label>
          </div>

          <h2>4. Citizenship and Immigration</h2>
          <div className="citizen-form-group">
            <label htmlFor="citizenshipStatus" className="xitizen-form-label">
              Citizenship Status:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="citAndImmi.citizenshipStat"
              value={formData.citAndImmi.citizenshipStat}
              onChange={handleChange}
              placeholder="your citizenship status...."
              required
            />
          </div>

          <div className="citizen-form-group">
            <label htmlFor="countryOfOrigin" className="citizen-form-label">
              Country Of Origin:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="citAndImmi.countryOrigin"
              value={formData.citAndImmi.countryOrigin}
              onChange={handleChange}
              placeholder="country of origin...."
              required
            />
          </div>

          <div className="citizen-form-group">
            <label htmlFor="immigrationStatus" className="citizen-form-label">
              Immigration Status:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="citAndImmi.immigrationStat"
              value={formData.citAndImmi.immigrationStat}
              onChange={handleChange}
              placeholder="country of origin...."
              required
            />
          </div>

          <h2>5. Employment and Occupation</h2>

          <div className="citizen-form-group">
            <label htmlFor="employmentStatus" className="citizen-form-label">
              Employment Status:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="empOccupation.empStatus"
              value={formData.empOccupation.empStatus}
              onChange={handleChange}
              placeholder="your employment status...."
              required
            />
          </div>

          <div className="citizen-form-group">
            <label htmlFor="occupation" className="citizen-form-label">
              Occupation:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="empOccupation.occupation"
              value={formData.empOccupation.occupation}
              onChange={handleChange}
              placeholder="your occupation...."
              required
            />
          </div>

          <div className="citizen-form-group">
            <label htmlFor="industryOfWork" className="citizen-form-label">
              Industry Of Work:
            </label>
            <input
              type="text"
              className="citizen-form-control"
              name="empOccupation.industryOfWork"
              value={formData.empOccupation.industryOfWork}
              onChange={handleChange}
              placeholder="industry of work...."
              required
            />
          </div>

          <h2>6. Household Amenities</h2>
          <div className="citizen-form-group">
            <b>
              <label htmlFor="availabilityOfBasicAmenities">
                Availability of basic amenities :
              </label>
            </b>
          </div>
          <div>
            <div>
              <input
                type="radio"
                name="availableAmenities"
                value="Water"
                onChange={handleChange}
                required
              />
              <label htmlFor="water">Water</label>
            </div>

            <div>
              <input
                type="radio"
                name="availableAmenities"
                value="Electricity"
                onChange={handleChange}
                required
              />
              <label htmlFor="electricity">Electricity</label>
            </div>

            <div>
              <input
                type="radio"
                name="availableAmenities"
                value="Sanitation"
                onChange={handleChange}
                required
              />
              <label htmlFor="sanitation">Sanitation</label>
            </div>
          </div>

          <h2>7. Household Composition</h2>
          <div className="citizen-form-group">
            <label htmlFor="numberOfChildren" className="citizen-form-label">
              Number Of Children:
            </label>
            <input
              type="number"
              className="citizen-form-control"
              name="houseComp.numberOfChildren"
              value={formData.houseComp.numberOfChildren}
              onChange={handleChange}
              placeholder="total number of children...."
              required
            />
          </div>
          <div className="citizen-form-group">
            <label
              htmlFor="numberOfHouseholdPeople"
              className="citizen-form-label"
            >
              Number Of people:
            </label>
            <input
              type="number"
              className="citizen-form-control"
              name="houseComp.numberOfHousePeople"
              value={formData.houseComp.numberOfHousePeople}
              onChange={handleChange}
              placeholder="total number of people...."
              required
            />
          </div>
          <br />

          <div className="citizen-form-group">
            <button
              className="citizen-btn"
              onClick={handleSubmit}
              type="submit"
            >
              {saving?"Submitting...":"Submit"}
            </button>
          </div>
          
          {msg !== "" && <div className="msg1">{msg}</div>}
          <div className="error-message">{errorMessage}</div>
        </form>
    
      </div>
    
    </>
  );
}

export default CitizenForm;
