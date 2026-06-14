// Panel del ADMINISTRADOR

if (!comprobarSesion('admin')) {
    // Si no es admin, panel.js ya redirige al formulario
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
                { texto: 'Agencia', pagina: 'M2.html' },
                { texto: 'Rutas', pagina: 'M3.html' },
                { texto: 'Reserva', pagina: 'M4.html' },
                { texto: 'Facturacion', pagina: 'M5.html' },
                { texto: 'Analisis', pagina: 'M6.html' },
                { texto: 'Soporte', pagina: 'M7.html' }
            ]);

            crearNavModulos(datos.modulos, 'admin');
            crearBotonesCasos(datos.modulos, 'admin');
            mostrarHistorial();
            mostrarSolicitudes();
        });
}
