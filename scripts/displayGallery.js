export function displayOneCocktail(cocktail) {
    const CONTAINER = document.getElementById("selected_cocktail_container");
    CONTAINER.innerHTML = "";
    var card = document.createElement("div"),
        fieldStrDrink = document.createElement("h2"),
        fieldStrAlcoholic = document.createElement("p"),
        cocktailImg = document.createElement("img"),
        favouriteButton = document.createElement("button");

    card.className = "card_selected";
    fieldStrDrink.innerHTML = cocktail.strDrink;
    fieldStrDrink.className = "cocktail_name_selected";
    fieldStrAlcoholic.innerHTML = cocktail.strAlcoholic;
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailImg.className = "galleryImg_selected";
    cocktailImg.alt = cocktail.strAlcoholic;
    favouriteButton.innerHTML = '<i class="fa fa-heart"></i>';
    favouriteButton.className = "button--favourite";
    /* favouriteButton.addEventListener('click', function () {
        saveFavourite(cocktail.strDrink, cocktail.strAlcoholic, cocktail.strDrinkThumb, cocktail.strInstructions);
    }) */;

    fieldStrDrink.appendChild(favouriteButton);
    card.appendChild(fieldStrDrink);
    card.appendChild(cocktailImg);
    card.appendChild(fieldStrAlcoholic);

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
        fieldStrDrink.innerHTML = cocktail.strDrink;
        fieldStrDrink.className = "cocktail_name";
        fieldStrAlcoholic.innerHTML = cocktail.strAlcoholic;
        cocktailImg.src = cocktail.strDrinkThumb;
        cocktailImg.className = "galleryImg";
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