import { useState } from "react";
import Recipe from "./recipe";
import { getRecipeFromMistral } from "./ai";

export default function Ingrediants() {
  const [ingrediants, setIngrediants] = useState([]);
  const [recipe, setRecipe] = useState("");


  // const ingrediants = ["Ingrediant 1", "Ingrediant 2", "Ingrediant 3"];

  const addIngrediant = (formData) => {
    const ingrediant = Object.fromEntries(formData);
    console.log(ingrediant.ingrediant === "");
    ingrediant.ingrediant !== "" && setIngrediants((prevIngrediants) => [...prevIngrediants, ingrediant.ingrediant]);
  }

  async function getRecipe() {
    const recipeMarkdown =  await getRecipeFromMistral(ingrediants);
    setRecipe(recipeMarkdown);
  }

  return (
    <section className="ingrediant_section">
      <div className="wrap_ingrediant_section">
        <form action={addIngrediant}>
          <label htmlFor="ingrediant"></label>
          <input type="text" placeholder="eg: oregano" name="ingrediant" />
          <button type="submit">Add ingrediant </button>
        </form>

        {
            ingrediants.length > 0 && (
              <>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredient_list">
                  {ingrediants.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </>
            )
          }

        {ingrediants.length > 3 && (
          <>
            <div className="recipe_section">
              <div className="col">
                <h2>Ready for a recipe</h2>
                <p>Generate a recipe from your list of ingrediants.</p>
              </div>
              <div className="col">
                <button onClick={getRecipe}>Get a recipe</button>
              </div>
            </div>
          </>
        )}

        {recipe && <Recipe recipe={recipe} />}

        
      </div>
    </section>
  );
}