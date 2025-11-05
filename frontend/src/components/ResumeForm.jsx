import React, { useState } from "react";

const ResumeForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: { fullName: "", email: "", phone: "", address: "" },
    education: { school: "", degree: "", year: "" },
    skills: "",
    experience: "",
    contact: { linkedin: "", github: "", portfolio: "" },
  });

  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value },
    });
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else onComplete(formData);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="form-section">
      {step === 1 && (
  <>
    <h2>Personal Details</h2>
    <input
      type="text"
      placeholder="Full Name"
      value={formData.personal.fullName}
      onChange={(e) => handleChange("personal", "fullName", e.target.value)}
    />
    <input
      type="email"
      placeholder="Email"
      value={formData.personal.email}
      onChange={(e) => handleChange("personal", "email", e.target.value)}
    />
    <input
      type="tel"
      placeholder="Phone"
      value={formData.personal.phone}
      onChange={(e) => handleChange("personal", "phone", e.target.value)}
    />
    <input
      type="text"
      placeholder="Address"
      value={formData.personal.address}
      onChange={(e) => handleChange("personal", "address", e.target.value)}
    />
  </>
)}

      {step === 2 && (
        <>
          <h2>Education</h2>
          <input
            type="text"
            placeholder="School"
            value={formData.education.school}
            onChange={(e) => handleChange("education", "school", e.target.value)}
          />
          <input
            type="text"
            placeholder="Degree"
            value={formData.education.degree}
            onChange={(e) => handleChange("education", "degree", e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            value={formData.education.year}
            onChange={(e) => handleChange("education", "year", e.target.value)}
          />
        </>
      )}
      {step === 3 && (
        <>
          <h2>Skills</h2>
          <textarea
            placeholder="List your skills (separate with commas)"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </>
      )}
      {step === 4 && (
        <>
          <h2>Experience</h2>
          <textarea
            placeholder="Describe your experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          />
        </>
      )}
      {step === 5 && (
        <>
          <h2>Contact</h2>
          <input
            type="url"
            placeholder="LinkedIn Profile URL"
            value={formData.contact.linkedin}
            onChange={(e) => handleChange("contact", "linkedin", e.target.value)}
          />
          <input
            type="url"
            placeholder="GitHub Profile URL"
            value={formData.contact.github}
            onChange={(e) => handleChange("contact", "github", e.target.value)}
          />
          <input
            type="url"
            placeholder="Portfolio Website URL"
            value={formData.contact.portfolio}
            onChange={(e) => handleChange("contact", "portfolio", e.target.value)}
          />
        </>
      )}
      <div className="form-navigation">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        <button onClick={nextStep}>{step < 5 ? "Next" : "Finish"}</button>
      </div>
    </div>
  );
};

export default ResumeForm;
