"use strict"

import { displayData } from './main.js';
import { Cocktail } from './CLASSES/Cocktail.js';

export function funGetCocktail() {
    document.getElementById("strAlcoholic").innerHTML = "";
    document.getElementById("strDrink").innerHTML = "";
    document.getElementById("strDrinkThumb").innerHTML = "";

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=old+fashioned')
        .then(response => response.json())
        .then((data) => {
            document.getElementById("printstrDrink").innerHTML = data["drinks"][0]["strDrink"];
            document.getElementById("printstrAlcoholic").innerHTML = data["drinks"][0]["strAlcoholic"] + " drink";
            document.getElementById("printstrDrinkThumb").src = data["drinks"][0]["strDrinkThumb"];
            document.getElementById("printstrDrinkThumb").alt = data["drinks"][0]["strDrink"];
        });
}

export function listCocktailsByFirstLetter(letter) {
    let cocktailsByLetter = [];

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then((data) => {
            for (let c in data["drinks"]) {
                let cocktail = new Cocktail(data["drinks"][c]["strDrink"],
                    data["drinks"][c]["strAlcoholic"],
                    data["drinks"][c]["strDrinkThumb"],
                    data["drinks"][c]["strInstructions"]);
                cocktailsByLetter.push(cocktail);
            }
            Promise.all(cocktailsByLetter).then(cocktailsByLetter.forEach(element => {
                displayData(cocktailsByLetter);
            }))
        });

}

