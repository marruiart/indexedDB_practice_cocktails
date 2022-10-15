"use strict";

import { saveFavourite } from './main.js';

export function displayOneCocktail(cocktail) {
    const CONTAINER = document.getElementById("selected_cocktail_container");
    CONTAINER.innerHTML = "";
    var card = document.createElement("div"),
        information = document.createElement("div"),
        infoText = document.createElement("div"),
        divCocktailImg = document.createElement("div"),
        fieldStrDrink = document.createElement("h2"),
        fieldStrAlcoholic = document.createElement("p"),
        strInstructions = document.createElement("p"),
        cocktailImg = document.createElement("img"),
        favouriteButton = document.createElement("button");

    card.className = "card --one_cocktail";
    fieldStrDrink.className = "cocktail_name --one_coctkail";
    fieldStrAlcoholic.className = "alcohol_info --one_coctkail";
    strInstructions.className = "instructions_info --one_coctkail";
    infoText.className = "div--info_text --one_coctkail";
    divCocktailImg.className = "div--cocktail_img --one_coctkail";
    cocktailImg.className = "cocktail_img --one_coctkail";
    favouriteButton.className = "button--favourite";
    information.className = "card__information";
    fieldStrDrink.innerHTML = cocktail.strDrink;
    fieldStrAlcoholic.innerHTML = cocktail.strAlcoholic;
    strInstructions.innerHTML = cocktail.strInstructions;
    favouriteButton.innerHTML = '<i class="fa fa-heart"></i>';
    divCocktailImg.style.backgroundImage = "url("+cocktail.strDrinkThumb+")";
    //cocktailImg.src = cocktail.strDrinkThumb;
    //cocktailImg.alt = cocktail.strAlcoholic;
    favouriteButton.addEventListener('click', function () {
        saveFavourite(cocktail.strDrink, cocktail.strAlcoholic, cocktail.strDrinkThumb, cocktail.strInstructions);
    })

    fieldStrDrink.appendChild(favouriteButton);
    divCocktailImg.appendChild(cocktailImg);
    infoText.appendChild(fieldStrAlcoholic);
    infoText.appendChild(strInstructions);
    information.appendChild(divCocktailImg);
    information.appendChild(infoText);
    card.appendChild(fieldStrDrink);
    card.appendChild(information);

    CONTAINER.appendChild(card);
}

export function displayGallery(cocktailsByLetter) {
    const CONTAINER = document.getElementById("cocktails_container");
    CONTAINER.innerHTML = "";
    cocktailsByLetter.forEach(cocktail => {
        var card = document.createElement("div"),
            fieldStrDrink = document.createElement("h2"),
            fieldStrAlcoholic = document.createElement("p"),
            cocktailImg = document.createElement("img"),
            favouriteButton = document.createElement("button");

        card.className = "card";
        fieldStrDrink.className = "cocktail_name";
        cocktailImg.className = "gallery_img";
        favouriteButton.className = "button--favourite";
        fieldStrAlcoholic.className = "cocktail_name --alcoholic";
        fieldStrDrink.innerHTML = cocktail.strDrink;
        fieldStrAlcoholic.innerHTML = cocktail.strAlcoholic;
        favouriteButton.innerHTML = '<i class="fa fa-heart"></i>';
        cocktailImg.src = cocktail.strDrinkThumb;
        cocktailImg.alt = cocktail.strAlcoholic;
        favouriteButton.addEventListener('click', function () {
            saveFavourite(cocktail.strDrink, cocktail.strAlcoholic, cocktail.strDrinkThumb, cocktail.strInstructions);
        });

        fieldStrDrink.appendChild(favouriteButton);
        card.appendChild(fieldStrDrink);
        card.appendChild(cocktailImg);
        card.appendChild(fieldStrAlcoholic);

        CONTAINER.appendChild(card);
    });
};