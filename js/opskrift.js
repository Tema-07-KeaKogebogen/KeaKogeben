document.addEventListener("DOMContentLoaded", async function () {
  const ingredientsDiv = document.getElementById("ingredients");
  const typeOptionsDiv = document.getElementById("typeOptions");

  // Tilføjer 10 ingrediensfelter med dropdowns
  for (let i = 1; i <= 10; i++) {
    const div = document.createElement("div");
    div.classList.add("ingredient");

    const input = document.createElement("input");
    input.type = "text";
    input.name = `ingredient${i}`;
    input.placeholder = `Ingrediens ${i}`;

    const select = document.createElement("select");
    select.name = `unit${i}`;

    const units = ["ml", "dl", "gr.", "tsk.", "spsk.", "liter", "kg"];
    units.forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit;
      option.textContent = unit;
      select.appendChild(option);
    });

    div.appendChild(input);
    div.appendChild(select);
    ingredientsDiv.appendChild(div);
  }

  // Fetcher meal-type fra API
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();

    // Finder de enkelte meal-types
    const mealTypes = new Set();
    data.recipes.forEach((recipe) => {
      if (Array.isArray(recipe.mealType)) {
        recipe.mealType.forEach((type) => mealTypes.add(type));
      }
    });

    // Opretter checkboxes for hver enkelt meal-type
    mealTypes.forEach((type) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "type";
      checkbox.value = type;

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${type}`));
      typeOptionsDiv.appendChild(label);
    });
  } catch (error) {
    console.error("Fejl ved hentning af mealType:", error);
  }

  // Håndterer formularindsendelse
  document.getElementById("recipeForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Stopper standard formular-indsendelse

    // Tjekker om mindst én meal-type er valgt
    const checkedTypes = document.querySelectorAll('input[name="type"]:checked');
    if (checkedTypes.length === 0) {
      alert("Du skal vælge mindst én type af ret!");
      return;
    }

    alert("Tak for din opskrift!");
  });
});
