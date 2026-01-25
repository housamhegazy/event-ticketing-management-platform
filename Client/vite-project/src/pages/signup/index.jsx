import React from "react";
import { useState } from "react";
import { useSignupMutation } from "../../Redux/user/userApi";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // حالات التحقق من الأخطاء
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // وظيفة لتحديث بيانات النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // مسح الخطأ بمجرد أن يبدأ المستخدم في الكتابة
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    // مسح رسالة النجاح/الفشل عند التعديل
    if (message.text) {
      setMessage({ text: "", type: "" });
    }
  };

  // وظيفة التحقق من صحة الحقول
  const validate = () => {
    let tempErrors = {};
    let isValid = true;
    // تحقق من أن اسم المستخدم ليس فارغًا
    if (!formData.username.trim()) {
      tempErrors.username = "Username is required.";
      isValid = false;
    } else if (/\s/.test(formData.username)) {
      // تحقق من وجود مسافات
      tempErrors.username = "Username cannot contain spaces.";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      tempErrors.username =
        "Username should be alphanumeric and between 3-20 characters.";
      isValid = false;
    }

    if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      tempErrors.email = "Invalid email address.";
      isValid = false;
    }
    if (formData.password.length < 6) {
      tempErrors.password = "password must be at least 6 characters long.";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };
  // signup form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setMessage({
        text: "Please enter valid credentials to sign in.",
        type: "error",
      });
      return;
    }
    try {
      await signup(formData).unwrap();
      setMessage({ text: "Success", type: "success" });

      setTimeout(() => {
        navigate("/");
      }, 1500); // تأخير بسيط قبل إعادة التوجيه
    } catch (err) {
      console.log("Signup Error:", err);
      setMessage({
        text: err?.data?.message || "Registration failed",
        type: "error",
      });
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold text-success">
            Create Account
          </h2>
          <form onSubmit={handleSubmit}>
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
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="name@example.com"
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
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
            <button
              type="submit"
              className="btn btn-success w-100 fw-bold py-2 mt-3 shadow-sm"
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-decoration-none text-success fw-bold"
              >

                sign in
              </a>
            </p>
          </div>
          {message.text && (
            <div
              className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mt-3`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
