import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type, count = 1 }) => {
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <div key={i} className={`skeleton ${type}`}></div>
      );
    }
    return skeletons;
  };

  return (
    <div className="skeleton-wrapper">
      {renderSkeletons()}
    </div>
  );
};

export default Skeleton; 