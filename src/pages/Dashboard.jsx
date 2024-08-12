import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [bannerData, setBannerData] = useState({
    isVisible: true,
    description: "",
    link: "",
    timer: 10,
  });

  useEffect(() => {
    // Fetch current banner settings from the server
    axios
      .get(`${import.meta.env.VITE_API_URL}/banner`)
      .then((response) => setBannerData(response.data))
      .catch((error) => console.error("Error fetching banner data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData({
      ...bannerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlPattern =
      /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

    if (bannerData.link && !urlPattern.test(bannerData.link)) {
      alert("Please enter a valid HTTP or HTTPS URL.");
      return;
    }

    // Update banner settings in the database
    axios
      .post(`${import.meta.env.VITE_API_URL}/banner/1`, bannerData)
      .then((response) => alert("Banner updated successfully"))
      .catch((error) => console.error("Error updating banner:", error));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Show Banner:</label>
          <input
            type="checkbox"
            name="isVisible"
            checked={bannerData.isVisible}
            onChange={handleChange}
            style={styles.checkbox}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Banner Description:</label>
          <input
            type="text"
            name="description"
            value={bannerData.description}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Banner Link:</label>
          <input
            type="text"
            name="link"
            value={bannerData.link}
            onChange={handleChange}
            style={styles.input}
            placeholder="http://.."
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Timer (seconds):</label>
          <input
            type="number"
            name="timer"
            value={bannerData.timer}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Update Banner
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#1e90ff",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#1e90ff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#1c7ed6",
  },
};

export default Dashboard;
