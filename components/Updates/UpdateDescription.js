import React, { useState } from 'react';
/**
 * UpdateDescription Component
 * @param {Object} props - Component props
 * @param {string} props.initialDescription - Initial description value
 * @param {function} props.onSave - Function to save the description
 * @returns {JSX.Element} React component
 */

const UpdateDescription = ({ initialDescription, onSave }) => {
  /**
   * State for managing the description value and error handling
   */
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState(null);

  /**
   * Event handler for description change
   * @param {Object} e - Event object
   */
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  /**
   * Async function to handle saving the description
   */
  const handleSave = async () => {
    try {
      await onSave(description);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      
      <textarea
        className="textarea"
        value={description}
        onChange={handleDescriptionChange}
      />
      
      <button className="btn" onClick={handleSave} disabled={error}>
        Save Description
      </button>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UpdateDescription;