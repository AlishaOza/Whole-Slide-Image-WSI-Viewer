import React from 'react';

const FindingsPanel = ({ findings }) => (
  <div>
    <h2>Findings Panel</h2>
    <ul>
      {findings.map((finding, index) => (
        <li key={index}>
          <strong>{finding.label}</strong>: ({finding.x1}, {finding.y1}) - ({finding.x2}, {finding.y2})
        </li>
      ))}
    </ul>
  </div>
);

export default FindingsPanel;