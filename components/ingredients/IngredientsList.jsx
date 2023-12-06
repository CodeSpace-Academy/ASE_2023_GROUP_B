/**
 * IngredientsList Component
 * Component to display a list of ingredients and their amounts
 * @param {Object} props - Component props
 * @param {Array} props.ingredients - Array of ingredient and amount pairs
 * @returns {JSX.Element} React component
 */
const IngredientsList = ({ ingredients }) => {
  return (
    <ul>
      {/* Mapping through the ingredients array to display each ingredient with its amount */}
      {ingredients.map(([ingredient, amount], index) => (
        <li key={index}>
          {ingredient}: {amount}
        </li>
      ))}
    </ul>
  );
};

export default IngredientsList;
