// Ensure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Hent kategori fra URL'en
  const myCategory = new URLSearchParams(window.location.search).get("category");

  // Opdater h1 med kategori-navnet, "Alle opskrifter" hvis der ikke er valgt specifik kategori
  document.querySelector("h1").textContent = myCategory || "Alle opskrifter";
  console.log("Produktliste med kategorier:", myCategory);

  // Hent container til opskrifter
  const product_list_container = document.querySelector(".product_list_container");

  // Hent filter dropdown (Avoid redeclaring it)
  let cuisineSelect = document.getElementById("cuisine");

  // Hent filter container (skjules hvis man filtrerer via kategori fra index)
  const filterContainer = document.querySelector(".filter");

  let allRecipes = []; // Gem alle opskrifter her

  // Hent data fra API'et
  fetch("https://dummyjson.com/recipes?limit=150")
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;

      // Filtrér opskrifter baseret på kategori, hvis en kategori er valgt via URL'en
      let filteredRecipes = allRecipes;
      if (myCategory) {
        filteredRecipes = allRecipes.filter((recipe) =>
          recipe.mealType.some((type) => type.toLowerCase() === myCategory.toLowerCase())
        );
        filterContainer.style.display = "none"; // Skjul filteret, hvis man har valgt kategori
      }

      // Find unikke køkkentyper (cuisine) og tilføj til filteret
      const uniqueCuisines = ["All", ...new Set(allRecipes.map((recipe) => recipe.cuisine))];

      // Ensure cuisineSelect is not null before modifying innerHTML
      if (cuisineSelect) {
        cuisineSelect.innerHTML = uniqueCuisines
          .map((cuisine) => `<option value="${cuisine}">${cuisine}</option>`)
          .join("");

        // Lyt efter ændringer i filteret
        cuisineSelect.addEventListener("change", filterRecipes);
      }

      // Vis de filtrerede opskrifter
      showList(filteredRecipes);
    })
    .catch((error) => console.error("Fejl ved hentning af opskrifter:", error));

  // Funktion til at filtrere opskrifter baseret på køkken (cuisine)
  function filterRecipes() {
    const selectedCuisine = cuisineSelect?.value || "All";

    let filteredRecipes = allRecipes;

    if (selectedCuisine !== "All") {
      filteredRecipes = filteredRecipes.filter((recipe) => recipe.cuisine === selectedCuisine);
    }

    showList(filteredRecipes);
  }

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
    
    // Adjust the grid layout when the list is updated
    adjustGridLayout();
  }

  // Funktion til at justere grid-layout
  function adjustGridLayout() {
    let productContainer = document.querySelector(".product_list_container");
    let cards = document.querySelectorAll(".card");

    if (!productContainer || cards.length === 0) return; // Prevent errors

    if (cards.length < 4) {
      productContainer.classList.add("single-item");
    } else {
      productContainer.classList.remove("single-item");
    }
  }

  // Kør justering af layout når siden er færdigindlæst
  adjustGridLayout();
});
