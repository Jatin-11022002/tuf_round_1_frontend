import React, { useState, useEffect } from "react";

const Banner = ({ isVisible, description, link, timer, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      onTimerEnd();
    }
  }, [isVisible, timeLeft]);

  if (!isVisible)
    return (
      <div style={styles.hiddenBanner}>
        <h2>Nothing to display</h2>
      </div>
    );

  return (
    <div style={styles.bannerContainer}>
      <div style={styles.bannerContent}>
        <p style={styles.description}>{description}</p>
        <p style={styles.timer}>
          {timeLeft} second{timeLeft !== 1 && "s"} remaining
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            Click Here
          </a>
        )}
      </div>
    </div>
  );
};

const styles = {
  bannerContainer: {
    backgroundColor: "#1e90ff",
    padding: "20px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    margin: "20px auto",
    color: "#fff",
    fontFamily: "'Roboto', sans-serif",
    position: "relative",
    animation: "fadeIn 1s ease-in-out",
  },
  bannerContent: {
    position: "relative",
    zIndex: 1,
  },
  description: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  timer: {
    fontSize: "1.2rem",
    marginBottom: "15px",
    fontStyle: "italic",
  },
  link: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#ffcc00",
    color: "#1e90ff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  hiddenBanner: {
    textAlign: "center",
    marginTop: "50px",
    color: "#888",
    fontSize: "1.2rem",
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
};

export default Banner;
