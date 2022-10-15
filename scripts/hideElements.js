"use strict";

const MAIN_TABLE = document.getElementById("main_table");
const SEARCH_MAIN = document.getElementById("search_main");
const LETTER_TABLE = document.getElementById("letter_table");

export function hideElements(id) {
    if (id == "show_main_table") {
        LETTER_TABLE.style = "display:none";
        SEARCH_MAIN.style = "display:none";
        MAIN_TABLE.style = "display:flex";
    } else if (id == "show_search") {
        document.getElementById("select_first_letter").getElementsByTagName("option")[0].selected = 'selected'
        document.getElementById("options_select").innerHTML = "";
        LETTER_TABLE.style = "display:none";
        MAIN_TABLE.style = "display:none";
        SEARCH_MAIN.style = "display:flex";
    } else {
        SEARCH_MAIN.style = "display:none";
        MAIN_TABLE.style = "display:none";
        LETTER_TABLE.style = "display:flex";
    }
}