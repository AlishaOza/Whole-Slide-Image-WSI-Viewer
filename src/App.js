import React, { useState, useRef } from 'react';
import FindingsPanel from './components/FindingsPanel';
import './App.css';
import detectionResults from './data/output'; // Import your detection_results

const App = () => {
  const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level
  const [rotation, setRotation] = useState(0); // Initial rotation
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Image position for panning
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Cursor position for hub view
  const imageRef = useRef(null); // Reference to the image element

  // Transform detectionResults into the required format
  const findings = detectionResults.map(([x1, y1, x2, y2, label]) => ({
    label,
    x1,
    y1,
    x2,
    y2,
  }));

  // Zoom In
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3)); // Limit zoom to 3x
  };

  // Zoom Out
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Limit zoom to 0.5x
  };

  // Reset Zoom
  const handleReset = () => {
    setZoomLevel(1); // Reset to default zoom
    setRotation(0); // Reset rotation
    setPosition({ x: 0, y: 0 }); // Reset position
  };

  // Rotate 90°
  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360); // Rotate by 90°
  };

  // Handle mouse wheel for zoom
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      handleZoomIn(); // Zoom in on scroll up
    } else {
      handleZoomOut(); // Zoom out on scroll down
    }
  };

  // Handle mouse drag for panning
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move to track cursor position
  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  };

  return (
    <div className="App">
      {/* Left Side: Findings Panel */}
      <div className="metadata-panel">
        <FindingsPanel findings={findings} />
      </div>

      {/* Center: Image Viewer */}
      <div
        className="image-viewer-container"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div
          style={{
            position: 'relative',
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <img
            ref={imageRef}
            src="/images/wsi-image.png"
            alt="WSI Image"
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              transition: 'transform 0.3s ease',
            }}
          />
          {/* Overlay red squares for detection areas */}
          {findings.map((finding, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${finding.x1}px`,
                top: `${finding.y1}px`,
                width: `${finding.x2 - finding.x1}px`,
                height: `${finding.y2 - finding.y1}px`,
                border: '2px solid red',
                boxSizing: 'border-box',
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              }}
            />
          ))}
        </div>
        <div className="controls">
          <button onClick={handleZoomIn}>Zoom In</button>
          <button onClick={handleZoomOut}>Zoom Out</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleRotate}>Rotate 90°</button>
        </div>
      </div>

      {/* Right Side: Hub View */}
      <div className="hub-view">
        <h3>Hub View</h3>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/wsi-image.png"
            alt="WSI Image Hub"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `rotate(${rotation}deg)`,
            }}
          />
          {/* Blue square to indicate cursor position */}
          <div
            style={{
              position: 'absolute',
              left: `${cursorPosition.x / zoomLevel}px`,
              top: `${cursorPosition.y / zoomLevel}px`,
              width: `20px`,
              height: `20px`,
              border: '2px solid blue',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <p>Zoom Level: {(zoomLevel * 100).toFixed(0)}%</p>
        <p>Rotation: {rotation}°</p>
        <p>Patient ID: 12345</p>
        <p>Blood Type: O+</p>
      </div>
    </div>
  );
};

export default App;