import React from "react";
import './ChangesWeHaveBrought.css';

const ChangesWeHaveBrought = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Changes We Have Brought</h1>
      </header>
      <div className="content">
        <div className="before-after">
          <div className="image-container">
            <h3>Before</h3>
            <img src="/assets/images/before.jpg" alt="Before changes" className="image" />
          </div>
          <div className="image-container">
            <h3>After</h3>
            <img src="assets/images/AFTERCLEANING.jpeg" alt="After changes" className="image" />
          </div>
        </div>
        <p className="description">
          We have made significant improvements to enhance user experience, streamline navigation, 
          and modernize the design for better accessibility.
        </p>
      </div>
    </div>
  );
};

export default ChangesWeHaveBrought;
