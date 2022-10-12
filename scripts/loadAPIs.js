"use strict"

export function funGetCocktail() {
    document.getElementById("strAlcoholic").innerHTML = "";
    document.getElementById("strDrink").innerHTML = "";
    document.getElementById("strDrinkThumb").innerHTML = "";

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=old+fashioned')
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("printstrDrink").innerHTML = data["drinks"][0]["strDrink"];
            document.getElementById("printstrAlcoholic").innerHTML = data["drinks"][0]["strAlcoholic"] + " drink";
            document.getElementById("printstrDrinkThumb").src = data["drinks"][0]["strDrinkThumb"];
            document.getElementById("printstrDrinkThumb").alt = data["drinks"][0]["strDrink"];
        });
}

export function fillRandomCocktail() {
    document.getElementById("strAlcoholic").innerHTML = "";
    document.getElementById("strDrink").innerHTML = "";
    document.getElementById("strDrinkThumb").innerHTML = "";

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=old+fashioned')
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("strDrink").value = data["drinks"][0]["strDrink"];
            document.getElementById("strAlcoholic").value = data["drinks"][0]["strAlcoholic"] + " drink";
            document.getElementById("strDrinkThumb").value = data["drinks"][0]["strDrinkThumb"];
            document.getElementById("strInstructions").value = data["drinks"][0]["strInstructions"];
        });
}



