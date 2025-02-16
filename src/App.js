// 
import React, { useState } from "react";
import "./App.css"; // Import CSS for styling

const EnrollmentForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        nameOfAssociation: "",
        location: "",
        rollNo: "",
        admissionDate: "",
        courseApplyingFor: "",
        parentGuardianName: "",
        dateOfBirth: "",
        age: "",
        gender: "Male",
        address: "",
        phone: "",
        mobile: "",
        email: "",
        aadharNo: "",
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
        photo: null, // For storing the uploaded file
        photoPreview: "", // For displaying the image preview
        // Payment Section Fields
        totalCourseFee: "",
        nsdcCertificateFees: "",
        amountPaid1stInstallment: "",
        amountPaid2ndInstallment: "",
        amountPaid3rdInstallment: "",
        amountPaid4thInstallment: "",
        feeOutstanding: "",
        receiptNumber: "",
        bankUtrNo1stInstallment: "",
        firstInstallFeeReceiptDate: "",
        bankUtrNo2ndInstallment: "",
        secondInstallFeeReceiptDate: "",
        bankUtrNo3rdInstallment: "",
        thirdInstallFeeReceiptDate: "",
        bankUtrNo4thInstallment: "",
        fourthInstallFeeReceiptDate: "",
    });

    const [currentStep, setCurrentStep] = useState(1); // State to track the current step

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
            // Enrollment Details
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
            occupation: formData.occupation,
            // Payment Details
            total_course_fee: formData.totalCourseFee,
            nsdc_certificate_fees: formData.nsdcCertificateFees,
            amount_paid_1st_installment: formData.amountPaid1stInstallment,
            amount_paid_2nd_installment: formData.amountPaid2ndInstallment,
            amount_paid_3rd_installment: formData.amountPaid3rdInstallment,
            amount_paid_4th_installment: formData.amountPaid4thInstallment,
            fee_outstanding: formData.feeOutstanding,
            receipt_number: formData.receiptNumber,
            bank_utr_no_1st_installment: formData.bankUtrNo1stInstallment,
            first_install_fee_receipt_date: formData.firstInstallFeeReceiptDate,
            bank_utr_no_2nd_installment: formData.bankUtrNo2ndInstallment,
            second_install_fee_receipt_date: formData.secondInstallFeeReceiptDate,
            bank_utr_no_3rd_installment: formData.bankUtrNo3rdInstallment,
            third_install_fee_receipt_date: formData.thirdInstallFeeReceiptDate,
            bank_utr_no_4th_installment: formData.bankUtrNo4thInstallment,
            fourth_install_fee_receipt_date: formData.fourthInstallFeeReceiptDate,
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

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="container">
            <h2>{currentStep === 1 ? "ENROLLMENT FORM" : "PAYMENT DETAILS"}</h2>
            <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <>
                        {/* Enrollment Details Section */}
                        <div className="form-group">
                            <label>Full Name:</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Aadhar Number:</label>
                            <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth:</label>
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Mobile Number:</label>
                            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email ID:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Region:</label>
                            <input type="text" name="region" value={formData.region} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>State:</label>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Family Income:</label>
                            <select name="familyIncome" value={formData.familyIncome} onChange={handleChange}>
                                <option value="Below 1 Lakh">Below 3 Lakh</option>
                                <option value="1 - 3 Lakhs">3 - 8 Lakhs</option>
                                <option value="3 - 5 Lakhs">8 - 15 Lakhs</option>
                                <option value="Above 5 Lakhs">Above 15 Lakhs</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Centre Name:</label>
                            <input type="text" name="centreName" value={formData.centreName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Course Name:</label>
                            <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Date of Registration:</label>
                            <input type="date" name="dateOfRegistration" value={formData.dateOfRegistration} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Roll No:</label>
                            <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
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
                        <button type="button" className="next-btn" onClick={nextStep}>Next</button>
                    </>
                )}
                
                {currentStep === 2 && (
                    <>
                        {/* Payment Details Section */}
                        <div className="form-group">
                            <label>Total Course Fee:</label>
                            <input type="number" name="totalCourseFee" value={formData.totalCourseFee} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>NSDC Certificate Fees:</label>
                            <input type="number" name="nsdcCertificateFees" value={formData.nsdcCertificateFees} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Amount Paid in 1st Installment:</label>
                            <input type="number" name="amountPaid1stInstallment" value={formData.amountPaid1stInstallment} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Amount Paid in 2nd Installment:</label>
                            <input type="number" name="amountPaid2ndInstallment" value={formData.amountPaid2ndInstallment} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Amount Paid in 3rd Installment:</label>
                            <input type="number" name="amountPaid3rdInstallment" value={formData.amountPaid3rdInstallment} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Amount Paid in 4th Installment:</label>
                            <input type="number" name="amountPaid4thInstallment" value={formData.amountPaid4thInstallment} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Fee Outstanding:</label>
                            <input type="number" name="feeOutstanding" value={formData.feeOutstanding} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Receipt Number:</label>
                            <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Bank UTR No. (1st Installment):</label>
                            <input type="text" name="bankUtrNo1stInstallment" value={formData.bankUtrNo1stInstallment} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>1st Installment Fee Receipt Date:</label>
                            <input type="date" name="firstInstallFeeReceiptDate" value={formData.firstInstallFeeReceiptDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Bank UTR No. (2nd Installment):</label>
                            <input type="text" name="bankUtrNo2ndInstallment" value={formData.bankUtrNo2ndInstallment} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>2nd Installment Fee Receipt Date:</label>
                            <input type="date" name="secondInstallFeeReceiptDate" value={formData.secondInstallFeeReceiptDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Bank UTR No. (3rd Installment):</label>
                            <input type="text" name="bankUtrNo3rdInstallment" value={formData.bankUtrNo3rdInstallment} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>3rd Installment Fee Receipt Date:</label>
                            <input type="date" name="thirdInstallFeeReceiptDate" value={formData.thirdInstallFeeReceiptDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Bank UTR No. (4th Installment):</label>
                            <input type="text" name="bankUtrNo4thInstallment" value={formData.bankUtrNo4thInstallment} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>4th Installment Fee Receipt Date:</label>
                            <input type="date" name="fourthInstallFeeReceiptDate" value={formData.fourthInstallFeeReceiptDate} onChange={handleChange} required />
                        </div>
                        <button type="button" className="prev-btn" onClick={prevStep}>Previous</button>
                        <button type="submit" className="submit-btn">Submit</button>
                    </>
                )}
            </form>
        </div>
    );
};

export default EnrollmentForm;