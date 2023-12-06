import { useEffect, useState } from 'react';
import styles from './ingredients.module.css';
import Select, { components } from 'react-select';

/**
 * Ingredients Component
 * Component for selecting ingredients to filter recipes
 * @param {Object} props - Component props
 * @param {function} props.setFilterIngredientResults - Function to set filtered ingredient results
 * @param {function} props.handleDefaultIngredientFilter - Function to handle default ingredient filter
 * @param {function} props.setRecipes - Function to set recipes
 * @param {Array} props.selectedIngredients - Array of selected ingredients
 * @param {function} props.setSelectedIngredients - Function to set selected ingredients
 * @returns {JSX.Element} React component
 */

function Ingredients({
  setFilterIngredientResults,
  handleDefaultIngredientFilter,
  setRecipes,
  selectedIngredients,
  setSelectedIngredients,
}) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch('/api/ingredient');

        if (response.ok) {
          const data = await response.json();

          setIngredients(
            data.map((ingredient) => ({
              label: ingredient,
              value: ingredient,
            }))
          );
        } else {
          console.error('Failed to fetch ingredients');
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
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
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedIngredients }),
          });

          if (response.ok) {
            const filterIngredientsResult = await response.json();
            setRecipes(filterIngredientsResult.recipes);
          } else {
            console.error('Failed to fetch recipes by ingredients');
          }
        } catch (error) {
          console.error('Error fetching recipes by ingredients:', error);
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

  const handleResetFilters = async () => {
    // Reset selected ingredients
    setSelectedIngredients([]);

    // Fetch unfiltered recipes
    try {
      const response = await fetch('/api/all-recipes'); // Replace with the actual endpoint for fetching all recipes
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.recipes);
        setFilterIngredientResults([]);
      } else {
        console.error('Failed to fetch unfiltered recipes');
      }
    } catch (error) {
      console.error('Error fetching unfiltered recipes:', error);
    }
  };

  const handleClearInputIngredients = () => {
    // Clear input ingredients
    setSelectedIngredients([]);
  };

  return (
    <div className={styles.ingredientsContainer}>
      

      <Select
        isMulti
        options={ingredients}
        value={ingredients.filter((ingredient) =>
          selectedIngredients.includes(ingredient.value)
        )}
        onChange={handleIngredientChange}
        className={styles.selectContainer}
        blurInputOnSelect
        placeholder="select ingredient"
        components={{
          MultiValue: ({ children, ...props }) => (
            <components.MultiValue
              {...props}
              className={styles.selectMultiValue}
            >
              {children}
            </components.MultiValue>
          ),
          MultiValueLabel: ({ children, ...props }) => (
            <components.MultiValueLabel
              {...props}
              className={styles.selectMultiValueLabel}
            >
              {children}
            </components.MultiValueLabel>
          ),
          MultiValueRemove: ({ children, ...props }) => (
            <components.MultiValueRemove
              {...props}
              className={styles.selectMultiValueRemove}
            >
              {children}
            </components.MultiValueRemove>
          ),
          Placeholder: ({ children, ...props }) => (
            <components.Placeholder
              {...props}
              className={styles.selectPlaceholder}
            >
              {children}
            </components.Placeholder>
          ),

        }}
      />
      <br/>
      <button className="btn" onClick={handleClearInputIngredients}>Clear Input Ingredients</button>
      <button className="btn" onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
}

export default Ingredients;
