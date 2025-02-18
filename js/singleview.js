const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

console.log("productId:", productId);

if (productId) {
    fetch(`https://dummyjson.com/recipes/${productId}`)
        .then(response => {
            console.log("Response Status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched Data:", data);

            if (data) {
                let mainContainer = document.querySelector("main"); 
                mainContainer.innerHTML = `

        <div><a href="singleview.html?id=33"><p>View Recipe 1</p></a></div> 
                  <h1>${data.name}</h1>
                      <hr class="line">

                     
                    
       
         
        
                    <div class="singleview_img">
                      <img src="${data.image}" alt="${data.name}">
                    </div>
                      <div class="information_singleview">
                     <div><p>Opskift til ${data.servings} personer</p></div>
                     <div><p>Difficulty: ${data.difficulty}<p></div>
      
            <div class="time_singleview"><p >Forberedelsestid: ${data.prepTimeMinutes} min.</p>
            <p>Tilberedelsestid: ${data.cookTimeMinutes} min.</p></div>
         </div> 



             

                    <article class="grid_singleview"> 
                      <div class="container_singleview">
                        <h2>Ingredienser:</h2>
                        <div class="ingredients_list">
                          ${data.ingredients.map(ingredient => `<div class="ingredient"><span>${ingredient}</span></div>`).join('')}
                        </div>
                      </div>

                      <div class="opskrift_singleview">
                        <h2>Sådan gør du:</h2>
                        <ol>
                          ${data.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                        </ol>
                      </div>
                    </article>
                    `;
            } else {
                console.error("No product data found.");
                document.querySelector("main").innerHTML = "<p>Product not found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching product data:", error);
            document.querySelector("main").innerHTML = "<p>Error loading data.</p>";
        });
} else {
    console.error("No product ID found in URL.");
    document.querySelector("main").innerHTML = "<p>Product not found.</p>";
}
