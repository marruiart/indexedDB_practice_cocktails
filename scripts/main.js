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

    const clave = document.getElementById("clave").value;
    const tlf = document.getElementById("tlf").value;

    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => console.log(data.results[num].name))

    document.getElementById("nombre").value = data.results[num].name;

    let pers = generarProvincia();
    pers.then(function (data) {
        let num = genRandomInt(0, 21);
        provincia = data[num].nombre;
    });

}

function saveData() {
    const nombre = document.getElementById("nombre").value;
    const clave = document.getElementById("clave").value;
    const tlf = document.getElementById("tlf").value;

    requestDB = indexedDB.open(indexedDbName, indexedDbVersion);
    requestDB.onsuccess = function (event) {
        db = event.target.result;
        usersObjectStore = db.transaction(indexedDbStorage, "readwrite").objectStore(indexedDbStorage);
        usersObjectStore.put({ nombre, clave, tlf });
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
                    campoNombre = document.createElement("td"), // creo una celda para el nombre
                    campoClave = document.createElement("td"), // creo una celda para la clave
                    campoTlf = document.createElement("td"), // creo una celda para el tlf

                    campoBorrar = document.createElement("td"), // creo una celda para el botón 'borrar'
                    botonBorrar = document.createElement("button"), // creo un botón
                    imagenBorrar = document.createElement("img"); // creo una imagen

                campoNombre.innerHTML = element.nombre; // escribo el nombre contenido en el array
                campoClave.innerHTML = element.clave; // escribo la clave contenida en el array
                campoTlf.innerHTML = element.tlf; // escribo el tlf contenido en el array

                botonBorrar.innerHTML = '<i class="fa-solid fa-trash"></i>' // etiqueto el botón
                botonBorrar.className = "borrar"; // asigno el botón a una clase
                botonBorrar.addEventListener('click', function () { // añado al botón un evento de escucha (listener)
                    borrarDatos(element.id); // la función 'forEach' tiene una variable 'posición', la cuál uso para saber el elemento que he de borrar
                });

                botonBorrar.appendChild(imagenBorrar); // añado la imagen al botón
                campoBorrar.appendChild(botonBorrar); // añado el botón a la celda

                linea.appendChild(campoNombre); // añado a la línea la celda con el nombre
                linea.appendChild(campoClave); // añado a la línea la celda con la clave
                linea.appendChild(campoTlf); // añado a la línea la celda con el tlf
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
        objectStore.createIndex("nombre_index", "nombre", { unique: false });
        objectStore.createIndex("clave_index", "clave", { unique: false });
        objectStore.createIndex("tlf_index", "tlf", { unique: false });

    };
    document.getElementById("save").addEventListener("click", saveData);
    document.getElementById("aleatorio").addEventListener("click", generarPersonaje);
    leerDatos();
};