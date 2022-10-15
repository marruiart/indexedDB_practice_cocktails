"use strict";

import { fillSelectOptions, resetSelect } from './selectFunctions.js';
import { ABECEDARY } from './arrays.js';

const MAIN_TABLE = document.getElementById("main_table"),
    SEARCH_MAIN = document.getElementById("search_main"),
    LETTER_TABLE = document.getElementById("letter_table");


function activeMenuButton(id) {
    let button = document.getElementById(id),
        buttons = document.querySelectorAll(".button--menu");

    console.log(button);
    console.log(buttons);

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

export function hideElements(id) {
    activeMenuButton(id);
    if (id == "show_main_table") {
        LETTER_TABLE.style = "display:none";
        SEARCH_MAIN.style = "display:none";
        MAIN_TABLE.style = "display:flex";
    } else if (id == "show_search") {
        fillSelectOptions(ABECEDARY, "select_first_letter");
        resetSelect("select_first_letter");
        resetSelect("subselect_first_letter");
        LETTER_TABLE.style = "display:none";
        MAIN_TABLE.style = "display:none";
        SEARCH_MAIN.style = "display:flex";
    } else {
        SEARCH_MAIN.style = "display:none";
        MAIN_TABLE.style = "display:none";
        LETTER_TABLE.style = "display:flex";
    }
}