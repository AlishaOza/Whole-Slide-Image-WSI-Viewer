import React from 'react';

const BoundingBox = ({ box, isSelected, zoomLevel, rotation }) => {
  const { x1, y1, x2, y2, label } = box;
  return (
    <div
      style={{
        position: 'absolute',
        left: x1,
        top: y1,
        width: x2 - x1,
        height: y2 - y1,
        border: `2px solid ${isSelected ? 'blue' : 'red'}`,
        backgroundColor: isSelected ? 'rgba(0, 0, 255, 0.2)' : 'rgba(255, 0, 0, 0.2)',
        transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
        transformOrigin: 'top left',
      }}
      title={label}
    />
  );
};

export default BoundingBox;