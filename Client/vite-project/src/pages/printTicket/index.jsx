import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetEventDetailsForTicketQuery } from "../../Redux/events/createEventApi.js";
import { useReactToPrint } from "react-to-print";

const Ticket = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useGetEventDetailsForTicketQuery(id);
  const ticketRef = useRef(null); // تأكد من وضع null كقيمة مبدئية

  // دالة الطباعة المحدثة للإصدارات الجديدة
  const handlePrint = useReactToPrint({
    contentRef: ticketRef, // التعديل الجوهري هنا
    documentTitle: `Ticket-${event?.title || 'Event'}`,
  });

  if (isLoading) return <div className="text-center mt-5">Loading Ticket...</div>;
  if (!event) return <div className="text-center mt-5 text-danger">Event not found!</div>;

  return (
    <div className="container mt-5 text-center">
      {/* الجزء اللي هيتطبع */}
      <div ref={ticketRef} className="p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden" 
             style={{ background: "#ffffff", borderLeft: "10px solid #198754", textAlign: "left" }}>
          <div className="row g-0">
            <div className="col-8 p-4">
              <h2 className="fw-bold text-success mb-1">EVENT TICKET</h2>
              <p className="text-muted small">Official Entry Pass</p>
              
              <h3 className="mt-4 fw-bold">{event?.title}</h3>
              <div className="mt-3">
                <p className="mb-1"><strong>Date:</strong> {new Date(event?.date).toLocaleDateString()}</p>
                <p className="mb-1"><strong>Location:</strong> {event?.location}</p>
                <p className="mb-1"><strong>Category:</strong> {event?.category}</p>
                <p className="mb-1"><strong>Organizer:</strong> {event?.organizer?.username || 'N/A'}</p>
                {/* <p className="mb-1"><strong>Price:</strong> {event?.price > 0 ? `$${event.price}` : "Free"}</p> */}
              </div>
            </div>
            {/* event image */}
            {event?.image && (
              <div className="col-4 bg-light d-flex flex-column align-items-center justify-content-center border-start border-2 border-dashed">
                <img 
                  src={event.image} 
                  alt="Event" 
                  className="img-fluid rounded-3 mb-2" 
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
               <div className="bg-dark text-white p-3 rounded-3 mb-2 d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                  <span style={{ fontSize: "10px" }}>QR CODE</span>
               </div>
               <p className="small text-muted mt-2">ID: {event?._id?.slice(-6).toUpperCase()}</p>
            </div>
          </div>
          <div className="w-100 border-top border-dashed py-2" style={{ borderColor: "#ccc" }}></div>
        </div>
      </div>

      <div className="mt-4 no-print"> {/* إضافة كلاس لإخفاء الأزرار أثناء الطباعة لو حبيت */}
        <button 
          onClick={() => handlePrint()} 
          className="btn btn-success px-5 py-2 rounded-pill fw-bold shadow"
        >
          <i className="bi bi-printer me-2"></i> Print or Save as PDF
        </button>
      </div>
    </div>
  );
};

export default Ticket;