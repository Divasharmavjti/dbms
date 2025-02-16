import React, { useState } from "react";
import "./App.css"; // Import CSS for styling

const EnrollmentForm = () => {
    const [formData, setFormData] = useState({
        nameOfAssociation: "",
        location: "",
        rollNo: "",
        admissionDate: "",
        courseApplyingFor: "",
        fullName: "",
        parentGuardianName: "",
        dateOfBirth: "",
        age: "",
        gender: "Male",
        address: "",
        phone: "",
        mobile: "",
        email: "",
        education: "SSC",
        occupation: "Employed",
        casteCategory: "",
        caste: "",
        religion: "",
        purpose: "Higher Education",
        requiresJob: "Yes",
        fieldInterest: "",
        heardFrom: "VF Representative",
        batchStartDate: "",
        batchEndDate: "",
        durationOfCourse: "",
        photo: null,  // For storing the uploaded file
        photoPreview: "",  // For displaying the image preview
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    photo: file,
                    photoPreview: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formDataToSend = {
          full_name: formData.fullName,
          parent_guardian_name: formData.parentGuardianName,
          date_of_registration: new Date().toISOString().split('T')[0], // Send current date
          email_id: formData.email,
          mobile_no: formData.mobile,
          gender: formData.gender,
          address: formData.address,
          caste_category: formData.casteCategory,
          caste: formData.caste,
          religion: formData.religion,
          date_of_birth: formData.dateOfBirth,
          age: formData.age,
          qualification: formData.education,
          occupation: formData.occupation
      };
  
      try {
          const response = await fetch("http://localhost:5000/enroll", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formDataToSend),
          });
  
          const result = await response.json();
          alert(result.message);
      } catch (error) {
          console.error("Error submitting form:", error);
      }
  };
  
  

    return (
        <div className="container">
            <h2>Enrollment Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name of the Association:</label>
                    <input type="text" name="nameOfAssociation" value={formData.nameOfAssociation} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Roll No:</label>
                    <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Education:</label>
                    <select name="education" value={formData.education} onChange={handleChange}>
                        <option value="SSC">SSC</option>
                        <option value="SSC/FYJC">SSC/FYJC</option>
                        <option value="HSC-UNDER GRAD">HSC-Under Grad</option>
                        <option value="GRADUATE">Graduate</option>
                        <option value="POST GRADUATE">Post Graduate</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Occupation:</label>
                    <select name="occupation" value={formData.occupation} onChange={handleChange}>
                        <option value="Employed">Employed</option>
                        <option value="Self Employed">Self Employed</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Student">Student</option>
                        <option value="Housewife">Housewife</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Caste Category:</label>
                    <input type="text" name="casteCategory" value={formData.casteCategory} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Caste:</label>
                    <input type="text" name="caste" value={formData.caste} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Religion:</label>
                    <input type="text" name="religion" value={formData.religion} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Course Purpose:</label>
                    <select name="purpose" value={formData.purpose} onChange={handleChange}>
                        <option value="Higher Education">Higher Education</option>
                        <option value="Upskilling">Upskilling</option>
                        <option value="Employment">Employment</option>
                        <option value="Any Other">Any Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Need Placement After Course Completion:</label>
                    <select name="requiresJob" value={formData.requiresJob} onChange={handleChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                {formData.requiresJob === "Yes" && (
                    <div className="form-group">
                        <label>Field of Interest:</label>
                        <input type="text" name="fieldInterest" value={formData.fieldInterest} onChange={handleChange} />
                    </div>
                )}

                <div className="form-group">
                    <label>Upload Photo:</label>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                </div>

                {formData.photoPreview && (
                    <div className="image-preview">
                        <p>Preview:</p>
                        <img src={formData.photoPreview} alt="User Preview" className="preview-img" />
                    </div>
                )}

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default EnrollmentForm;
