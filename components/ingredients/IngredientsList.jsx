const IngredientsList = ({ingredients}) => {
    return (
      <ul >
        {ingredients.map(([ingredient, amount], index) => (
          <li key={index} >
            {ingredient}: {amount}
          </li>
        ))}
      </ul>
    );
}

export default IngredientsList