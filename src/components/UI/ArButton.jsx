import React, { useState } from 'react';

function ARButton({ itemImage, onTryOn }) {
  const [hover, setHover] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    transform: hover ? 'scale(1.1)' : 'scale(1)',
    boxShadow: hover ? '0px 4px 15px rgba(0, 0, 0, 0.2)' : 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
  };

  const handleClick = async () => {
    if (onTryOn) {
      onTryOn(itemImage); // Pass the image URL to the parent function
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);

      // Display the camera stream in a video element
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.style.position = 'fixed';
      videoElement.style.top = '0';
      videoElement.style.left = '0';
      videoElement.style.width = '100%';
      videoElement.style.height = '100%';
      videoElement.style.zIndex = '1000';
      document.body.appendChild(videoElement);

      // Add an event listener to stop the camera when the user clicks outside
      const stopCamera = () => {
        stream.getTracks().forEach((track) => track.stop());
        videoElement.remove();
        document.removeEventListener('click', stopCamera);
      };
      document.addEventListener('click', stopCamera);
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick} // Trigger try-on logic and open the camera
    >
      Try me on
    </button>
  );
}

export default ARButton;
