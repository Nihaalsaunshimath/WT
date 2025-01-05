
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const navigate = useNavigate();

  const handleReportClick = (type) => {
    navigate(`/submit/${type}`);
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-container">
          <img src="assets/images/LOGO3.png" alt="WM Logo" className="logo" />
          <nav>
            <ul className="nav-links">
              <li><a href="/about-us" className="nav-link">About Us</a></li>
              <li><a href="/contact" className="nav-link">Contact</a></li>
              <li><a href="/changes" className="nav-link">Changes We Have Brought</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="dashboard-hero">
        <h2>Welcome to the Responsible Citizen Dashboard</h2>
        <p>Your efforts make the community better. Report issues directly to the authorities and help make a difference.</p>
      </section>

      {/* Report Section */}
      <section className="report-cards">
        <div className="report-card" onClick={() => handleReportClick('waste')}>
          <img src="assets/images/kdustbins.jpg" alt="Waste Management" className="report-image" />
          <h3>Waste Management</h3>
          <p>Report issues related to garbage disposal and waste management in your locality.</p>
        </div>
        <div className="report-card" onClick={() => handleReportClick('traffic')}>
          <img src="assets/images/TRAFFICVIOLATION.jpg" alt="Traffic Violation" className="report-image" />
          <h3>Traffic Violation</h3>
          <p>Help improve road safety by reporting traffic violations and mismanagement.</p>
        </div>
        <div className="report-card" onClick={() => handleReportClick('pothole')}>
          <img src="assets/images/potholemadhu.jpeg" alt="Pothole Report" className="report-image" />
          <h3>Pothole Report</h3>
          <p>Report dangerous potholes and road damage to prevent accidents and improve road conditions.</p>
        </div>
        <div className="report-card" onClick={() => handleReportClick('stray-animal')}>
          <img src="assets/images/Strayanimals.jpeg" alt="Stray Animal Report" className="report-image" />
          <h3>Stray Animal Report</h3>
          <p>Notify authorities about stray animals to ensure their safety and well-being.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 Responsible Citizen. All Rights Reserved. | Designed for a better community.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
