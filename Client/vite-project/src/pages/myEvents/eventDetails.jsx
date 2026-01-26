import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetEventByIdQuery } from "../../Redux/events/createEventApi"; // تأكد من إضافة هذا الـ endpoint في الـ API
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: event, isLoading, isError } = useGetEventByIdQuery(id);

  const handleBooking = () => {
    // هنا هنضيف منطق الحجز لاحقاً
    Swal.fire({
      title: "Confirm Booking",
      text: `Do you want to book a seat for ${event?.title}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Book Now!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your seat has been reserved.", "success");
      }
    });
  };

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (isError) return <div className="alert alert-danger m-5 text-center">Event not found!</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container mt-5 mb-5"
    >
      <div className="row g-4">
        {/* الجزء الأيسر: الصورة والمعلومات الأساسية */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <img 
              src={event.image || "https://via.placeholder.com/800x400"} 
              className="img-fluid w-100" 
              alt={event.title}
              style={{ maxHeight: "450px", objectFit: "cover" }}
            />
            <div className="card-body p-4">
              <span className="badge bg-primary mb-2">{event.category}</span>
              <h1 className="fw-bold mb-4">{event.title}</h1>
              
              <h5 className="fw-bold mt-4">Description</h5>
              <p className="text-muted lh-lg">{event.description}</p>
              
              <hr />
              <div className="d-flex align-items-center mt-4">
                <div className="bg-light p-3 rounded-circle me-3">
                  <i className="bi bi-geo-alt-fill text-danger fs-4"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Location</h6>
                  <p className="text-muted mb-0">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الجزء الأيمن: كارت الحجز والتوقيت */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: "100px" }}>
            <h4 className="fw-bold mb-4 text-primary">Ticket Details</h4>
            
            <div className="mb-3">
              <label className="text-muted small">Price</label>
              <div className="fs-3 fw-bold text-success">
                {event.price === 0 ? "Free" : `${event.price} SAR`}
              </div>
            </div>

            <div className="mb-3">
              <label className="text-muted small">Date & Time</label>
              <div className="fw-bold text-dark">
                {new Date(event.date).toLocaleString('en-US', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-muted small">Availability</label>
              <div className="progress mt-2" style={{ height: "10px" }}>
                <div 
                  className="progress-bar bg-info" 
                  style={{ width: `${(event.availableSeats / event.capacity) * 100}%` }}
                ></div>
              </div>
              <small className="text-muted d-block mt-1">
                {event.availableSeats} seats left out of {event.capacity}
              </small>
            </div>

            <button 
              className="btn btn-primary w-100 py-3 fw-bold rounded-3 mb-2"
              onClick={handleBooking}
              disabled={event.availableSeats <= 0}
            >
              {event.availableSeats > 0 ? "Book My Spot Now" : "Sold Out"}
            </button>
            
            <button 
              className="btn btn-outline-secondary w-100 py-2 rounded-3"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetails;