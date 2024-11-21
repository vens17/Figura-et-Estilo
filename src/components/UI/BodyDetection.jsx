import React, { useEffect, useRef, useState } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs';

function BodyDetection() {
  const [isBodyDetected, setIsBodyDetected] = useState(false);
  const [isBodyDetectionActive, setIsBodyDetectionActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let net; // For storing the BodyPix model
    let detectionTimeoutId;
    let animationFrameId;

    const setupCamera = async () => {
      try {
        const constraints = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;

        // After 6 seconds, activate body detection
        detectionTimeoutId = setTimeout(() => {
          setIsBodyDetectionActive(true);
        }, 6000);
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    const loadBodyPixModel = async () => {
      net = await bodyPix.load();
      detectBody(net);
    };

    const detectBody = async (model) => {
      const videoElement = videoRef.current;
      const canvas = canvasRef.current;

      if (!videoElement || !canvas || !model) return;

      const ctx = canvas.getContext('2d');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      const detect = async () => {
        const segmentation = await model.segmentPerson(videoElement);

        // Check for body presence
        if (segmentation.allPoses.length > 0) {
          setIsBodyDetected(true);
        } else {
          setIsBodyDetected(false);
        }

        // Optional: Draw the segmentation mask
        bodyPix.drawMask(canvas, videoElement, segmentation, 1, 1, false);

        // Continue detecting
        animationFrameId = requestAnimationFrame(detect);
      };

      if (isBodyDetectionActive) detect();
    };

    setupCamera();

    if (isBodyDetectionActive) {
      loadBodyPixModel();
    }

    return () => {
      // Cleanup: stop the video stream and clear timeouts/animation frames
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }

      clearTimeout(detectionTimeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isBodyDetectionActive]);

  return (
    <div>
      <h2>{isBodyDetected ? 'Body detected!' : 'Waiting for detection...'}</h2>
      <video ref={videoRef} autoPlay playsInline width="100%" height="100%" />
      <canvas ref={canvasRef} style={{ position: 'absolute' }} />
    </div>
  );
}

export default BodyDetection;
