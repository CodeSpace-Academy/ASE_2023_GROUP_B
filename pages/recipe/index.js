import React, { Fragment, useState, useEffect } from 'react';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import { getAllRecipes } from '../../database/recipesModule';
import classes from '../../components/recipes/recipe-list.module.css';
import Sort from '../../components/recipes/sort';
import SearchBar from '../../components/search/SearchBar';
import Hero from '@/components/hero.jsx';
import RecipeCard from '../../components/recipes/recipeCard';

export default function AllRecipes(props) {
  const [currentPage, setCurrentPage] = useState(1);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [filterIngredientResults, setFilterIngredientResults] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [filteredRecipes, setFilteredRecipes] = useState(props.data);
    const recipesPerPage = 100;
    const totalPageCount = Math.ceil(filteredRecipes.length / recipesPerPage);

    useEffect(() => {
      setRecipes(props.data);
    }, [props.data]);

    function handleDefaultIngredientFilter() {
      if (selectedIngredients.length > 0) {
        setSelectedIngredients([]);
      }
    }

    const handleSort = (order) => {
      setSortOrder(order);
    };

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPageCount) {
        setCurrentPage(page);
      }
    };

    const handleSearch = () => {
      const lowerCaseSearchText = search.toLowerCase();
      const filtered = props.data.filter((recipe) =>
        recipe.title.toLowerCase().includes(lowerCaseSearchText)
      );
      setFilteredRecipes(filtered);
      setCurrentPage(1); 
    };

    const remainingRecipes = props.data.length - currentPage * recipesPerPage;

    let displayedRecipes = recipes.slice(
      (currentPage - 1) * recipesPerPage,
      currentPage * recipesPerPage
    );

    if (remainingRecipes < recipesPerPage) {
      displayedRecipes = recipes.slice((currentPage - 1) * recipesPerPage);
    }

    switch (sortOrder) {
      case 'newest':
        displayedRecipes.sort(
          (a, b) => new Date(b.published) - new Date(a.published)
        );
        break;
      case 'cook-asc':
        displayedRecipes.sort((a, b) => a.cook - b.cook);
        break;
      case 'cook-desc':
        displayedRecipes.sort((a, b) => b.cook - a.cook);
        break;
      case 'prep-asc':
        displayedRecipes.sort((a, b) => a.prep - b.prep);
        break;
      case 'prep-desc':
        displayedRecipes.sort((a, b) => b.prep - a.prep);
        break;
      case 'steps-asc':
        displayedRecipes.sort(
          (a, b) => a.instructions.length - b.instructions.length
        );
        break;
      case 'steps-desc':
        displayedRecipes.sort(
          (a, b) => b.instructions.length - a.instructions.length
        );
        break;
    }

     return (
       <div className={classes.container}>
         <h1 className={classes.title}>RECIPES</h1>

         <SearchBar
           onSearch={handleSearch}
           search={search}
           setSearch={setSearch}
         />
         <br />

         <Sort onSort={handleSort} />
         <br />

         <Hero
           handleDefaultIngredientFilter={handleDefaultIngredientFilter}
           setFilterIngredientResults={setFilterIngredientResults}
           setRecipes={setRecipes}
           filterIngredientResults={filterIngredientResults}
           setSelectedIngredients={setSelectedIngredients}
           selectedIngredients={selectedIngredients}
         />

         <div className={classes.cardContainer}>
           {displayedRecipes.map((recipe, index) => (
             <div key={index} className={classes.cardContent}>
               <RecipeCard recipe={recipe} search={search} />
             </div>
           ))}
         </div>
         <ArrowIpIcon />
       </div>
     );
}

export async function getServerSideProps() {
  const data = await getAllRecipes(1);

  return {
    props: {
      data: data,
    },
  };
}
