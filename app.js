let searchBtn = document.querySelector("#search-btn")
let mealList = document.querySelector("#meal")
let mealDetailContent = document.querySelector(".meal-detail-content")
let recipeCloseBtn = document.querySelector("#recipe-btn-close")
let searchInput = document.querySelector("#search-input")


//Event Listener
searchBtn.addEventListener('click', getMealList)
mealList.addEventListener('click', getMealRecipe)
recipeCloseBtn.addEventListener('click', ()=>{
    mealDetailContent.parentElement.classList.remove("showRecipe")
})

//functions
function getMealList() {
    let searchInputValue = searchInput.value
    let URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputValue}`
    fetch(URL)
        .then((response) => {
            return data = response.json()
        })
        .then((data) => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                            <div class="meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img src="${meal.strMealThumb}" alt="">
                                </div>
                                    <div class="meal-name">
                                    <h3>${meal.strMeal}</h3>
                                    <a href="#" class="recipe-btn">Get Recipe</a>
                                </div>
                            </div>
                    `
                });

                mealList.classList.remove("notFound")
            }
            else {
                html = "Sorry We Didn't Find Any Meal!"
                mealList.classList.add("notFound");
            }
            mealList.innerHTML = html;
        })
}


//Recipe Function
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem.dataset.id)
        let RecipeURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`

        fetch(RecipeURL)
            .then((response) => {
                return data = response.json()
            })
            .then((data) => {
                mealRecipeModal(data.meals)
            })
    }
}


//Create Recipe Modal

function mealRecipeModal(meal){
    meal = meal[0];
    console.log(meal)
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions.replace(/STEP/g, "<br>STEP")}</p>
        </div>
        <div class="meal-recipe-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `

    mealDetailContent.innerHTML = html;
    mealDetailContent.parentElement.classList.add("showRecipe")
}