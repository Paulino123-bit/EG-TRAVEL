

var sesionPanel = null;

// Comprobar que el usuario tiene sesión y el rol correcto
function comprobarSesion(rolPermitido) {
    var datos = sessionStorage.getItem('egtravel_usuario');
    if (!datos) {
        window.location.href = 'formulario.html';
        return false;
    }
    sesionPanel = JSON.parse(datos);
    if (sesionPanel.rol !== rolPermitido) {
        window.location.href = 'formulario.html';
        return false;
    }
    return true;
}

// Guardar en el historial qué acción hizo el usuario
function guardarAccion(caso, modulo) {
    var lista = JSON.parse(localStorage.getItem('accionesPanel')) || [];
    lista.push({
        fecha: new Date().toLocaleString('es-ES'),
        usuario: sesionPanel.nombre,
        rol: sesionPanel.rol,
        caso: caso,
        modulo: modulo
    });
    localStorage.setItem('accionesPanel', JSON.stringify(lista));
    mostrarHistorial();
}

// Mostrar historial de acciones en el panel
function mostrarHistorial() {
    var contenedor = document.getElementById('historialAcciones');
    if (!contenedor) return;

    var lista = JSON.parse(localStorage.getItem('accionesPanel')) || [];
    var filtrada = [];

    for (var i = 0; i < lista.length; i++) {
        if (lista[i].rol === sesionPanel.rol) {
            filtrada.push(lista[i]);
        }
    }

    if (filtrada.length === 0) {
        contenedor.innerHTML = '<p class="sin-datos">Aún no ha ejecutado ninguna función.</p>';
        return;
    }

    var html = '<table class="tabla-solicitudes"><thead><tr>';
    html += '<th>Fecha</th><th>Función</th><th>Módulo</th></tr></thead><tbody>';

    for (var j = filtrada.length - 1; j >= 0; j--) {
        html += '<tr><td>' + filtrada[j].fecha + '</td>';
        html += '<td>' + filtrada[j].caso + '</td>';
        html += '<td>' + filtrada[j].modulo + '</td></tr>';
    }

    html += '</tbody></table>';
    contenedor.innerHTML = html;
}

// Mostrar mensaje en la zona de acción
function mostrarMensaje(texto, esOk) {
    var zona = document.getElementById('zonaAccion');
    var clase = esOk ? 'msg-ok' : 'msg-error';
    zona.innerHTML = '<p class="' + clase + '">' + texto + '</p>';
}

// Ir al módulo HTML correspondiente
function irAModulo(pagina, caso, modulo) {
    guardarAccion(caso, modulo);
    mostrarMensaje('Abriendo ' + modulo + ' para: ' + caso + '...', true);
    setTimeout(function () {
        window.location.href = './' + pagina;
    }, 900);
}

// Cerrar sesión
function cerrarSesionPanel() {
    sessionStorage.removeItem('egtravel_usuario');
    window.location.href = 'formulario.html';
}

// ---- Formularios sencillos dentro del panel ----

function formularioAgencia(zona) {
    zona.innerHTML =
        '<h3 class="accion-titulo">Registrar agencia</h3>' +
        '<label>Nombre de la agencia</label>' +
        '<input type="text" id="inputAgencia" placeholder="Ej: Agencia Malabo">' +
        '<button type="button" class="btn-accion" id="btnGuardarAgencia">Guardar agencia</button>';

    document.getElementById('btnGuardarAgencia').onclick = function () {
        var nombre = document.getElementById('inputAgencia').value.trim();
        if (nombre === '') {
            mostrarMensaje('Escriba el nombre de la agencia.', false);
            return;
        }
        var agencias = JSON.parse(localStorage.getItem('agenciasRegistradas')) || [];
        agencias.push({ nombre: nombre, fecha: new Date().toLocaleString('es-ES') });
        localStorage.setItem('agenciasRegistradas', JSON.stringify(agencias));
        guardarAccion('Registrar agencia', 'Gestión de usuarios y agencias');
        mostrarMensaje('Agencia "' + nombre + '" registrada correctamente.', true);
    };
}

