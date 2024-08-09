let recipes = [];
const filters = {
  effort: "egal",
  cost: "egal",
  veggie: "egal",
};

fetch("data/recipes.json")
  .then((response) => response.json())
  .then((data) => {
    recipes = data;
    document
      .getElementById("nextBtn")
      .addEventListener("click", showRandomRecipe);
    document
      .getElementById("randomizeBtn")
      .addEventListener("click", showRandomRecipe);
  })
  .catch((error) => console.error("Error loading recipes:", error));

document.querySelectorAll(".filter-option").forEach((button) => {
  button.addEventListener("click", function () {
    const filterType = this.parentElement.getAttribute("data-filter");
    document
      .querySelectorAll(`[data-filter=${filterType}] .filter-option`)
      .forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    filters[filterType] = this.getAttribute("data-value");
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  filters.effort = filters.cost = filters.veggie = "egal";
  document
    .querySelectorAll(".filter-option")
    .forEach((button) => button.classList.remove("active"));
  document
    .querySelectorAll('.filter-option[data-value="egal"]')
    .forEach((button) => button.classList.add("active"));
});

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("view1").classList.remove("hidden");
  document.getElementById("view2").classList.add("hidden");
});

function showRandomRecipe() {
  document.getElementById("view1").classList.add("hidden");
  document.getElementById("view2").classList.remove("hidden");

  let filteredRecipes = recipes;

  if (filters.effort !== "egal") {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.effort === filters.effort
    );
  }
  if (filters.cost !== "egal") {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.cost === filters.cost
    );
  }
  if (filters.veggie !== "egal") {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.veggie === (filters.veggie === "true")
    );
  }

  if (filteredRecipes.length === 0) {
    alert("Keine Rezepte passen zu den ausgewählten Filtern!");
    return;
  }

  const randomRecipe =
    filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
  displayRecipe(randomRecipe);
}

function displayRecipe(recipe) {
  document.getElementById("recipe-name").textContent = recipe.name;
  document.getElementById("recipe-image").src = recipe.image;
  document.getElementById("recipe-effort").textContent = ` ${
    recipe.effort === "low" ? "Niedrig" : "Hoch"
  }`;
  document.getElementById("recipe-cost").textContent = ` ${
    recipe.cost === "low" ? "Gering" : "Hoch"
  }`;
  document.getElementById("recipe-veggie").textContent = ` ${
    recipe.veggie ? "Ja" : "Nein"
  }`;
  document.getElementById("ingredients-list").innerHTML = recipe.ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("");
}
