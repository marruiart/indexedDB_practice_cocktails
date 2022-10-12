import { allCocktails } from './cocktails.js';
import { genRandomInt } from './genRandomInt.js';


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
    let inputStrAlcoholic = document.getElementById("inputStrAlcoholic");
    let inputStrDrink = document.getElementById("inputStrDrink");
    let inputStrDrinkThumb = document.getElementById("inputStrDrinkThumb");
    let inputStrInstructions = document.getElementById("inputStrInstructions");

    let n = genRandomInt(0, 643);

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ allCocktails[n])
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            inputStrAlcoholic.value = data["drinks"][0]["strDrink"];
            inputStrDrink.value = data["drinks"][0]["strAlcoholic"] + " drink";
            inputStrDrinkThumb.value = data["drinks"][0]["strDrinkThumb"];
            inputStrInstructions.value = data["drinks"][0]["strInstructions"];
        });
}



