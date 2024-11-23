import React, { useState } from 'react';
import BodyDetection from './BodyDetection'; // Import BodyDetection Component

function ARButton() {
  const [isCameraActive, setIsCameraActive] = useState(false);

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
  };

  const handleClick = () => {
    window.location.href = `${window.location.origin}/Augmented/create/ar.html`;
  };
  

  return (
    <div>
      <button style={buttonStyle} onClick={handleClick}>
        Try it on 
      </button>

      {/* Show the BodyDetection component only after the button is clicked */}
      {isCameraActive && <BodyDetection />}
    </div>
  );
}

export default ARButton;
