import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useSettings();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    universityId: '',
    email: '',
    department: 'Computer Education',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Registration successful! Please log in.");
      navigate('/login');
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        
        <div className="register-header">
          <h2>{t('createAccount')}</h2>
          <p>{t('registerCreds')}</p>
        </div>

        <form onSubmit={handleRegister} className="form-grid">
          
          <div className="input-group">
            <label>{t('firstName')}</label>
            <input 
              type="text" name="firstName" value={formData.firstName} onChange={handleChange}
              className="register-input" required 
            />
          </div>

          <div className="input-group">
            <label>{t('lastName')}</label>
            <input 
              type="text" name="lastName" value={formData.lastName} onChange={handleChange}
              className="register-input" required 
            />
          </div>

          <div className="input-group full-width">
            <label>{t('univId')}</label>
            <input 
              type="text" name="universityId" value={formData.universityId} onChange={handleChange}
              className="register-input" dir="ltr" style={{ textAlign: 'start' }} placeholder="e.g., 20260100" required 
            />
          </div>

          <div className="input-group full-width">
            <label>{t('academicEmail')}</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              className="register-input" dir="ltr" style={{ textAlign: 'start' }} placeholder="student@tiu.edu.iq" required 
            />
          </div>

          <div className="input-group full-width">
            <label>{t('dept')}</label>
            <select 
              name="department" value={formData.department} onChange={handleChange}
              className="register-input"
            >
              <option value="Computer Education">Computer Education</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Computer Engineering">Computer Engineering</option>
            </select>
          </div>

          <div className="input-group full-width">
            <label>{t('password')}</label>
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange}
              className="register-input" dir="ltr" style={{ textAlign: 'start' }} required 
            />
          </div>

          <div className="full-width">
            <button type="submit" className="register-btn-animated" disabled={isSubmitting}>
              {isSubmitting ? t('authenticating') : t('completeReg')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;