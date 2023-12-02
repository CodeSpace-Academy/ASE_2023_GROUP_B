// components/instructions/StepFilterForm.jsx
import React, { useState } from "react";
import { fetchFilterBySteps } from "./steps"; // Update the import path

function StepFilterForm({ onFilterBySteps, onFilteredRecipes }) {
  const [numOfSteps, setNumOfSteps] = useState("");

  const handleInputChange = (event) => {
    setNumOfSteps(event.target.value);
  };

  const handleFilterClick = async () => {
    try {
      const filterStepsResult = await fetchFilterBySteps(numOfSteps);
      onFilteredRecipes(filterStepsResult.recipes); // Handle filtered recipes
    } catch (error) {
      console.error("Error filtering recipes by steps:", error);
    }

    onFilterBySteps(numOfSteps);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter number of steps..."
        value={numOfSteps}
        onChange={handleInputChange}
      />
      <button onClick={handleFilterClick}>Filter by Steps</button>
    </div>
  );
}

export default StepFilterForm;
