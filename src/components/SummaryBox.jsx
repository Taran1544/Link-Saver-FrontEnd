import { useState } from 'react';
import '../styles/SummaryBox.css';

const SummaryBox = ({ title, url, favicon, summary, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!title || !url) return null;

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const summaryPreview = summary?.length > 100 ? summary.slice(0, 100) + '...' : summary;

  return (
    <div className="summary-box">
      <div className="summary-header">
        <img src={favicon || '/default-favicon.png'} alt="favicon" className="favicon" />
        <div className="summary-title" onClick={toggleExpand}>
          <h3>{title}</h3>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </div>
        <button onClick={onDelete} className="delete-button">🗑️</button>
      </div>
      
      <div className="summary-text" onClick={toggleExpand}>
        <p>{isExpanded ? summary : summaryPreview}</p>
        <span className="expand-toggle">{isExpanded ? 'Show less ▲' : 'Read more ▼'}</span>
      </div>
    </div>
  );
};

export default SummaryBox;
