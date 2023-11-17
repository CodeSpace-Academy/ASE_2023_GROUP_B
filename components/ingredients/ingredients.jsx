import { useEffect, useState } from "react";
import Select from "react-select";


function Ingredients({
  setFilterIngredientResults,
  filterIngredientsResults,
  handleDefaultIngredientFilter,
  setRecipes,
  selectedIngredients,
  setSelectedIngredients
  
}) {
  const [ingredients, setIngredients] = useState([]);
  // const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch("/api/ingredients");

        if (response.ok) {
          const data = await response.json();

          setIngredients(
            data.map((ingredient) => ({
              label: ingredient,
              value: ingredient,
            }))
          );
        } else {
          console.error("Failed to fetch ingredients");
        }
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    }

    fetchIngredients();
  }, []);
  
  

  useEffect(() => {
    const fetchRecipesByIngredients = async () => {
      if (selectedIngredients.length === 0) {
        setFilterIngredientResults([]);
      } else {
        try {
          const response = await fetch(`/api/fff`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedIngredients }),
          });

          if (response.ok) {
            const filterIngredientsResult = await response.json();
            // setRecipes(filterResult.recipes);
            // setFilterIngredientResults(filterIngredientsResult.recipes);
            setRecipes(filterIngredientsResult.recipes)
            // setCount(filterResult.recipes.length);
            
          } else {
            console.error("Failed to fetch recipes by ingredients");
          }
        } catch (error) {
          console.error("Error fetching recipes by ingredients:", error);
        }
      }
    };

    if (selectedIngredients.length > 0) {
      fetchRecipesByIngredients(selectedIngredients);
    } else {
      handleDefaultIngredientFilter();
    }
  }, [selectedIngredients]);

  const handleIngredientChange = (selectedOptions) => {
    setSelectedIngredients(selectedOptions.map((option) => option.value));
  };

  return (
    <div>
      <Select
        isMulti
        options={ingredients}
        value={ingredients.filter((ingredient) =>
          selectedIngredients.includes(ingredient.value)
        )}
        onChange={handleIngredientChange}
        
        blurInputOnSelect
        placeholder="select ingredient"
      />
    </div>
  );
}

export default Ingredients;

