import React, { useState } from 'react';


const UpdateDescription = ({ initialDescription, onSave }) => {
  const [description, setDescription] = useState(initialDescription);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(description);
  };

  return (
    <div>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
      />
      <button onClick={handleSave}>Save Description</button>
    </div>
  );
};

export default UpdateDescription;





