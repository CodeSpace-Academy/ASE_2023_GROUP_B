import { useContext, useEffect } from 'react';
import FavoritesContext from '@/components/favorite/fav-context';
import RecipeDetailPage from '../recipe/[recipeId]';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { getFavoritesFromMongoDB } from '../../database/favoritesModule';
import classes from '../../components/icons&Buttons/favorite.module.css';
import ArrowIpIcon from '@/components/icons&Buttons/arrow-up-icon';
import RecipeCard from '@/components/recipes/recipeCard';
import AllRecipes from './index';

function FavoritesPage({ favs,onRemove }) {
  // Access the FavoritesContext to get the list of favorite recipes
  const favoriteCtx = useContext(FavoritesContext);
  const favoriteRecipes = favoriteCtx.favorites || [];
  useEffect(() => {});

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
          You have no favorite recipes yet. Start adding your favorites!
        </p>
      )}

      <section>
        {/* Display the list of favorite recipes */}
        {favoriteRecipes.map((recipe) => (
          <div key={recipe._id}>
            <RecipeDetailPage
              recipe={recipe}
              onRemove={() => onRemove(recipe._id)}
            />
            <RecipeCard 
            recipe={recipe} 
            onRemove={() => onRemove(recipe._id)} />
          </div>
        ))}
      </section>

      <AllRecipes data={cleanedFavs} />
      <ArrowIpIcon />
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
