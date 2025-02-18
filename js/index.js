console.log("siden vises");

let categoryContainer = document.querySelector(".grid_1-1-1-1");

fetch("https://dummyjson.com/recipes")
  .then((response) => response.json())
  .then(showCategories);

function showCategories(data) {
  console.log("Mine data er", data);

  let mealTypeImages = {};

  // Gennemgå alle opskrifter og find mealType + billede
  data.recipes.forEach((recipe) => {
    recipe.mealType.forEach((type) => {
      if (!mealTypeImages[type]) {
        mealTypeImages[type] = recipe.image; // Gem første billede, der matcher mealType
      }
    });
  });

  // Omdan mealTypeImages objektet til et array af mealTypes og begræns til 8
  const uniqueMealTypes = Object.keys(mealTypeImages).slice(0, 8);

  // Generér HTML med dynamiske billeder
  const markup = uniqueMealTypes
    .map(
      (mealType) => `
      <div class="kategorier">
        <a href="produktliste.html?category=${encodeURIComponent(mealType)}">
          <div class="cirkel" style="background-image: url('${mealTypeImages[mealType]}');"></div>
          <h2>${mealType}</h2>
        </a>
      </div>
    `
    )
    .join("");

  categoryContainer.innerHTML = markup;
}
