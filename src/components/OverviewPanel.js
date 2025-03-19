import React from 'react';

const OverviewPanel = ({ overviewData }) => (
  <div>
    <h2>Overview Panel</h2>
    <ul>
      {overviewData.map((data, index) => (
        <li key={index}>
          <strong>{data.label}</strong>: ({data.x1}, {data.y1}) - ({data.x2}, {data.y2})
        </li>
      ))}
    </ul>
  </div>
);

export default OverviewPanel;