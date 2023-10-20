import React, { useState, useEffect } from 'react';

const UpdateInstructions = ({ initialInstructions, onSave }) => {
  const [Instructions, setInstructions] = useState('');

  useEffect(() => {
    setInstructions(initialInstructions);
  }, [initialInstructions]);

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleSave = () => {
    onSave(Instructions);
  };

  return (
    <div>
      <textarea value={Instructions} onChange={handleInstructionsChange} />
      <button onClick={handleSave}>Save Instructions</button>
    </div>
  );
};

export default UpdateInstructions;