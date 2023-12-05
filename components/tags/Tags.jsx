import React, { useEffect, useState } from "react";
import Select from "react-select";


function Tags({ setSelectedTags, selectedTags }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch("/api/tags");

        if (response.ok) {
          const data = await response.json();

          if (data) {
            setTags(data.map((tag) => ({ label: tag, value: tag })));
          } else {
            throw Error;
          }
        } else {
          throw Error;
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    fetchTags();
  }, []);

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions.map((option) => option.value));
  };

  const customStyles = {
    multiValue: (base) => ({
      ...base,
      background: "lightgrey",
      color: "white",
    }),

    control: (base) => ({
      ...base,
      backgroundColor: "white",
      color: "black",
      width: "fitContent",
      cursor: "pointer",
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: "black",
    }),

    placeholder: (base) => ({
      ...base,
      color: "grey",
    }),

    menu: (base) => ({
      ...base,
      width: "10em",
    }),
  };

  return (
    <div>
      <Select
        isMulti
        options={tags}
        value={tags.filter((tag) => selectedTags?.includes(tag.value))}
        onChange={handleTagChange}
        styles={customStyles}
        blurInputOnSelect
        placeholder="Select Tag"
      />
    </div>
  );
}

export default Tags;
