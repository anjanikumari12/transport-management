import { useEffect, useState } from "react";
import API from "../services/api";

function Vehicles() {

  const [vehicles, setVehicles] = useState([]);

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    driverName: "",
    capacity: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");

      setVehicles(res.data);

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

      await API.post("/vehicles", formData);

      fetchVehicles();

      setFormData({
        vehicleNumber: "",
        driverName: "",
        capacity: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>Vehicles Page</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="driverName"
          placeholder="Driver Name"
          value={formData.driverName}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Vehicle
        </button>

      </form>

      <hr />

      {vehicles.map((vehicle) => (
        <div key={vehicle._id}>
          <h3>{vehicle.vehicleNumber}</h3>

          <p>{vehicle.driverName}</p>

          <p>{vehicle.capacity}</p>
        </div>
      ))}

    </div>
  );
}

export default Vehicles;