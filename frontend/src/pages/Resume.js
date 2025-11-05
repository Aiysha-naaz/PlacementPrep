import React, { useState } from "react";
import UploadResume from "../components/UploadResume";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import '../styles/Resume.css';

const Resume = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState(null);

  return (
    <div className="resume-wrapper">
      <h1>Manage Your Resume</h1>

      {/* Step 1: Upload Resume */}
      <UploadResume onFileUpload={setUploadedFile} />

      {/* Step 2: Fill form (conditionally show only if no file or after upload) */}
      <ResumeForm onComplete={setFormData} />

      {/* Step 3: Preview filled resume */}
      {formData && <ResumePreview data={formData} />}
    </div>
  );
};

export default Resume;
