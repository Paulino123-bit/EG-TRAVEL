   // patrones
let patronAgencia = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]{2,80}$/;
const patronId = /^\d{2,15}$/;
const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,80}$/; // CAMBIO: patrón corregido para nombre completo (antes solo permitía 1 letra)
const patronEmail = /^[0-9a-zA-Z._-]+@[0-9a-zA-Z]+\.[a-z]{3,}$/;
const patronTel = /^\+240\s\d{3}\s\d{3}\s\d{3}$/;

let formulario = document.getElementById("Form");//llamamos al formulario

// mensajes de error usando los queryselector
let errorAgencia = document.getElementById("alerta1");
let errorId = document.getElementById("alerta2");
let errorNombre = document.getElementById("alerta3");
let errorCorreo = document.getElementById("alerta4");
let errorTel = document.getElementById("alerta5");

// Obteniendo los id de los inputs (referencias al elemento HTML, no al valor)
let agencia = document.getElementById("agencia");
let codigoId = document.getElementById("cod-id");
let nombre = document.getElementById("nom");
let correo = document.getElementById("email");
let telefono = document.getElementById("contacto");

//validacion de los campos si estan vacios

formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let valorAgencia = agencia.value.trim();
    let valorid = codigoId.value.trim();
    let valorNombre = nombre.value.trim();
    let valorCorreo = correo.value.trim();
    let ValorTel = telefono.value.trim();

    // --- AGENCIA ---
    if (valorAgencia === "" || valorAgencia.length === 0) {
        errorAgencia.style.color = "#bb2040";
        errorAgencia.textContent = "el campo Agencia no puede estar vacio";
        errorAgencia.style.display = "block";
        agencia.focus();
        return false;
    } else {
        errorAgencia.textContent = " ";
        errorAgencia.style.display = "none";
    }
    // --- ID COMERCIAL ---
    if (valorid === "" || valorid.length === 0) {
        errorId.style.color = "#bb2040";
        errorId.textContent = "el campo ID no puede estar vacio";
        errorId.style.display = "block";
        codigoId.focus();
        return false;
    } else {
        errorId.textContent = " ";
        errorId.style.display = "none";
    }

    // --- REPRESENTANTE LEGAL ---
    if (valorNombre === "" || valorNombre.length === 0) {
        errorNombre.style.color = "#bb2040";
        errorNombre.textContent = "el campo nombre no puede estar vacio";
        errorNombre.style.display = "block";
        nombre.focus();
        return false;
    } else {
        errorNombre.textContent = " ";
        errorNombre.style.display = "none";
    }

    // --- CORREO ---
    if (valorCorreo === "" || valorCorreo.length === 0) {
        errorCorreo.style.color = "#bb2040";
        errorCorreo.textContent = "el campo correo no puede estar vacio";
        errorCorreo.style.display = "block";
        correo.focus();
        return false;
    } else {
        errorCorreo.textContent = " ";
        errorCorreo.style.display = "none";
    }

    // --- TELÉFONO ---
    if (ValorTel === "" || ValorTel.length === 0) {
        errorTel.style.color = "#bb2040";
        errorTel.textContent = "el campo contacto no puede estar vacio";
        errorTel.style.display = "block";
        telefono.focus();
        return false;
    } else {
        errorTel.textContent = " ";
        errorTel.style.display = "none";
    }


    //  guardamos id, nombre y correo en una fila de la tabla
    let fila = document.createElement("tr"); 

    let celdaId = document.createElement("td");
    celdaId.textContent = valorid; //  valor del input cod-id

    let celdaNombre = document.createElement("td"); 
    celdaNombre.textContent = valorAgencia; //  valor del input agencia

    let celdaCorreo = document.createElement("td"); 
    celdaCorreo.textContent = valorCorreo; //  valor del input email

    fila.appendChild(celdaId); //  agregamos celda ID a la fila
    fila.appendChild(celdaNombre); //  agregamos celda nombre a la fila
    fila.appendChild(celdaCorreo); //  agregamos celda correo a la fila

    let lista = document.getElementById("lista"); 
    lista.appendChild(fila); // insertamos la fila en la tabla

    document.getElementById("modal").classList.remove("activo");
    formulario.reset();
});

//validar si el usuario cumple con el patron
// nombre comercial
agencia.addEventListener("input", function (e) {//VALIDANDO EL TIEMPO REAL 
    if (patronAgencia.test(agencia.value)) {//EVALUAMOS SI EL DATO CUMPLE CON Expresion Regular
        agencia.style.borderColor = "#0afc16"; 
        errorAgencia.style.display = "none";
    } else {
        agencia.style.borderColor = "#e31b23"; 
        errorAgencia.classList.add("error");
        errorAgencia.style.color = " #e31b23",
            errorAgencia.textContent = "datos no validos";
        errorAgencia.style.display = "block";
    }
});

// id comercial
codigoId.addEventListener("input", function (e) {//VALIDANDO EL TIEMPO REAL 
    if (patronId.test(codigoId.value)) {//EVALUAMOS SI EL DATO CUMPLE CON Expresion Regular
        codigoId.style.borderColor = "#0afc16"; 
        errorId.style.display = "none";
    } else {
        codigoId.style.borderColor = "#e31b23"; 
        errorId.classList.add("error");
        errorId.style.color = " #e31b23",
            errorId.textContent = "datos no validos";
        errorId.style.display = "block";
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

// correo electronico
correo.addEventListener("input", function (e) {//VALIDANDO EL TIEMPO REAL 
    if (patronEmail.test(correo.value)) {//EVALUAMOS SI EL DATO CUMPLE CON Expresion Regular
        correo.style.borderColor = "#0afc16"; 
        errorCorreo.style.display = "none";
    } else {
        correo.style.borderColor = "#e31b23"; 
        errorCorreo.classList.add("error");
        errorCorreo.style.color = " #e31b23",
            errorCorreo.textContent = "datos no validos, escriba nombre@gmail.com";
        errorCorreo.style.display = "block";
    }
});

// telefono
telefono.addEventListener("input", function (e) {//VALIDANDO EL TIEMPO REAL 
    if (patronTel.test(telefono.value)) {//EVALUAMOS SI EL DATO CUMPLE CON Expresion Regular
        telefono.style.borderColor = "#0afc16"; 
        errorTel.style.display = "none";
    } else {
        telefono.style.borderColor = "#e31b23"; 
        errorTel.classList.add("error");
        errorTel.style.color = " #e31b23",
            errorTel.textContent = "datos no validos, escriba +240 000 000 000";
        errorTel.style.display = "block";
    }
});


// registro de lista en la tabla y edicion del modal
let btnAbrirModal = document.getElementById("cajaRoja");
let modal = document.getElementById("modal");
let btnCerrarModal = document.getElementById("cerrarModal");

btnAbrirModal.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("activo");
});

btnCerrarModal.addEventListener("click", function () {
    modal.classList.remove("activo");
});
