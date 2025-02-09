import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  // Random image generator (using picsum.photos)
  const randomImageUrl = `https://picsum.photos/1000/1000?random=${Math.floor(Math.random() * 1000)}`;

  const handleJoinRoom = useCallback(() => {
    if (value.trim()) {
      navigate(`/room/${value}`);
    } else {
      alert("Please enter a valid room code.");
    }
  }, [navigate, value]);

  return (
    <div className="home-container">
      {/* Left Side: Random Image */}
      <div className="home-image-container">
        <img
          src={randomImageUrl}
          alt="Random"
          className="home-random-image"
        />
      </div>

      {/* Right Side: Join Room Form */}
      <div className="home-form-container">
        <h1>Join a Room</h1>
        <p>Enter your room code to join a meeting or create a new one.</p>
        <input
          placeholder="Enter your room code"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="home-input"
        />
        <button
          onClick={handleJoinRoom}
          disabled={!value.trim()}
          className={`home-button ${value.trim() ? "active" : ""}`}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
