import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { clearAuthUser } from "../Redux/user/authSlice";
import { useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../Redux/user/userApi";
const Navebar = () => {
    const { isAuthenticated , user,isLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signOut] = useSignOutMutation();
    const handleSignOut = async (e) => {
      e.preventDefault();
      try {
        await signOut().unwrap();
        dispatch(clearAuthUser());
        navigate('/signin');
      } catch (error) {
        console.error("Sign out failed:", error);
        alert("Sign out failed. Please try again.");
      }
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        {/* الشعار */}
        <a className="navbar-brand fw-bold" href="#">
          🎟️ EventTicket
        </a>

        {/* زرار القائمة للموبايل */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
              Main Page
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                my Tickets
              </a>
            </li>
            {/* زرار تسجيل الدخول */}
            {isAuthenticated ? (
              <li className="nav-item ms-lg-3">
                <a className="btn btn-outline-light rounded-pill px-4" href="#">
                  {user?.username || 'Profile'}
                </a>
              </li>
            ) : (
              <li className="nav-item ms-lg-3">
                <a className="btn btn-primary rounded-pill px-4" href="/signin">
                  Sign In
                </a>
              </li>
            )}
            {!isAuthenticated && (
              <li className="nav-item ms-lg-2">
                <a className="btn btn-outline-light rounded-pill px-4" href="/signup">
                  Sign Up
                </a>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item ms-lg-2">
                <NavLink onClick={handleSignOut} className="btn btn-danger rounded-pill px-4" href="/signout">
                  Sign Out
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navebar;
