import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../Redux/user/userApi";

const SigninForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin, { isLoading }] = useSigninMutation();
  const [message, setMessage] = useState({ text: "", type: "" });

  // validate form inputs
  const validate = () => {
    if (!email || !password) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return false;
    }
    if (password.length < 6) {
      setMessage({
        text: "Password must be at least 6 characters long.",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    signin({ email, password })
      .unwrap()
      .then(() => {
        setMessage({
          text: "Signin successful! Redirecting...",
          type: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Signin failed:", error);
        setMessage({
          text: error.data?.message || "Signin failed. Please try again.",
          type: "error",
        });
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}
      >
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
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold py-2 mt-3 shadow-sm"
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Sign In"
              )}
            </button>
            {message.text && (
              <div
                className={`mt-3 alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}
                role="alert"
              >
                {message.text}
              </div>
            )}
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-decoration-none text-primary fw-bold"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
