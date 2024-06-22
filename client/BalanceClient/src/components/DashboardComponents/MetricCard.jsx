/* eslint-disable react/prop-types */
import './MetricCard.css';

function MetricCard({ metric, info, value }) {
  return (
    <div className="card-container">
      <div className="card-header">{metric}</div>
      <div className="card-info">{info}</div>
      <div className="card-value">{value}</div>
    </div>
  );
}

export default MetricCard;
