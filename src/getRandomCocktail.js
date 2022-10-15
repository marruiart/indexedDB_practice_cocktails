"use strict";

export function fillRandomCocktail() {
    let input_strDrink = document.getElementById("input_strDrink");
    let input_strAlcoholic = document.getElementById("input_strAlcoholic");
    let input_strDrinkThumb = document.getElementById("input_strDrinkThumb");
    let input_strInstructions = document.getElementById("input_strInstructions");

    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then((data) => {
            input_strDrink.value = data["drinks"][0]["strDrink"];
            input_strAlcoholic.value = data["drinks"][0]["strAlcoholic"];
            input_strDrinkThumb.value = data["drinks"][0]["strDrinkThumb"];
            input_strInstructions.value = data["drinks"][0]["strInstructions"];
        });
}