import React from "react";
import { useGetOrganizerEventsQuery,useDeleteEventMutation } from "../../Redux/events/createEventApi.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyEvents = () => {
  // جلب البيانات من الباك إند
  const { data: events, isLoading, isError } = useGetOrganizerEventsQuery();
  const [deleteEvent] = useDeleteEventMutation();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(id).unwrap();
        Swal.fire("Deleted!", "Your event has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err?.data?.message || "Failed to delete the event.", "error");
      }
    }
  };

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border text-success"></div></div>;
  
  if (isError) return <div className="alert alert-danger m-5">Error loading events</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Events</h2>
        <Link to="/organizer/create-event" className="btn btn-success">add new event + </Link>
      </div>

      {events?.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted">No events found.</p>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle bg-white">
            <thead className="table-dark">
              <tr>
                <th>address</th>
                <th>date</th>
                <th> available seats </th>
                <th> status </th>
                <th>price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td><strong>{event.title}</strong></td>
                  <td>{new Date(event.date).toLocaleDateString('ar-EG')}</td>
                  <td>{event.availableSeats} / {event.capacity}</td>
                  <td>
                    {event.isPublished ? 
                      <span className="badge bg-success">published</span> : 
                      <span className="badge bg-secondary">draft</span>
                    }
                  </td>
                  <td>{event.price === 0 ? "free" : `${event.price} SAR`}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-primary me-2">edit</button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleDelete(event._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEvents;