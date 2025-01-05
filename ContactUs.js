import React from "react";
import { Link } from "react-router-dom";
import "./ContactUs.css"; // Ensure the CSS file is linked

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <header className="header">
        <h1 className="logo">Our Website</h1>
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/changes">Changes We Have Brought</Link></li>
          </ul>
        </nav>
      </header>

      <section className="content">
        <div className="contact-container">
          <h2 className="section-heading">Contact Us</h2>
          <p>If you have any questions, feel free to reach out to us using the details below:</p>

          <div className="contact-details">
            <div className="contact-box">
              <div className="contact-item">
                <img
                  src="/assets/images/imail.jpg"
                  alt="Email"
                  className="icon"
                />
                <p>Email: responsiblecitizensmuncipal@gmail.com</p>
              </div>
            </div>
            <div className="contact-box">
              <div className="contact-item">
                <img
                  src="/assets/images/contact.jpg"
                  alt="Phone"
                  className="icon"
                />
                <p>Phone: +918361234560</p>
              </div>
            </div>
          </div>
        </div>

        <div className="location-box">
          <h3 className="section-heading">Our Location</h3>
          <div className="location-map">
            {/* Clickable Google Maps link */}
            <a
              href="https://g.co/kgs/n7X7tBV"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              View Our Location on Google Maps
            </a>

            {/* Optional: Embed Google Maps iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.516681710419!2d-122.40335018468107!3d37.79082647975802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815299a104b9%3A0x8af2c1cfc60b30e7!2sGoogle!5e0!3m2!1sen!2sus!4v1690412345678!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Our Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
