// Kaylene-Nhu Nguyen @ Mohawk College, 2022
import React from 'react'
import { Link } from 'react-router-dom'

export const Summary = ({ formData, setFormData }) => {

  return (
    <>
      <div className='summary'>
        <h1>Summary of Patient Information</h1>
        <div className='information'>
          <div><strong>Name:</strong> {formData.lastName}, {formData.firstName} </div>
          <div><strong>Date of Birth:</strong> {formData.dob}</div>
          <div><strong>Gender:</strong> {formData.gender}</div>
          <div><strong>Health Card #:</strong> {formData.hcn} </div>
        </div>

        {/* Return to the homepage. Clears the form array on click. */}
        <Link to="/" onClick={() => {
          formData.firstName = "";
          formData.lastName = "";
          formData.dob = null;
          formData.hcn = 0;
          formData.gender = "M";
        }}>Go Home</Link>

      </div>
    </>
  )
}
