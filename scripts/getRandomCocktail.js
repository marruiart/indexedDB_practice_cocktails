"use strict";

export function fillRandomCocktail() {
    let inputStrDrink = document.getElementById("inputStrDrink");
    let inputStrAlcoholic = document.getElementById("inputStrAlcoholic");
    let inputStrDrinkThumb = document.getElementById("inputStrDrinkThumb");
    let inputStrInstructions = document.getElementById("inputStrInstructions");

    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then((data) => {
            inputStrDrink.value = data["drinks"][0]["strDrink"];
            inputStrAlcoholic.value = data["drinks"][0]["strAlcoholic"];
            inputStrDrinkThumb.value = data["drinks"][0]["strDrinkThumb"];
            inputStrInstructions.value = data["drinks"][0]["strInstructions"];
        });
}