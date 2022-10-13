"use strict";

const MAIN_TABLE = document.getElementById("main_table");
const LETTER_TABLE = document.getElementById("letter_table");

export function hideElements(id) {
    if (id == "showMainTable") {
        LETTER_TABLE.style = "display:none";
        MAIN_TABLE.style = "display:flex";
    } else {
        LETTER_TABLE.style = "display:flex";
        MAIN_TABLE.style = "display:none";
    }
}
