import React from "react";

function Sort({ onSort }) {
  const handleSortChange = (e) => {
    const { value } = e.target;
    onSort(value);
  };

  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="default">Default sorting</option>
        <option value="newest">Sort by Newest First</option>
        <option value="cook-asc">Sort by Cooking Time (Ascending)</option>
        <option value="cook-desc">Sort by Cooking Time (Descending)</option>
        <option value="prep-asc">Sort by Preparation Time (Ascending)</option>
        <option value="prep-desc">Sort by Preparation Time (Descending)</option>
      </select>
    </div>
  );
}

export default Sort;