function formularioUsuario(zona) {
    zona.innerHTML =
        '<h3 class="accion-titulo">Gestionar usuario</h3>' +
        '<label>Nombre</label>' +
        '<input type="text" id="inputNombreUser" placeholder="Nombre completo">' +
        '<label>Correo</label>' +
        '<input type="email" id="inputEmailUser" placeholder="correo@email.com">' +
        '<button type="button" class="btn-accion" id="btnGuardarUser">Guardar usuario</button>';

    document.getElementById('btnGuardarUser').onclick = function () {
        var nombre = document.getElementById('inputNombreUser').value.trim();
        var email = document.getElementById('inputEmailUser').value.trim();
        if (nombre === '' || email === '') {
            mostrarMensaje('Complete nombre y correo.', false);
            return;
        }
        var usuarios = JSON.parse(localStorage.getItem('usuariosGestionados')) || [];
        usuarios.push({ nombre: nombre, email: email, fecha: new Date().toLocaleString('es-ES') });
        localStorage.setItem('usuariosGestionados', JSON.stringify(usuarios));
        guardarAccion('Gestionar usuarios', 'Gestión de usuarios y agencias');
        mostrarMensaje('Usuario ' + nombre + ' guardado.', true);
    };
}

function formularioRuta(zona) {
    zona.innerHTML =
        '<h3 class="accion-titulo">Registrar ruta marítima</h3>' +
        '<label>Origen</label><input type="text" id="inputOrigen" placeholder="Malabo">' +
        '<label>Destino</label><input type="text" id="inputDestino" placeholder="Bata">' +
        '<button type="button" class="btn-accion" id="btnGuardarRuta">Registrar ruta</button>';

    document.getElementById('btnGuardarRuta').onclick = function () {
        var origen = document.getElementById('inputOrigen').value.trim();
        var destino = document.getElementById('inputDestino').value.trim();
        if (origen === '' || destino === '') {
            mostrarMensaje('Complete origen y destino.', false);
            return;
        }
        var rutas = JSON.parse(localStorage.getItem('rutasRegistradas')) || [];
        rutas.push({ origen: origen, destino: destino, fecha: new Date().toLocaleString('es-ES') });
        localStorage.setItem('rutasRegistradas', JSON.stringify(rutas));
        guardarAccion('Registrar ruta', 'Catálogo de rutas');
        mostrarMensaje('Ruta ' + origen + ' → ' + destino + ' registrada.', true);
    };
}

function formularioReserva(zona) {
    zona.innerHTML =
        '<h3 class="accion-titulo">Crear reserva</h3>' +
        '<label>Cliente</label><input type="text" id="inputCliente" placeholder="Nombre del cliente">' +
        '<label>Ruta</label><input type="text" id="inputRutaRes" placeholder="Malabo - Bata">' +
        '<button type="button" class="btn-accion" id="btnGuardarRes">Crear reserva</button>';

    document.getElementById('btnGuardarRes').onclick = function () {
        var cliente = document.getElementById('inputCliente').value.trim();
        var ruta = document.getElementById('inputRutaRes').value.trim();
        if (cliente === '' || ruta === '') {
            mostrarMensaje('Complete cliente y ruta.', false);
            return;
        }
        var reservas = JSON.parse(localStorage.getItem('reservasCreadas')) || [];
        reservas.push({ cliente: cliente, ruta: ruta, agente: sesionPanel.nombre, fecha: new Date().toLocaleString('es-ES') });
        localStorage.setItem('reservasCreadas', JSON.stringify(reservas));
        guardarAccion('Crear reserva', 'Reservas');
        mostrarMensaje('Reserva creada para ' + cliente + '.', true);
    };
}

