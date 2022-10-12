import { funGetCocktail, fillRandomCocktail } from './loadAPIs.js';

'use strict';


var requestDB, db, usersObjectStore;
var indexedDbName = "cocktails";
var indexedDbVersion = 1;
var indexedDbStorage = "cocktail";



function genRandomInt(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function generarPersonaje() {
    let num = genRandomInt(0, 19);

    const strAlcoholic = document.getElementById("strAlcoholic").value;
    const strDrinkThumb = document.getElementById("strDrinkThumb").value;

    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => console.log(data.results[num].name))

    document.getElementById("strDrink").value = data.results[num].name;

    let pers = generarProvincia();
    pers.then(function (data) {
        let num = genRandomInt(0, 21);
        provincia = data[num].strDrink;
    });

}

function saveData() {
    const strDrink = document.getElementById("strDrink").value;
    const strAlcoholic = document.getElementById("strAlcoholic").value;
    const strDrinkThumb = document.getElementById("strDrinkThumb").value;
    const strInstructions = document.getElementById("strInstructions").value;

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.put({ strDrink, strAlcoholic, strDrinkThumb, strInstructions });
    };
    leerDatos();
}

function deleteData(id) {
    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.delete(id);
    };
    leerDatos();
}

function leerDatos() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "<br />";

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readonly").objectStore(indexedDbStorage);
        usersObjectStore.getAll().onsuccess = function (event) {
            let usuarios = event.target.result;
            console.log(usuarios);
            usuarios.forEach(element => {
                var row = document.createElement("tr"),
                    /* Creating fields for elements */
                    fieldStrDrink = document.createElement("td"),
                    fieldStrAlcoholic = document.createElement("td"),
                    fieldStrDrinkThumb = document.createElement("td"),
                    strInstructions = document.createElement("td"),
                    fieldDelete = document.createElement("td"),
                    deleteButton = document.createElement("button"), // creo un botón
                    imagenDelete = document.createElement("img"); // creo una imagen

                fieldStrDrink.innerHTML = element.strDrink; // escribo el strDrink contenido en el array
                fieldStrAlcoholic.innerHTML = element.strAlcoholic; // escribo la strAlcoholic contenida en el array
                fieldStrDrinkThumb.innerHTML = element.strDrinkThumb; // escribo el strDrinkThumb contenido en el array
                strInstructions.innerHTML = element.strInstructions; // escribo el strDrinkThumb contenido en el array

                deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>' // etiqueto el botón
                deleteButton.className = "delete"; // asigno el botón a una clase
                deleteButton.addEventListener('click', function () { // añado al botón un evento de escucha (listener)
                    deleteData(element.id); // la función 'forEach' tiene una variable 'posición', la cuál uso para saber el elemento que he de delete
                });

                deleteButton.appendChild(imagenDelete); // añado la imagen al botón
                fieldDelete.appendChild(deleteButton); // añado el botón a la celda

                /* Add the rows with each element */
                row.appendChild(fieldStrDrink);
                row.appendChild(fieldStrAlcoholic);
                row.appendChild(fieldStrDrinkThumb);
                row.appendChild(strInstructions);
                row.appendChild(fieldDelete);

                tbody.appendChild(row); // añado al tbody 'tbody' la línea
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
    leerDatos();
};