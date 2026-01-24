import React from "react";

const Navebar = () => {
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
            <li className="nav-item ms-lg-3">
              <a className="btn btn-primary rounded-pill px-4" href="/signin">
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navebar;
