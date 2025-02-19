const cuisineSelect = document.getElementById("cuisine");

const productListContainer = document.querySelector(".product_list_container");

let allRecipes = []; // Store all recipes for filtering


fetch("https://dummyjson.com/recipes?limit=150")
  .then((response) => response.json())
  .then((data) => {
    allRecipes = data.recipes;
    
    // Extract unique cuisines for the filter dropdown
    const uniqueCuisines = ["All", ...new Set(allRecipes.map((recipe) => recipe.cuisine))];
    
    // Populate the cuisine dropdown  cuisineSelect.innerHTML = uniqueCuisines
      .map((cuisine) => `<option value="${cuisine}">${cuisine}</option>`)
      .join("");

    showList(allRecipes); 
  })
  .catch((error) => console.error("Error fetching recipes:", error));

// Event listener for cuisine filter
cuisineSelect.addEventListener("change", filterRecipes);


function filterRecipes() {
  const selectedCuisine = cuisineSelect.value;


  let filteredRecipes = allRecipes;

 
  if (selectedCuisine !== "All") {
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === selectedCuisine);
  }



  showList(filteredRecipes);
}


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

  productListContainer.innerHTML = markup;
}
