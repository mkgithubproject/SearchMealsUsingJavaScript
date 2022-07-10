var addMeal = () => {
  //fetch meals by given search meal name and show all the meal in page
  if (document.getElementById("list_of_meals").getElementsByTagName('*').length == 0) {
    document.getElementById("list_of_meals").innerHTML = `<div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`;
  }
  let mealSearch = document.getElementById("searchMealInput").value;
  if (localStorage.getItem("suggest")) {// add suggestions keyword on search result found
    let sugg = JSON.parse(localStorage.getItem("suggest"));
    if (!sugg.includes(mealSearch)) {
      sugg.push(mealSearch);
      localStorage.setItem("suggest", JSON.stringify(sugg));
    }
  } else {
    let arr = [];
    arr.push(mealSearch);
    localStorage.setItem("suggest", JSON.stringify(arr));
  }
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealSearch)
    .then(response => {
      return response.json();
    }).then(data => {
      let html1 = "";
      let html2 = "";
      if (data.meals == null) {
        document.getElementById("list_of_meals").innerHTML = '<h3>Meals not found!</h3>';

      } else {
        for (let i = 0; i < data.meals.length; i++) {
          let obj = { "meal_name": data.meals[i].strMeal, "strInstructions": data.meals[i].strInstructions, "image": data.meals[i].strImageSource };
          html2 = html2 + `<button  type="button" class="btn bg-info myFavourite d-block"  id="favourite_btn_${i}">Add to favourite</button>`;
          html1 = html1 + `<a data-meal='${JSON.stringify(obj)}'  href="#" class="list-group-item list-group-item-action bg-info" aria-current="true"  id="favourite_meal_link_${i}">
        ${data.meals[i].strMeal}
       </a>`;
        }
        document.getElementById("list_of_favorite_button").innerHTML = html2;
        document.getElementById("list_of_meals").innerHTML = html1;
        for (let i = 0; i < data.meals.length; i++) {
          document.getElementById(`favourite_meal_link_${i}`).addEventListener("click", showDescriptionOfMeal);
          document.getElementById(`favourite_btn_${i}`).addEventListener("click", addToFavourite);
        }
      }
    });
}
function addToFavourite(event) {// add meals to favourite list
  let id = event.target.id;
  id = id.substring(id.lastIndexOf('_') + 1, id.length);
  let dataAttribute = document.getElementById(`favourite_meal_link_${id}`).getAttribute("data-meal");// fetch data attribute from meals anchor tag
  if (localStorage.getItem("meals")) {
    let mealsString = localStorage.getItem("meals");
    // convert in array.
    let mealsList = JSON.parse(mealsString);
    mealsList.push(dataAttribute);
    localStorage.setItem("meals", JSON.stringify(mealsList));//localstorage stores data in string form
  } else {
    let arr = [];
    arr.push(dataAttribute)
    localStorage.setItem("meals", JSON.stringify(arr));

  }
  window.alert("Meal added to favourite....");

}
function showDescriptionOfMeal(event) {// show description of particular meal
  localStorage.setItem("passData", event.target.getAttribute("data-meal"));
  window.open("../html/meal_details.html", '_blank');
}
function showSuggestions() {// show suggestions on search
  let searhKeyword = document.getElementById("searchMealInput").value;
  let terms = autocompleteMatch(searhKeyword);
  console.log(terms.length,searhKeyword);
  if (terms.length > 0) {
    let html = "";
    
    for (let i = 0; i < terms.length; i++) {
      html = html + `<a href="#" class="list-group-item list-group-item-action" id="suggestionList${i}">${terms[i]}</a>`;
    }
    document.getElementById("suggestList").innerHTML = html;
    for (let i = 0; i < terms.length; i++) {
      document.getElementById(`suggestionList${i}`).addEventListener("click", addSuggestIntoInputField);
    }
    document.getElementsByClassName("dropdownOnsearch")[0].classList.remove("d-none");
  } else {
    document.getElementsByClassName("dropdownOnsearch")[0].classList.add("d-none");

  }

}
function autocompleteMatch(input) {// fetch all the search result by given input key
  if (input == '') {
    return [];
  }
  search_terms = JSON.parse(localStorage.getItem("suggest"));
  var reg = new RegExp(input)
  return search_terms.filter(function (term) {
    if (term.match(reg)) {
      return term;// returns array
    }
  });
}
function addSuggestIntoInputField(event) {//add suggestion into input tag if user click on particular sugesstion
  let id = event.target.id;
  document.getElementById("searchMealInput").value = document.getElementById(id).textContent;
  document.getElementsByClassName("dropdownOnsearch")[0].classList.add("d-none");
}
document.getElementById("searchMealInput").addEventListener("keyup", showSuggestions);
document.getElementById("searchMealInput").addEventListener("keydown", showSuggestions);

document.getElementById("button-addon2").addEventListener("click", addMeal);

