function favouriteListShow(){//show favourite list
   if(localStorage.getItem("meals")){
      let storageMeals=JSON.parse(localStorage.getItem("meals"));
      let html="";
      let html2="";
      if(storageMeals.length==0){
         document.getElementById("list_of_Favourite_meals").innerHTML="<h3>Not found!...Go and add your favourite meals</h3>";
      }else{
      for(let i=0;i<storageMeals.length;i++){
         let data=JSON.parse(storageMeals[i]);
        html=html+`<a href="#" class="list-group-item list-group-item-action bg-info" aria-current="true" data-meal='${storageMeals[i]}' id="favourite_meal_list_${i}">
        ${data.meal_name}
       </a>`;
       html2=html2+`<button class="btn btn-danger mt-1 d-block" type="button" id=favourite_btn_${i}>Delete</button>
       `;
      }
      document.getElementById("list_of_Favourite_meals").innerHTML=html;
      document.getElementById("deleteButtonsForFavourites").innerHTML=html2;

      for(let i=0;i<storageMeals.length;i++){
         document.getElementById(`favourite_meal_list_${i}`).addEventListener("click",showDescriptionOfMeal);
         document.getElementById(`favourite_btn_${i}`).addEventListener("click",deleteFavourite);

       }
      }
   }
}
function showDescriptionOfMeal(event){
   localStorage.setItem("passData",event.target.getAttribute("data-meal"));
   window.open("../html/meal_details.html",'_blank');
}
function deleteFavourite(event){// delete favourite meal
   let id=event.target.id;
  id=parseInt(id.substring(id.lastIndexOf('_')+1,id.length));
  if(localStorage.getItem("meals")){
    let mealsString=localStorage.getItem("meals");
    // convert in array.
    let mealsList=JSON.parse(mealsString);
    mealsList.pop(id);
    localStorage.setItem("meals",JSON.stringify(mealsList));//localstorage stores data in string form
  }
  window.location="./my_favourite.html";
}
favouriteListShow();