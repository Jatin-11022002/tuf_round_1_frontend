import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../components/Banner";

const MainPage = () => {
  const [bannerData, setBannerData] = useState({
    isVisible: false,
    description: "",
    link: "",
    timer: import.meta.env.VITE_BANNER_TIMER_DEFAULT,
  });

  useEffect(() => {
    // Fetch banner data from the server
    axios
      .get(`${import.meta.env.VITE_API_URL}/banner`)
      .then((response) => {
        console.log(response.data);
        setBannerData(response.data);
      })
      .catch((error) => console.error("Error fetching banner data:", error));
  }, []);

  const handleTimerEnd = () => {
    setBannerData((prevState) => ({ ...prevState, isVisible: false }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome!!</h1>
      {bannerData.isVisible ? (
        <Banner
          isVisible={bannerData.isVisible}
          description={bannerData.description}
          link={bannerData.link}
          timer={bannerData.timer}
          onTimerEnd={handleTimerEnd}
        />
      ) : (
        <div style={styles.noBanner}>
          <h2>No Active Banner</h2>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Roboto', sans-serif",
    color: "#333",
  },
  heading: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50",
  },
  noBanner: {
    textAlign: "center",
    padding: "50px 0",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
};

export default MainPage;
