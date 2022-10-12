"use strict"

export function funGetCocktail() {
    document.getElementById("strAlcoholic").innerHTML = "";
    document.getElementById("strDrink").innerHTML = "";
    document.getElementById("strDrinkThumb").innerHTML = "";

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=old+fashioned')
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("strDrink").innerHTML = data["drinks"][0]["strDrink"];
            document.getElementById("strAlcoholic").innerHTML = data["drinks"][0]["strAlcoholic"] + " drink";
            document.getElementById("strDrinkThumb").src = data["drinks"][0]["strDrinkThumb"];
            document.getElementById("strDrinkThumb").alt = data["drinks"][0]["strDrink"];
        });
}


