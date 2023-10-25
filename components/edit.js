import { useState } from 'react';

function EditDescription({ initialDescription, onSave, onClick }) {
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(description);
  };

  const handleChange = () => {
    onClick=(description);
  };

  return (
    <div>
      <h3>Edit Description:</h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></p>
      <button onClick={handleChange}>Edit</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditDescription;
