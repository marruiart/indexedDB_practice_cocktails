import { funGetCocktail } from './loadAPIs.js';

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

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.put({ strDrink, strAlcoholic, strDrinkThumb });
    };
    leerDatos();
}

function borrarDatos(id) {
    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.delete(id);
    };
    leerDatos();
}

function leerDatos() {
    const cuerpo = document.getElementById("cuerpo");
    cuerpo.innerHTML = "Los datos almacenados son: <br />";

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readonly").objectStore(indexedDbStorage);
        usersObjectStore.getAll().onsuccess = function (event) {
            let usuarios = event.target.result;
            console.log(usuarios);
            usuarios.forEach(element => {
                var linea = document.createElement("tr"), // creo una fila
                    campoStrDrink = document.createElement("td"), // creo una celda para el strDrink
                    campoStrAlcoholic = document.createElement("td"), // creo una celda para la strAlcoholic
                    campoStrDrinkThumb = document.createElement("td"), // creo una celda para el strDrinkThumb
                    strInstructions = document.createElement("td"), // creo una celda para el strDrinkThumb

                    campoBorrar = document.createElement("td"), // creo una celda para el botón 'borrar'
                    botonBorrar = document.createElement("button"), // creo un botón
                    imagenBorrar = document.createElement("img"); // creo una imagen

                campoStrDrink.innerHTML = element.strDrink; // escribo el strDrink contenido en el array
                campoStrAlcoholic.innerHTML = element.strAlcoholic; // escribo la strAlcoholic contenida en el array
                campoStrDrinkThumb.innerHTML = element.strDrinkThumb; // escribo el strDrinkThumb contenido en el array
                strInstructions.innerHTML = element.strDrinkThumb; // escribo el strDrinkThumb contenido en el array

                botonBorrar.innerHTML = '<i class="fa-solid fa-trash"></i>' // etiqueto el botón
                botonBorrar.className = "borrar"; // asigno el botón a una clase
                botonBorrar.addEventListener('click', function () { // añado al botón un evento de escucha (listener)
                    borrarDatos(element.id); // la función 'forEach' tiene una variable 'posición', la cuál uso para saber el elemento que he de borrar
                });

                botonBorrar.appendChild(imagenBorrar); // añado la imagen al botón
                campoBorrar.appendChild(botonBorrar); // añado el botón a la celda

                linea.appendChild(campoStrDrink); // añado a la línea la celda con el strDrink
                linea.appendChild(campoStrAlcoholic); // añado a la línea la celda con la strAlcoholic
                linea.appendChild(campoStrDrinkThumb); // añado a la línea la celda con el strDrinkThumb
                linea.appendChild(strInstructions); // añado a la línea la celda con el strDrinkThumb
                linea.appendChild(campoBorrar); // añado a la línea la celda con el botón

                cuerpo.appendChild(linea); // añado al tbody 'cuerpo' la línea
            });
        };
    };
}

window.onload = function () {
    document.getElementById("getcocktail").addEventListener("click", funGetCocktail);

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion); // SI EXISTE LA ABRE, SI NO LA CREA
    requestDB.onupgradeneeded = function (event) {
        db = event.target.result;
        var objectStore = db.createObjectStore(indexedDbStorage, { keyPath: "id", autoIncrement: true });
        objectStore.createIndex("strDrink_index", "strDrink", { unique: false });
        objectStore.createIndex("strAlcoholic_index", "strAlcoholic", { unique: false });
        objectStore.createIndex("strDrinkThumb_index", "strDrinkThumb", { unique: false });

    };
    document.getElementById("save").addEventListener("click", saveData);
    document.getElementById("aleatorio").addEventListener("click", generarPersonaje);
    leerDatos();
};