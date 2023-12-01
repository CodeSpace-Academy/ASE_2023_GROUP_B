import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadSpinner = () => {
  return (
    <div className="loading-spinner">
      <Spinner animation="border" size="lg" />
    </div>
  );
};

export default LoadSpinner;