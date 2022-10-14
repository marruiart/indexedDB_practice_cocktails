"use strict";

import { allCocktails } from './cocktailNames.js';

export function fillOptions(firstLetter) {
    const SELECT = document.getElementById("options_select");
    SELECT.innerHTML = "";
    allCocktails.forEach(element => {
        if (element[0] == firstLetter) {
            var option = document.createElement("option");
            option.value = element;
            option.innerHTML = element;
            SELECT.appendChild(option);
        }
    })
}