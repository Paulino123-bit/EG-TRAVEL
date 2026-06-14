// Comprueba si el cliente ya dejó sus datos
function clienteTieneDatos() {
    var datos = sessionStorage.getItem('egtravel_cliente');
    return datos !== null;
}

// Redirige al formulario si no hay datos del cliente
function pedirDatosCliente(motivo) {
    var paginaActual = window.location.pathname.split('/').pop();
    window.location.href = 'formulario.html?motivo=' + motivo + '&volver=' + paginaActual;
}

// Botón de pago en M5
var btnPago = document.getElementById('executePayment');
if (btnPago) {
    btnPago.addEventListener('click', function () {
        if (!clienteTieneDatos()) {
            pedirDatosCliente('pago');
        }
    });
}

var btnConfirmarPago = document.getElementById('confirmPayment');
if (btnConfirmarPago) {
    btnConfirmarPago.addEventListener('click', function () {
        if (!clienteTieneDatos()) {
            pedirDatosCliente('pago');
        }
    });
}

// Botón de reserva en M4 (guardar pasajero)
var formPasajero = document.getElementById('passengerForm');
if (formPasajero) {
    formPasajero.addEventListener('submit', function (e) {
        if (!clienteTieneDatos()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            pedirDatosCliente('reserva');
        }
    }, true);
}
