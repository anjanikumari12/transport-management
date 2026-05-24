import { useEffect, useState } from "react";
import API from "../services/api";

function Bookings() {

  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    source: "",
    destination: "",
    status: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

    try {

      const res = await API.get("/bookings");

      setBookings(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/bookings", formData);

      fetchBookings();

      setFormData({
        customerName: "",
        source: "",
        destination: "",
        status: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>Bookings Page</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="source"
          placeholder="Source"
          value={formData.source}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Booking
        </button>

      </form>

      <hr />

      {bookings.map((booking) => (
        <div key={booking._id}>
          <h3>{booking.customerName}</h3>

          <p>{booking.source}</p>

          <p>{booking.destination}</p>

          <p>{booking.status}</p>
        </div>
      ))}

    </div>
  );
}

export default Bookings;