import React, { useState } from "react";

const RoomLinkGenerator = ({ roomId }) => {
  const [copied, setCopied] = useState(false);

  const roomLink = `${window.location.origin}/room/${roomId}`; // Dynamic link based on current URL

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomLink).then(
      () => {
        setCopied(true); // Show success message
        setTimeout(() => setCopied(false), 2000); // Reset message after 2 seconds
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p>Share this room link:</p>
      <input
        type="text"
        value={roomLink}
        readOnly
        style={{
          width: "70%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={copyToClipboard}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: copied ? "#28a745" : "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
};

export default RoomLinkGenerator;
