"use strict";

export function resetSelect(id) {
    let select = document.getElementById(id);
    select.getElementsByTagName("option")[0].selected = 'selected';
    if (id === "subselect_first_letter") {
        select.setAttribute("disabled", "disabled");
    }
}

export function fillSelectOptions(allElements, id, firstLetter = "") {
    const SELECT = document.getElementById(id);
    if (id === "select_first_letter") {
        SELECT.innerHTML = "<option disabled selected>Select first letter</option>";
        allElements.forEach(element => {
            var option = document.createElement("option");
            option.value = element;
            option.innerHTML = element;
            SELECT.appendChild(option);
        })
    } else {
        SELECT.innerHTML = "<option disabled selected>Select cocktail name</option>";
        SELECT.removeAttribute("disabled");
        allElements.forEach(element => {
            if (element[0] == firstLetter) {
                var option = document.createElement("option");
                option.value = element;
                option.innerHTML = element;
                SELECT.appendChild(option);
            }
        })
    }
}