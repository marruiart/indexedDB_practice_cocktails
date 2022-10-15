"use strict"

import { displayGallery, displayOneCocktail } from './displayGallery.js';
import { Cocktail } from './CLASSES/Cocktail.js';
import { resetSelect } from './selectFunctions.js';

export function getCocktailByName(name) {
    resetSelect("select_first_letter");
    resetSelect("subselect_first_letter");
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then((data) => {
            let cocktail = new Cocktail(data["drinks"][0]["strDrink"],
                data["drinks"][0]["strAlcoholic"],
                data["drinks"][0]["strDrinkThumb"],
                data["drinks"][0]["strInstructions"]);
            displayOneCocktail(cocktail);
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
                displayGallery(cocktailsByLetter);
            }))
        });

}

