'use strict';

import { getCocktailByName, listCocktailsByFirstLetter } from './loadAPIs.js';
import { fillRandomCocktail } from './getRandomCocktail.js';
import { hideElements } from './hideElements.js';
import { fillOptions } from './fillOptions.js';

var requestDB, db, usersObjectStore;
var indexedDbName = "cocktails";
var indexedDbVersion = 1;
var indexedDbStorage = "cocktail";


export function saveFavourite (input_strDrink, input_strAlcoholic, input_strDrinkThumb, input_strInstructions) {
    let strDrink = input_strDrink,
        strAlcoholic = input_strAlcoholic,
        strDrinkThumb = input_strDrinkThumb,
        strInstructions = input_strInstructions;

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.put({ strDrink, strAlcoholic, strDrinkThumb, strInstructions });
    };
    readData();
}

function saveCocktail() {
    const strDrink = document.getElementById("input_strDrink").value,
        strAlcoholic = document.getElementById("input_strAlcoholic").value,
        strDrinkThumb = document.getElementById("input_strDrinkThumb").value,
        strInstructions = document.getElementById("input_strInstructions").value;

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.put({ strDrink, strAlcoholic, strDrinkThumb, strInstructions });
    };
    readData();
    document.getElementById("input_strDrink").value = "";
    document.getElementById("input_strAlcoholic").value = "";
    document.getElementById("input_strDrinkThumb").value = "";
    document.getElementById("input_strInstructions").value = "";
}

function deleteCocktail(id) {
    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.delete(id);
    };
    readData();
}

function readData() {
    const TBODY = document.getElementById("tbody");
    TBODY.innerHTML = "</br>";

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readonly").objectStore(indexedDbStorage);
        usersObjectStore.getAll().onsuccess = function (event) {
            let usuarios = event.target.result;
            usuarios.forEach(element => {
                var row = document.createElement("tr"),
                    fieldStrDrink = document.createElement("td"),
                    fieldStrAlcoholic = document.createElement("td"),
                    fieldStrDrinkThumb = document.createElement("td"),
                    fieldStrInstructions = document.createElement("td"),
                    fieldDelete = document.createElement("td"),
                    deleteButton = document.createElement("button"),
                    cocktailImg = document.createElement("img");

                fieldStrDrink.innerHTML = element.strDrink;
                fieldStrAlcoholic.innerHTML = element.strAlcoholic;
                cocktailImg.src = element.strDrinkThumb;
                cocktailImg.className = "tableImg";
                fieldStrInstructions.innerHTML = element.strInstructions;

                deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                deleteButton.className = "button--icon";
                deleteButton.addEventListener('click', function () {
                    deleteCocktail(element.id);
                });

                fieldStrDrinkThumb.appendChild(cocktailImg);
                fieldDelete.appendChild(deleteButton);

                row.appendChild(fieldStrDrink);
                row.appendChild(fieldStrAlcoholic);
                row.appendChild(fieldStrDrinkThumb);
                row.appendChild(fieldStrInstructions);
                row.appendChild(fieldDelete);

                TBODY.appendChild(row);
            });
        };
    };
}

window.onload = function () {

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion); // SI EXISTE LA ABRE, SI NO LA CREA
    requestDB.onupgradeneeded = function (event) {
        db = event.target.result;
        var objectStore = db.createObjectStore(indexedDbStorage, { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("strDrink_index", "strDrink", { unique: false });
        objectStore.createIndex("strAlcoholic_index", "strAlcoholic", { unique: false });
        objectStore.createIndex("strDrinkThumb_index", "strDrinkThumb", { unique: false });
        objectStore.createIndex("strInstructions_index", "strInstructions", { unique: false });

    };
    document.getElementById("save").addEventListener("click", saveCocktail);
    document.getElementById("getRandomCocktail").addEventListener("click", fillRandomCocktail);
    let select_first_letter = document.getElementById("select_first_letter");
    let options_select = document.getElementById("options_select");
    let button_select_by_name = document.getElementById("button_select_by_name");

    let showMainTable = document.getElementById("showMainTable");
    let showSearch = document.getElementById("showSearch");
    let sortByLetterTable = document.getElementsByClassName("sortByLetterTable");
    select_first_letter.addEventListener("click", function () { fillOptions(select_first_letter.value) });
    button_select_by_name.addEventListener("click", function () { getCocktailByName(options_select.value) });
    showMainTable.addEventListener("click", function () { hideElements(showMainTable.id) });
    showSearch.addEventListener("click", function () { hideElements(showSearch.id) });
    for (let i = 0; i < sortByLetterTable.length; i++) {
        sortByLetterTable[i].addEventListener("click", function () { hideElements(sortByLetterTable[i].id) });
        sortByLetterTable[i].addEventListener("click", function () { listCocktailsByFirstLetter(sortByLetterTable[i].id) });
    }
    readData();
};