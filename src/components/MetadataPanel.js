import React from 'react';

const MetadataPanel = ({ findings }) => {
  return (
    <div className="metadata-panel">
      <h3>Findings</h3>
      <ul>
        {findings.map((finding, index) => (
          <li key={index}>
            <strong>Label:</strong> {finding.label}<br />
            <strong>Coordinates:</strong> ({finding.x1}, {finding.y1}) - ({finding.x2}, {finding.y2})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetadataPanel;