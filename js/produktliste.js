// Hent kategori fra URL'en
const myCategory = new URLSearchParams(window.location.search).get("category");

// Opdater h1 med kategori-navnet, "alle opskrifter" hvis der ikke er valgt specifik
document.querySelector("h1").textContent = myCategory || "Alle opskrifter";
console.log("produktliste med kategorier:", myCategory);
const product_list_container = document.querySelector(".product_list_container");

// Hent data fra API'et baseret på kategori
fetch(`https://dummyjson.com/recipes?limit=150`)
  .then((response) => response.json())
  .then((data) => {
    // Filtrér opskrifter baseret på kategori, hvis en kategori er valgt
    let recipes = data.recipes;
    if (myCategory) {
      recipes = recipes.filter((recipe) => recipe.mealType.includes(myCategory));
    }
    showList(recipes);
  })
  .catch((error) => console.error("Fejl ved hentning af opskrifter:", error));

// Funktion til at vise opskrifter
function showList(recipes) {
  const markup = recipes
    .map(
      (recipe) => ` 
        <div class="card">
            <img class="pic" src="${recipe.image}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <div class="info">
                <div class="servings">
                    <img src="assets/img/bestik.svg" alt="bestik">
                    <p>${recipe.servings} pers.</p>
                </div>
                <div class="diff">
                    <img src="assets/img/diff.svg" alt="diff">
                    <p>${recipe.difficulty}</p>
                </div>
            </div>
            <p class="time">${(recipe.cookTimeMinutes + recipe.prepTimeMinutes).toFixed(0)} min</p>
            <a class="read_more" href="singleview.html?id=${recipe.id}">Se opskrift</a>
         </div>  
    `
    )
    .join("");

  product_list_container.innerHTML = markup;
}
