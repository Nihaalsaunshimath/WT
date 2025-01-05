
// // StrayAnimalReport.js
// import React from 'react';

// const StrayAnimalReport = () => {
//   return (
//     <div>
//       <h1>Stray Animal Report</h1>
//       <form>
//         <label>Location:</label>
//         <input type="text" placeholder="Enter location" required />

//         <label>Description:</label>
//         <textarea placeholder="Describe the situation" required></textarea>

//         <label>Upload Image:</label>
//         <input type="file" accept="image/*" />

//         <button type="submit">Submit Report</button>
//       </form>
//     </div>
//   );
// };

// export default StrayAnimalReport;
import React, { useState } from 'react';
import axios from 'axios';

const StrayAnimalReport = () => {
  const [formData, setFormData] = useState({
    animalType: '',
    location: '',
    status: '',
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/stray-animals/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting stray animal report:', error);
      setErrorMessage('Failed to submit the report. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Stray Animal Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="animalType">Animal Type:</label>
          <input
            type="text"
            id="animalType"
            name="animalType"
            placeholder="Enter animal type (e.g., dog, cat)"
            value={formData.animalType}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            placeholder="Enter animal status (e.g., injured, roaming)"
            value={formData.status}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit">Submit Report</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default StrayAnimalReport;
