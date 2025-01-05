import React, { useState } from 'react';
import axios from 'axios';
import './TrafficViolation.css';

const TrafficViolation = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    location: '',
    violationType: '',
    description: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    vehicleNumber: '',
    location: '',
    description: '',
    image: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'vehicleNumber':
        const vehicleRegex = /^[A-Z]{2}\s\d{2}\s[A-Z]{1}\s\d{4}$/;
        return !vehicleRegex.test(value) 
          ? 'Invalid vehicle number format. Example: KA NN XX NNNN' 
          : '';
          
      case 'description':
        return '';

      case 'image':
        if (value) {
          const fileSize = value.size / 1024 / 1024; // in MB
          const allowedTypes = ['image/jpeg', 'image/png'];
          
          if (!allowedTypes.includes(value.type)) {
            return 'File must be JPG or PNG';
          }
          if (fileSize > 10) {
            return 'File size must be less than 10MB';
          }
        }
        return '';

      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    
    const error = validateField('image', file);
    setErrors(prev => ({ ...prev, image: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {
      vehicleNumber: validateField('vehicleNumber', formData.vehicleNumber),
      location: validateField('location', formData.location),
      description: validateField('description', formData.description),
      image: formData.image ? validateField('image', formData.image) : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      setIsSubmitting(false);
      setErrorMessage('Please correct the errors before submitting.');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/traffic-violations/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setFormData({
        vehicleNumber: '',
        location: '',
        violationType: '',
        description: '',
        image: null,
      });
      setErrors({
        vehicleNumber: '',
        location: '',
        description: '',
        image: '',
      });
    } catch (error) {
      setErrorMessage('Failed to submit the report. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLocation = async () => {
    // Check network connectivity before setting loading state
    if (!navigator.onLine) {
      setErrors(prev => ({ 
        ...prev, 
        location: 'No network connection. Please check your internet connection.' 
      }));
      return;
    }

    setIsLoadingLocation(true);

    if (!navigator.geolocation) {
      setErrors(prev => ({ 
        ...prev, 
        location: 'Geolocation is not supported by your browser' 
      }));
      setIsLoadingLocation(false);
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Convert coordinates to address using reverse geocoding
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        );

        const address = response.data.display_name;
        setFormData(prev => ({ ...prev, location: address }));
        setErrors(prev => ({ ...prev, location: '' }));
      } catch (error) {
        // Specific error for network issues during geocoding
        if (!navigator.onLine || error.message.includes('Network Error')) {
          setErrors(prev => ({ 
            ...prev, 
            location: 'No network connection. Please check your internet connection.' 
          }));
        } else {
          setErrors(prev => ({ 
            ...prev, 
            location: 'Failed to get address. Please enter location manually.' 
          }));
        }
      }
    } catch (error) {
      // Handle geolocation errors
      let errorMessage = 'Failed to get location. Please enter manually.';
      
      if (!navigator.onLine) {
        errorMessage = 'No network connection. Please check your internet connection.';
      } else if (error.code === error.PERMISSION_DENIED) {
        errorMessage = 'Location permission denied. Please enable location access.';
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorMessage = 'Location information unavailable. Please try again.';
      } else if (error.code === error.TIMEOUT) {
        errorMessage = 'Location request timed out. Please check your connection.';
      }

      setErrors(prev => ({ 
        ...prev, 
        location: errorMessage 
      }));
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Report Traffic Violations</h1>
            <p>Help make our roads safer by reporting traffic violations. Your contribution matters.</p>
          </div>
        </div>
      </section>

      <section id="report">
        <div className="container">
          <div className="report-content-wrapper">
            <div className="guidelines">
              <h3>Reporting Guidelines</h3>
              <ul>
                <li>Usage of this site for wrong purpose is punishable</li>
                <li>Vehicle number format: KA NN XX NNNN</li>
                <li>Images must be of a legit violation</li>
                <li>Supported formats: JPG, PNG</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <div className="location-input-wrapper">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter precise location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className={errors.location ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    onClick={getLocation}
                    disabled={isLoadingLocation}
                    className="get-location-btn"
                  >
                    {!navigator.onLine 
                      ? 'No Network Connection' 
                      : isLoadingLocation 
                        ? 'Getting Location...' 
                        : '📍 Get Current Location'}
                  </button>
                </div>
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="vehicleNumber">Vehicle Number</label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  placeholder="Format: KA NN XX NNNN"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  required
                  className={errors.vehicleNumber ? 'error' : ''}
                />
                {errors.vehicleNumber && <span className="error-message">{errors.vehicleNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="violationType">Type of Violation</label>
                <select
                  id="violationType"
                  name="violationType"
                  value={formData.violationType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select violation type</option>
                  <option value="unauthorized-parking">Unauthorized parking</option>
                  <option value="phone-driving">Using phone while driving</option>
                  <option value="signal-violation">Traffic signal violation</option>
                  <option value="reckless-driving">Reckless Driving</option>
                  <option value="wrong-way">Wrong way travelling</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Provide detailed description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="image">Evidence (Photos)</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className={errors.image ? 'error' : ''}
                />
                <small>Supported formats: JPG, PNG</small>
                {errors.image && <span className="error-message">{errors.image}</span>}
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          </div>

          {successMessage && (
            <div className="alert success">
              <p>{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="alert error">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrafficViolation;
