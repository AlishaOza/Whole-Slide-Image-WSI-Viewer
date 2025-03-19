import React from 'react';

const HubView = ({ imageUrl, viewArea }) => {
  return (
    <div className="hub-view">
      <img
        src={imageUrl}
        alt="Hub View"
        style={{ width: '100%', height: 'auto' }}
      />
      <div
        style={{
          position: 'absolute',
          left: viewArea.x,
          top: viewArea.y,
          width: viewArea.width,
          height: viewArea.height,
          border: '2px solid blue',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

export default HubView;