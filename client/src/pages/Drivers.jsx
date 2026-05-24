import { useEffect, useState } from "react";
import API from "../services/api";

function Drivers() {

  const [drivers, setDrivers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    experience: "",
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {

    try {

      const res = await API.get("/drivers");

      setDrivers(res.data);

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

      await API.post("/drivers", formData);

      fetchDrivers();

      setFormData({
        name: "",
        phone: "",
        experience: "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>Drivers Page</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Driver Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Driver
        </button>

      </form>

      <hr />

      {drivers.map((driver) => (
        <div key={driver._id}>
          <h3>{driver.name}</h3>

          <p>{driver.phone}</p>

          <p>{driver.experience} Years</p>
        </div>
      ))}

    </div>
  );
}

export default Drivers;