function formularioPago(zona) {
    zona.innerHTML =
        '<h3 class="accion-titulo">Registrar pago</h3>' +
        '<label>Cliente</label><input type="text" id="inputClientePago" placeholder="Nombre">' +
        '<label>Importe (€)</label><input type="number" id="inputImporte" placeholder="150">' +
        '<button type="button" class="btn-accion" id="btnGuardarPago">Registrar pago</button>';

    document.getElementById('btnGuardarPago').onclick = function () {
        var cliente = document.getElementById('inputClientePago').value.trim();
        var importe = document.getElementById('inputImporte').value;
        if (cliente === '' || importe === '') {
            mostrarMensaje('Complete cliente e importe.', false);
            return;
        }
        var pagos = JSON.parse(localStorage.getItem('pagosRegistrados')) || [];
        pagos.push({ cliente: cliente, importe: importe, fecha: new Date().toLocaleString('es-ES') });
        localStorage.setItem('pagosRegistrados', JSON.stringify(pagos));
        guardarAccion('Pago en línea', 'Pagos y facturación');
        mostrarMensaje('Pago de ' + importe + '€ registrado para ' + cliente + '.', true);
    };
}

function formularioTicket(zona) {
    zona.innerHTML =
        '<h3 class="accion-titulo">Abrir ticket de soporte</h3>' +
        '<label>Asunto</label><input type="text" id="inputAsunto" placeholder="Problema con reserva">' +
        '<label>Descripción</label><textarea id="inputDesc" rows="3" placeholder="Describa el problema"></textarea>' +
        '<button type="button" class="btn-accion" id="btnGuardarTicket">Abrir ticket</button>';

    document.getElementById('btnGuardarTicket').onclick = function () {
        var asunto = document.getElementById('inputAsunto').value.trim();
        var desc = document.getElementById('inputDesc').value.trim();
        if (asunto === '') {
            mostrarMensaje('Escriba un asunto.', false);
            return;
        }
        var tickets = JSON.parse(localStorage.getItem('ticketsSoporte')) || [];
        tickets.push({ asunto: asunto, descripcion: desc, usuario: sesionPanel.nombre, fecha: new Date().toLocaleString('es-ES') });
        localStorage.setItem('ticketsSoporte', JSON.stringify(tickets));
        guardarAccion('Abrir ticket', 'Soporte');
        mostrarMensaje('Ticket "' + asunto + '" abierto correctamente.', true);
    };
}

// Función principal: qué hacer al pulsar un caso de uso
function ejecutarCaso(caso, pagina, nombreModulo) {
    var zona = document.getElementById('zonaAccion');

    if (caso === 'Cerrar sesión') {
        guardarAccion(caso, nombreModulo);
        cerrarSesionPanel();
        return;
    }

    if (caso === 'Iniciar sesión') {
        guardarAccion(caso, nombreModulo);
        mostrarMensaje('Sesión activa. Bienvenido ' + sesionPanel.nombre + '.', true);
        return;
    }

    if (caso === 'Registrar agencia') {
        formularioAgencia(zona);
        return;
    }

    if (caso === 'Gestionar usuarios') {
        formularioUsuario(zona);
        return;
    }

    if (caso === 'Registrar ruta' || caso === 'Registrar ruta marítima') {
        formularioRuta(zona);
        return;
    }

    if (caso === 'Crear reserva') {
        formularioReserva(zona);
        return;
    }

    if (caso === 'Pago en línea' || caso === 'Registrar transacción') {
        formularioPago(zona);
        return;
    }

    if (caso === 'Abrir ticket') {
        formularioTicket(zona);
        return;
    }

    // El resto de casos: abrir el módulo correspondiente
    irAModulo(pagina, caso, nombreModulo);
}

