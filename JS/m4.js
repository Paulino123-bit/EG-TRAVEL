

// 1. PATRONES (Expresiones Regulares)
const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,80}$/;
const patronPasaporte = /^[a-zA-Z0-9]{5,15}$/; // Permite letras y números, entre 5 y 15 caractere

// 2. LLAMAMOS AL FORMULARIO
let formulario = document.getElementById("passengerForm");

// 3. MENSAJES DE ERROR
let errorNombre = document.getElementById("pNameError");
let errorPasaporte = document.getElementById("pPassportError");

//inputs
let nombre = document.getElementById("name");
let pasaporte = document.getElementById("pasaporte");


//validacion de los campos si estan vacios

formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let valorNombre = nombre.value.trim();
    let valorPasaporte = pasaporte.value.trim();

    // --- nombre ---
    if (valorNombre === "" || valorNombre.length === 0) {
        errorNombre.style.color = "#bb2040";
        errorNombre.textContent = "el campo nombre no puede estar vacio";
        errorNombre.style.display = "block";
        nombre.focus();
        return false;
    } else {
        errorPasaporte.textContent = " ";
        errorNombre.style.display = "none";
    }

    // --- Pasaporte ---
    if (valorPasaporte === "" || valorPasaporte.length === 0) {
        errorPasaporte.style.color = "#bb2040";
        errorPasaporte.textContent = "el campo pasaporte no puede estar vacio";
        errorPasaporte.style.display = "block";
        agencia.focus();
        return false;
    } else {
        errorPasaporte.textContent = " ";
        errorPasaporte.style.display = "none";
    }

    
    if (!patronPasaporte.test(valorPasaporte)) {
        errorPasaporte.style.color = "#bb2040";
        errorPasaporte.textContent = "datos no validos";
        errorPasaporte.style.display = "block";
        pasaporte.focus();
        return false;
    }
});

// nombre del representante
nombre.addEventListener("input", function (e) {//VALIDANDO EL TIEMPO REAL 
    if (patronNombre.test(nombre.value)) {//EVALUAMOS SI EL DATO CUMPLE CON Expresion Regular
        nombre.style.borderColor = "#0afc16"; 
        errorNombre.style.display = "none";
    } else {
        nombre.style.borderColor = "#e31b23"; 
        errorNombre.classList.add("error");
        errorNombre.style.color = " #e31b23",
        errorNombre.textContent = "datos no validos";
        errorNombre.style.display = "block";
    }
});
// nombre del representante
pasaporte.addEventListener("input", function (e) {//VALIDANDO EL TIEMPO REAL 
    if (patronPasaporte.test(pasaporte.value)) {//EVALUAMOS SI EL DATO CUMPLE CON Expresion Regular
        pasaporte.style.borderColor = "#0afc16"; 
        errorPasaporte.style.display = "none";
    } else {
        pasaporte.style.borderColor = "#e31b23"; 
        errorPasaporte.classList.add("error");
        errorPasaporte.style.color = " #e31b23",
        errorPasaporte.textContent = "datos no validos";
        errorPasaporte.style.display = "block";
    }
});


// ===================
//REGISTRO DE PASAJEROS 
// =====================
document.getElementById("passengerForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita recargar la página

    // Obtener valores de los inputs
    const nombre = document.getElementById("name").value;
    const pasaporte = document.getElementById("pasaporte").value;
    const salida = document.getElementById("pNationality").value;
    const llegada = document.getElementById("pBirth").value;

    // Función para limpiar y añadir datos en cada <strong>
    function insertarDato(id, valor) {
        const strong = document.getElementById(id);
        strong.innerHTML = ""; // Elimina contenido previo
        const spanDato = document.createElement("span");
        spanDato.textContent = valor;
        spanDato.classList.add("dato"); // Aplica la clase con estilos
        strong.appendChild(spanDato);
    }

    // Insertar datos en la estructura
    insertarDato("bpPassenger", nombre);
    insertarDato("bpCabin", pasaporte);       // Aquí puedes decidir si mostrar pasaporte o cabina real
    insertarDato("bpDeparture", llegada); // Ejemplo: nacionalidad como salida
    insertarDato("bpArrival", salida);     // Ejemplo: fecha de nacimiento como llegada
});

