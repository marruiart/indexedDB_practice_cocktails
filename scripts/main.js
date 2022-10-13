import { funGetCocktail, fillRandomCocktail, listCocktailsByFirstLetter } from './loadAPIs.js';
import { hideElements } from './hideElements.js';
import { Cocktail } from './CLASSES/Cocktail.js';

'use strict';

var requestDB, db, usersObjectStore;
var indexedDbName = "cocktails";
var indexedDbVersion = 1;
var indexedDbStorage = "cocktail";


function saveData() {
    const strDrink = document.getElementById("inputStrDrink").value,
        strAlcoholic = document.getElementById("inputStrAlcoholic").value,
        strDrinkThumb = document.getElementById("inputStrDrinkThumb").value,
        strInstructions = document.getElementById("inputStrInstructions").value;
    let cocktail = intanceCocktail(strDrink, strAlcoholic, strDrinkThumb, strInstructions);

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.put({ strDrink, strAlcoholic, strDrinkThumb, strInstructions });
    };
    readData();
    document.getElementById("inputStrDrink").value = "";
    document.getElementById("inputStrAlcoholic").value = "";
    document.getElementById("inputStrDrinkThumb").value = "";
    document.getElementById("inputStrInstructions").value = "";
}

function intanceCocktail(strDrink, strAlcoholic, strDrinkThumb, strInstructions) {
    let cocktail = new Cocktail;
    cocktail.strDrink = strDrink;
    cocktail.strAlcoholic = strAlcoholic;
    cocktail.strDrinkThumb = strDrinkThumb;
    cocktail.strInstructions = strInstructions;
    return cocktail;
}

function deleteData(id) {
    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.delete(id);
    };
    readData();
}

function readData() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "</br>";

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
                deleteButton.className = "delete";
                deleteButton.addEventListener('click', function () {
                    deleteData(element.id);
                });

                fieldStrDrinkThumb.appendChild(cocktailImg);
                fieldDelete.appendChild(deleteButton);

                row.appendChild(fieldStrDrink);
                row.appendChild(fieldStrAlcoholic);
                row.appendChild(fieldStrDrinkThumb);
                row.appendChild(fieldStrInstructions);
                row.appendChild(fieldDelete);

                tbody.appendChild(row);
            });
        };
    };
}

export function displayData(cocktailsByLetter) {
    const CONTAINER = document.getElementById("cocktails_container");
    CONTAINER.innerHTML = "</br>";

    /*     cocktailsByLetter.forEach(element => {
            var card = document.createElement("div"),
                fieldStrDrink = document.createElement("h2"),
                fieldStrAlcoholic = document.createElement("p"),
                cocktailImg = document.createElement("img");
    
            cocktailImg.src = element.strDrinkThumb;
            cocktailImg.className = "tableImg";
            cocktailImg.alt = element.strAlcoholic;
            fieldStrDrink.innerHTML = element.strDrink;
            fieldStrAlcoholic.innerHTML = element.strAlcoholic;
    
            card.appendChild(fieldStrDrink);
            card.appendChild(fieldStrAlcoholic);
            card.appendChild(cocktailImg);
    
            CONTAINER.appendChild(card);
        }); */
};

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
    document.getElementById("save").addEventListener("click", saveData);
    document.getElementById("getRandomCocktail").addEventListener("click", fillRandomCocktail);
    let showMainTable = document.getElementById("showMainTable")
    let sortByLetterTable = document.getElementsByClassName("sortByLetterTable");
    showMainTable.addEventListener("click", function () { hideElements(showMainTable.id) });
    for (let i = 0; i < sortByLetterTable.length; i++) {
        sortByLetterTable[i].addEventListener("click", function () { hideElements(sortByLetterTable[i].id) });
        sortByLetterTable[i].addEventListener("click", function () { listCocktailsByFirstLetter(sortByLetterTable[i].id) });
    }
    readData();
};