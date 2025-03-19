import React, { useState } from 'react';
import ImageViewer from './ImageViewer';
import MetadataPanel from './MetadataPanel';
import HubView from './HubView';
import './WSIViewer.css';

const WSIViewer = ({ imageUrl, detectionResults, findings }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [viewArea, setViewArea] = useState({
    x: 100,
    y: 100,
    width: 200,
    height: 150,
  });

  return (
    <div className="wsi-viewer">
      <MetadataPanel
        findings={findings}
        selectedBox={selectedBox}
        onSelectBox={setSelectedBox}
      />
      <div className="main-view">
        <ImageViewer
          imageUrl={imageUrl}
          detectionResults={detectionResults}
          selectedBox={selectedBox}
          onViewAreaChange={setViewArea}
        />
        <HubView
          imageUrl={imageUrl}
          viewArea={viewArea}
        />
      </div>
    </div>
  );
};

export default WSIViewer;