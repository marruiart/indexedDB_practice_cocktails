import { saveFavourite } from './main.js';

export function displayOneCocktail(cocktail) {
    const CONTAINER = document.getElementById("selected_cocktail_container");
    CONTAINER.innerHTML = "";
    var card = document.createElement("div"),
        information = document.createElement("div"),
        fieldStrDrink = document.createElement("h2"),
        fieldStrAlcoholic = document.createElement("p"),
        strInstructions = document.createElement("p"),
        cocktailImg = document.createElement("img"),
        favouriteButton = document.createElement("button");

    card.className = "card";
    fieldStrDrink.innerHTML = cocktail.strDrink;
    fieldStrDrink.className = "cocktail_name";
    fieldStrAlcoholic.innerHTML = cocktail.strAlcoholic;
    fieldStrAlcoholic.className = "alcohol_info";
    strInstructions.innerHTML = cocktail.strInstructions;
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailImg.className = "gallery_img";
    cocktailImg.alt = cocktail.strAlcoholic;
    favouriteButton.innerHTML = '<i class="fa fa-heart"></i>';
    favouriteButton.className = "button--favourite";
    favouriteButton.addEventListener('click', function () {
        saveFavourite(cocktail.strDrink, cocktail.strAlcoholic, cocktail.strDrinkThumb, cocktail.strInstructions);
    })

    fieldStrDrink.appendChild(favouriteButton);
    card.appendChild(fieldStrDrink);
    card.appendChild(cocktailImg);
    information.appendChild(fieldStrAlcoholic);
    information.appendChild(strInstructions);

    CONTAINER.appendChild(card);
    CONTAINER.appendChild(information);
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
        fieldStrDrink.innerHTML = cocktail.strDrink;
        fieldStrDrink.className = "cocktail_name";
        fieldStrAlcoholic.innerHTML = cocktail.strAlcoholic;
        cocktailImg.src = cocktail.strDrinkThumb;
        cocktailImg.className = "gallery_img";
        cocktailImg.alt = cocktail.strAlcoholic;
        favouriteButton.innerHTML = '<i class="fa fa-heart"></i>';
        favouriteButton.className = "button--favourite";
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