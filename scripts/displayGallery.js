export function displayGallery(cocktailsByLetter) {
    const CONTAINER = document.getElementById("cocktails_container");
    CONTAINER.innerHTML = "";
    cocktailsByLetter.forEach(element => {
        var card = document.createElement("div"),
            fieldStrDrink = document.createElement("h2"),
            fieldStrAlcoholic = document.createElement("p"),
            cocktailImg = document.createElement("img"),
            favouriteButton = document.createElement("button");

        card.className = "card";
        fieldStrDrink.innerHTML = element.strDrink;
        fieldStrDrink.className = "cocktail_name";
        fieldStrAlcoholic.innerHTML = element.strAlcoholic;
        cocktailImg.src = element.strDrinkThumb;
        cocktailImg.className = "galleryImg";
        cocktailImg.alt = element.strAlcoholic;
        favouriteButton.innerHTML = '<i class="fa fa-heart"></i>';
        favouriteButton.className = "button--favourite";
        favouriteButton.addEventListener('click', function () {
            saveFavourite(element.strDrink, element.strAlcoholic, element.strDrinkThumb, element.strInstructions);
        });

        fieldStrDrink.appendChild(favouriteButton);
        card.appendChild(fieldStrDrink);
        card.appendChild(cocktailImg);
        card.appendChild(fieldStrAlcoholic);

        CONTAINER.appendChild(card);
    });
};