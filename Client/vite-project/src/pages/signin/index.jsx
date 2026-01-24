import React from 'react';
import { useState } from 'react';

const SigninForm = () => {
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا هتحط كود الـ fetch عشان تبعت البيانات للباك-إند
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold text-primary"> Sign in </h2>
          <form onSubmit={handleSubmit}>
            {/* حقل البريد الإلكتروني */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            {/* حقل كلمة المرور */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            {/* زر الدخول */}
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mt-3 shadow-sm">
              Sign In
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small">
               Don't have an account? <a href="/signup" className="text-decoration-none text-primary fw-bold">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;
