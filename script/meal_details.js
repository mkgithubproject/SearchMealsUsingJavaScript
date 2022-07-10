function addMealDetails(){// show meal details
     let mealData=JSON.parse(localStorage.getItem("passData"));
     console.log(mealData);
     document.getElementById("mealName").innerText=mealData.meal_name;
     if(mealData.image!=null){
        document.getElementById("meal_Image").setAttribute("src",`'${mealData.image}'`);
     }else{
        document.getElementById("meal_Image").setAttribute("src",'../asstes/141837_3015959_375573_image.jpg');
     }
     document.getElementById("mealInstruction").innerText=mealData.strInstructions
}
addMealDetails();