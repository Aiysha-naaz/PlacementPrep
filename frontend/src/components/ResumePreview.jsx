import React from "react";
import { jsPDF } from "jspdf";

const ResumePreview = ({ data }) => {
  const { personal, education, skills, experience, contact } = data;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Resume", 14, 20);

    doc.setFontSize(14);
    doc.text("Personal Details", 14, 30);
    doc.setFontSize(11);
    doc.text(`Name: ${personal.fullName}`, 14, 38);
    doc.text(`Email: ${personal.email}`, 14, 44);
    doc.text(`Phone: ${personal.phone}`, 14, 50);
    doc.text(`Address: ${personal.address}`, 14, 56);

    doc.setFontSize(14);
    doc.text("Education", 14, 70);
    doc.setFontSize(11);
    doc.text(`School: ${education.school}`, 14, 78);
    doc.text(`Degree: ${education.degree}`, 14, 84);
    doc.text(`Year: ${education.year}`, 14, 90);

    doc.setFontSize(14);
    doc.text("Skills", 14, 104);
    doc.setFontSize(11);
    doc.text(skills, 14, 112);

    doc.setFontSize(14);
    doc.text("Experience", 14, 126);
    doc.setFontSize(11);
    // Split experience text if long, simple word wrapping:
    const splitExp = doc.splitTextToSize(experience, 180);
    doc.text(splitExp, 14, 134);

    doc.setFontSize(14);
    doc.text("Contact", 14, 154);
    doc.setFontSize(11);
    doc.text(`LinkedIn: ${contact.linkedin}`, 14, 162);
    doc.text(`GitHub: ${contact.github}`, 14, 168);
    doc.text(`Portfolio: ${contact.portfolio}`, 14, 174);

    doc.save("resume.pdf");
  };

  return (
    <div className="preview-section">
      <h2>Resume Preview</h2>

      {/* Formatted display */}
      <section className="preview-section-block">
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> {personal.fullName}</p>
        <p><strong>Email:</strong> {personal.email}</p>
        <p><strong>Phone:</strong> {personal.phone}</p>
        <p><strong>Address:</strong> {personal.address}</p>
      </section>

      <section className="preview-section-block">
        <h3>Education</h3>
        <p><strong>School:</strong> {education.school}</p>
        <p><strong>Degree:</strong> {education.degree}</p>
        <p><strong>Year:</strong> {education.year}</p>
      </section>

      <section className="preview-section-block">
        <h3>Skills</h3>
        <p>{skills}</p>
      </section>

      <section className="preview-section-block">
        <h3>Experience</h3>
        <p>{experience}</p>
      </section>

      <section className="preview-section-block">
        <h3>Contact</h3>
        <p><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        <p><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></p>
        <p><a href={contact.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></p>
      </section>

      <button className="download-btn" onClick={generatePDF}>
        Download Resume as PDF
      </button>
    </div>
  );
};

export default ResumePreview;
