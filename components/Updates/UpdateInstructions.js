import React, { useState, useEffect } from 'react';

/**
 * UpdateInstructions Component
 * @param {Object} props - Component props
 * @param {string} props.initialInstructions - Initial instructions value
 * @param {function} props.onSave - Function to save the instructions
 * @returns {JSX.Element} React component
 */
const UpdateInstructions = ({ initialInstructions, onSave }) => {
  /**
   * State for managing the instructions value and error handling
   */
  const [instructions, setInstructions] = useState(initialInstructions);
  const [error, setError] = useState('');

  /**
   * useEffect to update instructions when initialInstructions change
   */
  useEffect(() => {
    setInstructions(initialInstructions);
  }, [initialInstructions]);

  /**
   * Event handler for instructions change
   * @param {Object} e - Event object
   */
  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  /**
   * Async function to handle saving the instructions
   */
  const handleSave = async () => {
    try {
      await onSave(instructions);
    } catch (err) {
      setError('Failed to update instructions.');
    }
  };

  return (
    <div>

      <textarea className='textarea' value={instructions} onChange={handleInstructionsChange} />

      <button className='btn' onClick={handleSave}>Save Instructions</button>

      {error && <p className='error-message'>{error}</p>}
    </div>
  );
};

export default UpdateInstructions;