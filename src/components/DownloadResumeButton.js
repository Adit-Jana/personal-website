// src/components/DownloadResumeButton.jsx
import React from 'react';
import { Download } from 'react-feather';

export default function DownloadResumeButton() {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/RenderCV_EngineeringResumes_Theme (1).pdf'; // File in /public folder
    link.download = 'Adit_Jana_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleResumeDownload} className="shimmer-button">
      <Download size={20} />
      <span>Download Resume</span>
    </button>
  );
}