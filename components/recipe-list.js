import React, { useEffect, useState } from 'react';
import classes from './recipe-list.module.css'; // Import your CSS file

function RecipeList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/mongodb');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.comments); // Assuming 'comments' is the key in the response object
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className={classes.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={classes.error}>Error: {error.message}</p>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Recipes</h1>
      <div className={classes.cardContainer}>
        {data.map((item) => (
          <div className={classes.card} key={item._id}>
            <div className={classes.cardImageContainer}>
              {item.images && item.images.length > 0 && (
                <img
                  src={item.images[0]} // Assuming the first image is at index 0
                  alt="Item Image"
                  className={classes.cardImage}
                />
              )}
            </div>
            <div className={classes.cardContent}>
              <h2 className={classes.cardTitle}>{item.title}</h2>
              {/* <p className={classes.cardDescription}>{item.description}</p> */}
              <p className={classes.cardCategory}>Category: {item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
