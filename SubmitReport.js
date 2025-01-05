// SubmitReport.js (React)
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { submitPotholeReport, submitStrayAnimalReport, submitTrafficViolationReport, submitWasteReport } from 'services/api'; // Import API functions
import { submitPotholeReport, submitStrayAnimalReport, submitTrafficViolationReport, submitWasteReport } from '../services/api'; // Correct relative path

const SubmitReport = () => {
  const { reportType } = useParams(); // Get the report type from the URL
  const navigate = useNavigate();

  const [reportData, setReportData] = useState({
    description: '',
    location: '',
    imageUrl: '',
  });

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      // Call the respective API function based on reportType
      if (reportType === 'pothole') {
        response = await submitPotholeReport(reportData);
      } else if (reportType === 'stray-animal') {
        response = await submitStrayAnimalReport(reportData);
      } else if (reportType === 'traffic') {
        response = await submitTrafficViolationReport(reportData);
      } else if (reportType === 'waste') {
        response = await submitWasteReport(reportData);
      }

      // If the report was successfully submitted
      if (response.status === 200) {
        navigate('/success'); // Redirect to the success page
      } else {
        alert('Failed to submit the report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred while submitting the report');
    }
  };

  return (
    <div>
      <h1>Submit {reportType} Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={reportData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={reportData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={reportData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default SubmitReport;
