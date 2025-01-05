
// import React, { useState } from "react";
// import axios from "axios";
// import "./WasteManagement.css";

// const WasteManagement = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     title: "",
//     location: "",
//     description: "",
//     image: null,
//   });

//   const [successMessage, setSuccessMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     try {
//       const response = await axios.post("http://localhost:5000/api/waste-reports/create", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSuccessMessage(response.data.message || "Your report has been successfully submitted!");
//     } catch (error) {
//       console.error("Error submitting report:", error);
//       setSuccessMessage("Failed to submit the report. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card d-flex flex-row">
//         <div className="left-side">
//           <img src="/assets/images/SAVECITY.png" alt="Waste Management" className="image" />
//         </div>
//         <div className="right-side">
//           <h2>Report Waste</h2>
//           <form id="reportForm" onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 placeholder="Enter your name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="title" className="form-label">Title</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="title"
//                 name="title"
//                 placeholder="Enter a title for the report"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="location" className="form-label">Location</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="location"
//                 name="location"
//                 placeholder="Enter waste location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="description" className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 id="description"
//                 name="description"
//                 rows="4"
//                 placeholder="Describe the issue"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 required
//               ></textarea>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="image" className="form-label">Upload Image</label>
//               <input
//                 type="file"
//                 className="form-control"
//                 id="image"
//                 name="image"
//                 onChange={handleFileChange}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary w-100">Submit</button>
//           </form>
//           {successMessage && (
//             <div className={`mt-3 fw-bold ${successMessage.includes('successfully') ? 'text-success' : 'text-danger'}`}>
//               {successMessage}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WasteManagement;


import React, { useState } from "react";
import axios from "axios";
import "./WasteManagement.css";

const WasteManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    location: "",
    description: "",
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState("");

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
      const response = await axios.post("http://localhost:5000/api/waste-reports/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage(response.data.message || "Your report has been successfully submitted!");
    } catch (error) {
      console.error("Error submitting report:", error);
      setSuccessMessage("Failed to submit the report. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card d-flex flex-row">
        <div className="left-side">
          <img src="/assets/images/SAVECITY.png" alt="Waste Management" className="image" />
        </div>
        <div className="right-side">
          <h2>Report Waste</h2>
          <form id="reportForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter a title for the report"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                placeholder="Enter waste location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                placeholder="Describe the issue"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Upload Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
          {successMessage && (
            <div className={`mt-3 fw-bold ${successMessage.includes('successfully') ? 'text-success' : 'text-danger'}`}>
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WasteManagement;