// Crear los botones de casos de uso
function crearBotonesCasos(modulos, rol) {
    var listaCasos = document.getElementById('listaCasos');
    listaCasos.innerHTML = '';

    for (var i = 0; i < modulos.length; i++) {
        var modulo = modulos[i];
        if (modulo.rol !== rol) continue;

        var bloque = document.createElement('div');
        bloque.className = 'bloque-modulo';

        var titulo = document.createElement('h3');
        titulo.className = 'titulo-modulo';
        titulo.textContent = modulo.nombre;
        bloque.appendChild(titulo);

        var contenedorBotones = document.createElement('div');
        contenedorBotones.className = 'botones-casos';

        for (var j = 0; j < modulo.casos.length; j++) {
            var nombreCaso = modulo.casos[j];
            var boton = document.createElement('button');
            boton.type = 'button';
            boton.className = 'btn-caso';
            boton.textContent = nombreCaso;

            // Guardar datos en el botón para el click
            boton.setAttribute('data-caso', nombreCaso);
            boton.setAttribute('data-pagina', modulo.pagina);
            boton.setAttribute('data-modulo', modulo.nombre);

            boton.onclick = function () {
                ejecutarCaso(
                    this.getAttribute('data-caso'),
                    this.getAttribute('data-pagina'),
                    this.getAttribute('data-modulo')
                );
            };

            contenedorBotones.appendChild(boton);
        }

        bloque.appendChild(contenedorBotones);
        listaCasos.appendChild(bloque);
    }
}

// Menú superior con enlaces a módulos
function crearMenuEnlaces(enlaces) {
    var menu = document.getElementById('menuModulos');
    menu.innerHTML = '';
    for (var i = 0; i < enlaces.length; i++) {
        var a = document.createElement('a');
        a.href = './' + enlaces[i].pagina;
        a.textContent = enlaces[i].texto;
        menu.appendChild(a);
    }
}

function crearNavModulos(modulos, rol) {
    var nav = document.getElementById('navModulos');
    nav.innerHTML = '';
    var yaVistos = [];

    for (var i = 0; i < modulos.length; i++) {
        if (modulos[i].rol !== rol) continue;
        if (yaVistos.indexOf(modulos[i].pagina) !== -1) continue;
        yaVistos.push(modulos[i].pagina);

        var a = document.createElement('a');
        a.href = './' + modulos[i].pagina;
        a.textContent = modulos[i].nombre;
        nav.appendChild(a);
    }
}

// Mostrar solicitudes de clientes estándar
function mostrarSolicitudes() {
    var contenedor = document.getElementById('tablaSolicitudes');
    if (!contenedor) return;

    var solicitudes = JSON.parse(localStorage.getItem('solicitudesClientes')) || [];

    if (solicitudes.length === 0) {
        contenedor.innerHTML = '<p class="sin-datos">No hay solicitudes de clientes todavía.</p>';
        return;
    }

    var html = '<table class="tabla-solicitudes"><thead><tr>';
    html += '<th>Fecha</th><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Motivo</th>';
    html += '<th>Acción</th></tr></thead><tbody>';

    for (var i = 0; i < solicitudes.length; i++) {
        var s = solicitudes[i];
        html += '<tr><td>' + s.fecha + '</td><td>' + s.nombre + '</td>';
        html += '<td>' + s.email + '</td><td>' + s.telefono + '</td><td>' + s.motivo + '</td>';
        html += '<td><button type="button" class="btn-mini" onclick="atenderSolicitud(' + i + ')">Atender</button></td></tr>';
    }

    html += '</tbody></table>';
    contenedor.innerHTML = html;
}

// Atender una solicitud de cliente
function atenderSolicitud(indice) {
    var solicitudes = JSON.parse(localStorage.getItem('solicitudesClientes')) || [];
    if (!solicitudes[indice]) return;

    var cliente = solicitudes[indice].nombre;
    solicitudes[indice].atendida = true;
    solicitudes[indice].atendidaPor = sesionPanel.nombre;
    localStorage.setItem('solicitudesClientes', JSON.stringify(solicitudes));

    guardarAccion('Atender solicitud de ' + cliente, 'Solicitudes clientes');
    mostrarMensaje('Solicitud de ' + cliente + ' marcada como atendida.', true);
    mostrarSolicitudes();
}
