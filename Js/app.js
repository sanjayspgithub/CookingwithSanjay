const appID = "efa736d5";
const appKey = "02b14389043643cfb7cd16000b93f931";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appID}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");


btnFind.addEventListener("click",()=>loadRecipes(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
    const inputVal =txtSearch.value;
    if(e.keyCode === 13 )
    {
        loadRecipes(inputVal);
    }
});


function loadRecipes(type = "paneer") {
    const url = baseUrl + `&q=${type}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderRecipies(data.hits))
        .catch(error => console.log(error))
    .finally(() => setScrollPosition());
}
loadRecipes();

const getRecipeStepStr = (ingredientLines = []) => {
    let str = "";
    for (var step of ingredientLines) {
        str = str + `<li>${step}</li>`;
    }
    return str;
};

const renderRecipies = (recipeList = []) => {
    recipeContainer.innerHTML = "";
    recipeList.forEach(recipeObj => {
        const {
            label: recipeTitle,
            ingredientLines,
            image: recipeImage,
        } = recipeObj.recipe;
        const recipeStepStr = getRecipeStepStr(ingredientLines);
        const htmlstr = ` <div class="recipe">
        <div class="recipe-title">${recipeTitle}</div>
        <div class="recipe-imge">
            <img src="${recipeImage}" alt="null">
        </div>
        <div class="recipe-text">
            <ul>
             ${recipeStepStr}
            </ul>
        </div>
    </div>`;
        recipeContainer.insertAdjacentHTML("beforeend", htmlstr)
    });
};