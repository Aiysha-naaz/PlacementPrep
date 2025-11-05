import React, { useRef, useState } from "react";

const UploadResume = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-section" onClick={handleClick} tabIndex={0} onKeyPress={(e) => {
      if (e.key === 'Enter') handleClick();
    }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        hidden
      />
      <p>{fileName ? `Uploaded: ${fileName}` : "Click or Drag & Drop to Upload Your Resume"}</p>
    </div>
  );
};

export default UploadResume;
