import { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import styles from './categories.module.css';

const Categories = ({
  setFilterCategoryResults,
  handleDefaultCategoryFilter,
  setRecipes,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/categories');

        if (response.ok) {
          const data = await response.json();

          setCategories(
            data.map((category) => ({
              label: category,
              value: category,
            }))
          );
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecipesByCategories = async () => {
      if (selectedCategories.length === 0) {
        setFilterCategoryResults([]);
      } else {
        try {
          const response = await fetch(`/api/filterByCategories`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedCategories }),
          });

          if (response.ok) {
            const filterCategoriesResult = await response.json();
            setRecipes(filterCategoriesResult.recipes);
          } else {
            console.error('Failed to fetch recipes by categories');
          }
        } catch (error) {
          console.error('Error fetching recipes by categories:', error);
        }
      }
    };

    if (selectedCategories.length > 0) {
      fetchRecipesByCategories(selectedCategories);
    } else {
      handleDefaultCategoryFilter();
    }
  }, [selectedCategories]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map((option) => option.value));
  };

  return (
    <div className={styles.categoriesContainer}>
      <Select
        isMulti
        options={categories}
        value={categories.filter((category) =>
          selectedCategories.includes(category.value)
        )}
        onChange={handleCategoryChange}
        className={styles.selectContainer}
        blurInputOnSelect
        placeholder="select category"
        components={{
          MultiValue: ({ children, ...props }) => (
            <components.MultiValue {...props} className={styles.selectMultiValue}>
              {children}
            </components.MultiValue>
          ),
          MultiValueLabel: ({ children, ...props }) => (
            <components.MultiValueLabel {...props} className={styles.selectMultiValueLabel}>
              {children}
            </components.MultiValueLabel>
          ),
          MultiValueRemove: ({ children, ...props }) => (
            <components.MultiValueRemove {...props} className={styles.selectMultiValueRemove}>
              {children}
            </components.MultiValueRemove>
          ),
          Placeholder: ({ children, ...props }) => (
            <components.Placeholder {...props} className={styles.selectPlaceholder}>
              {children}
            </components.Placeholder>
          ),
        }}
      />
      <br />
    </div>
  );
};

export default Categories;
