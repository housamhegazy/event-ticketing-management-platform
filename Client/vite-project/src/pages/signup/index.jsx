import React from 'react';
import { useState } from 'react';
const SignUpForm = () => {
const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you will add the fetch/axios logic to hit your backend
    console.log("Registering user:", formData);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold text-success">Create Account</h2>
          <form onSubmit={handleSubmit}>
            
            {/* Full Name Field */}
            <div className="mb-3">
              <label className="form-label text-secondary">Full Name</label>
              <input 
                type="text" 
                name="name"
                className="form-control" 
                placeholder="Enter your full name"
                onChange={handleChange}
                required 
              />
            </div>

            {/* Username Field */}
            <div className="mb-3">
              <label className="form-label text-secondary">Username</label>
              <input 
                type="text" 
                name="username"
                className="form-control" 
                placeholder="Choose a unique username"
                onChange={handleChange}
                required 
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label text-secondary">Email Address</label>
              <input 
                type="email" 
                name="email"
                className="form-control" 
                placeholder="name@example.com"
                onChange={handleChange}
                required 
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label text-secondary">Password</label>
              <input 
                type="password" 
                name="password"
                className="form-control" 
                placeholder="Min. 6 characters"
                onChange={handleChange}
                required 
              />
            </div>

            {/* Register Button */}
            <button type="submit" className="btn btn-success w-100 fw-bold py-2 mt-3 shadow-sm">
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small">
              Already have an account? <a href="/signin" className="text-decoration-none text-success fw-bold">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
