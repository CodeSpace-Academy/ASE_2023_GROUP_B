import { useState } from "react";

export default function HomePage() {

  const [recipes , setRecipes] = useState()

  fetch('/api/mongo').then(resp => resp.json()).then(data => setRecipes(data))

  console.log(recipes)
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};