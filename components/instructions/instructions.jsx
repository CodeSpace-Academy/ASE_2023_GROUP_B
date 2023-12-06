import React from "react";

export default function Instructions({ handleChange, selectedInstructions }) {
  return (
    <div className="flex">
      <input
        type="number"
        min={0}
        placeholder="Number of instructions..."
        value={parseInt(selectedInstructions, '10')}
        onChange={handleChange}
        className="border border-gray-300 rounded-l-md px-4 py-2"
      />
    </div>
  );
}
