import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    universityId: '',
    email: '',
    department: 'Computer Education',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Type added here: It accepts changes from either an input field or a select dropdown
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Type added here: FormEvent prevents the implicit 'any' error
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Sending data to database:", formData);
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
          <h2>Create an Account</h2>
          <p>Register your official university credentials</p>
        </div>

        <form onSubmit={handleRegister} className="form-grid">
          
          <div className="input-group">
            <label>First Name</label>
            <input 
              type="text" name="firstName" value={formData.firstName} onChange={handleChange}
              className="register-input" placeholder="First Name" required 
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input 
              type="text" name="lastName" value={formData.lastName} onChange={handleChange}
              className="register-input" placeholder="Last Name" required 
            />
          </div>

          <div className="input-group full-width">
            <label>University ID Number</label>
            <input 
              type="text" name="universityId" value={formData.universityId} onChange={handleChange}
              className="register-input" placeholder="e.g., 20260100" required 
            />
          </div>

          <div className="input-group full-width">
            <label>Academic Email</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              className="register-input" placeholder="student@tiu.edu.iq" required 
            />
          </div>

          <div className="input-group full-width">
            <label>Department</label>
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
            <label>Password</label>
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange}
              className="register-input" placeholder="Create a strong password" required 
            />
          </div>

          <div className="full-width">
            <button type="submit" className="register-btn-animated" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;