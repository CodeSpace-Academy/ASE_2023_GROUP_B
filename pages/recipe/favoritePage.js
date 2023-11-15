import { useContext, useEffect } from 'react';
import FavoritesContext from '../../components/favorite/fav-context';
import RecipeDetailPage from './[recipeId]';
import Link from 'next/link';
import classes from './RecipeDetailPage.module.css'; // Correct module name
import { IoIosArrowBack } from 'react-icons/io';
import { getFavoritesFromMongoDB } from '../api/mongodb';
import RecipeList from './recipe-list';

function FavoritesPage({ favs }) {
  // Access the FavoritesContext to get the list of favorite recipes
  const favoriteCtx = useContext(FavoritesContext);
  const favoriteRecipes = favoriteCtx.favorites || [];
  useEffect(() => {
    
  });
  // Convert MongoDB ObjectID to string for serialization
  const cleanedFavs = favs.map((fav) => {
    return {
      ...fav,
      _id: fav._id.toString(),
    };
  });
  return (
    <section>
      <Link href={`/recipe`} passHref>
        <IoIosArrowBack title="Back to recipes" className={classes.favIcon} />
      </Link>
      <br />
      <h1 className={classes.fav}>Favorite</h1>
      {favs.length === 0 && (
        <p className={classes.message}>
          You have not favorited any recipes yet. Start adding your favorites!
        </p>
      )}
      <section>
        {/* Display the list of favorite recipes */}
        {favoriteRecipes.map((recipe) => (
          <RecipeDetailPage key={recipe._id} recipe={recipe} />
        ))}
      </section>
      <section>
        {/* Display the list of favorite recipes */}
        {favoriteRecipes.map((recipe) => (
          <RecipeList key={recipe._id} recipe={recipe} />
        ))}
      </section>
      <RecipeList data={cleanedFavs} />
    </section>
  );
}
export default FavoritesPage;
export async function getServerSideProps() {
  const favs = await getFavoritesFromMongoDB();
  return {
    props: {
      favs,
    },
  };
}