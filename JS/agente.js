// Panel del AGENTE DE VENTA

if (!comprobarSesion('agente')) {
    // Si no es agente, panel.js ya redirige al formulario
} else {

    document.getElementById('nombreUsuario').textContent = sesionPanel.nombre;

    document.getElementById('btnCerrarSesion').addEventListener('click', function (e) {
        e.preventDefault();
        cerrarSesionPanel();
    });

    fetch('./JSON/usuarios.json')
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {

            crearMenuEnlaces([
                { texto: 'Inicio', pagina: 'index.html' },
                { texto: 'Rutas', pagina: 'M3.html' },
                { texto: 'Reserva', pagina: 'M4.html' },
                { texto: 'Facturacion', pagina: 'M5.html' },
                { texto: 'Analisis', pagina: 'M6.html' },
                { texto: 'Soporte', pagina: 'M7.html' }
            ]);

            crearNavModulos(datos.modulos, 'agente');
            crearBotonesCasos(datos.modulos, 'agente');
            mostrarHistorial();
            mostrarSolicitudes();
        });
}
