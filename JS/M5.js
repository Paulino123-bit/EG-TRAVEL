//ABRIR MODAL

// Botón que abre el modal
const btnOpenModal = document.getElementById("generateInvoice");

// Modal y botón de cerrar
const invoiceModal = document.getElementById("invoiceModal");
const btnCloseModal = document.querySelector("[data-close='invoiceModal']");

// Abrir modal
btnOpenModal.addEventListener("click", () => {
    invoiceModal.classList.remove("hidden");
});

// Cerrar modal
btnCloseModal.addEventListener("click", () => {
    invoiceModal.classList.add("hidden");
});

// Cerrar modal al hacer clic fuera (overlay)
invoiceModal.addEventListener("click", (e) => {
    if (e.target === invoiceModal) {
        invoiceModal.classList.add("hidden");
    }
});

// ===========================
//   lista de transaciones
// ===========================

// Función para cargar el archivo JSON y mostrarlo en la tabla
function cargarTransacciones() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./JSON/listaTransaciones.json", true); // Ruta del archivo JSON

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const tbody = document.getElementById("transactionsBody");
            tbody.innerHTML = ""; // Limpia la tabla antes de insertar

            data.transacciones.forEach(transaccion => {
                const fila = document.createElement("tr");

                // Checkbox
                const tdCheck = document.createElement("td");
                const check = document.createElement("input");
                check.type = "checkbox";
                tdCheck.appendChild(check);
                fila.appendChild(tdCheck);

                // FACTURA ID
                const tdFactura = document.createElement("td");
                tdFactura.textContent = transaccion.FACTURA_ID;
                fila.appendChild(tdFactura);

                // FECHA
                const tdFecha = document.createElement("td");
                tdFecha.textContent = transaccion.FECHA;
                fila.appendChild(tdFecha);

                // CONCEPTO
                const tdConcepto = document.createElement("td");
                tdConcepto.textContent = transaccion.CONCEPTO;
                fila.appendChild(tdConcepto);

                // MONTO
                const tdMonto = document.createElement("td");
                tdMonto.textContent = transaccion.MONTO;
                fila.appendChild(tdMonto);

                // ESTADO
                const tdEstado = document.createElement("td");
                tdEstado.textContent = transaccion.ESTADO;
                fila.appendChild(tdEstado);

                // ACCIONES
                const tdAcciones = document.createElement("td");
                tdAcciones.textContent = transaccion.ACCIONES;
                fila.appendChild(tdAcciones);

                // Insertar fila en la tabla
                tbody.appendChild(fila);
            });
        }
    };

    xhr.send();
}

// Llamar a la función al cargar la página
window.onload = cargarTransacciones;

// ===================
// PASARELA DE PAGOS
// ===================
// Botón que abre el modal
const btnOpenPayment = document.getElementById("executePayment");
const paymentModal = document.getElementById("paymentModal");
const btnClosePayment = document.querySelector("[data-close='paymentModal']");// BUSCA CUALQUIER ELEMENTO CON ESTE ATRINUTO

// Abrir modal
btnOpenPayment.addEventListener("click", () => {
    paymentModal.classList.remove("hidden");
});

// Cerrar modal
btnClosePayment.addEventListener("click", () => {
    paymentModal.classList.add("hidden");
});

// Cerrar modal al hacer clic fuera (overlay)
paymentModal.addEventListener("click", (e) => {
    if (e.target === paymentModal) {
        paymentModal.classList.add("hidden");
    }
});

// Cambiar entre métodos de pago
const methodButtons = document.querySelectorAll(".method-btn");
const forms = document.querySelectorAll(".payment-form");

methodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Quitar clase activa de todos los botones
        methodButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Ocultar todos los formularios
        forms.forEach(form => form.classList.add("hidden"));

        // Mostrar el formulario correspondiente
        const metodo = btn.getAttribute("data-method");
        document.getElementById(metodo + "Form").classList.remove("hidden");
    });
});

// Confirmar pago
const confirmPayment = document.getElementById("confirmPayment");
confirmPayment.addEventListener("click", () => {
    alert(" Pago confirmado con éxito.\nGracias por usar nuestra pasarela segura.");
    paymentModal.classList.add("hidden");
});

