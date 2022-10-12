import { funGetCocktail, fillRandomCocktail } from './loadAPIs.js';

'use strict';

var requestDB, db, usersObjectStore;
var indexedDbName = "cocktails";
var indexedDbVersion = 1;
var indexedDbStorage = "cocktail";


function saveData() {
    const strDrink = document.getElementById("inputStrDrink").value;
    const strAlcoholic = document.getElementById("inputStrAlcoholic").value;
    const strDrinkThumb = document.getElementById("inputStrDrinkThumb").value;
    const strInstructions = document.getElementById("inputStrInstructions").value;

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.put({ strDrink, strAlcoholic, strDrinkThumb, strInstructions });
    };
    readData();
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
            console.log(usuarios);
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

window.onload = function () {
    document.getElementById("getRandomCocktail").addEventListener("click", funGetCocktail);

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
    document.getElementById("aleatorio").addEventListener("click", fillRandomCocktail);
    readData();
};