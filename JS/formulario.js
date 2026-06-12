// Leer parámetros de la URL (?motivo=pago&volver=M5.html)
function obtenerParametro(nombre) {
    var parametros = new URLSearchParams(window.location.search);
    return parametros.get(nombre);
}

var motivo = obtenerParametro('motivo');
var paginaVolver = obtenerParametro('volver') || 'M5.html';

// Cambiar de vista (login o registro)
function mostrarVista(id) {
    document.getElementById('viewLogin').classList.remove('active');
    document.getElementById('viewRegister').classList.remove('active');
    document.getElementById(id).classList.add('active');
}

// Si viene de M5 o M4, mostrar formulario de datos del cliente
if (motivo === 'pago' || motivo === 'reserva') {
    mostrarVista('viewRegister');
    if (motivo === 'pago') {
        document.getElementById('tituloRegistro').textContent = 'Datos para pago de billete';
        document.getElementById('subtituloRegistro').textContent = 'Complete sus datos antes de realizar el pago.';
    } else {
        document.getElementById('tituloRegistro').textContent = 'Datos para reserva';
        document.getElementById('subtituloRegistro').textContent = 'Complete sus datos antes de confirmar la reserva.';
    }
}

document.getElementById('backFromRegister').addEventListener('click', function () {
    window.location.href = './' + paginaVolver;
});

// LOGIN — solo admin y agente
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');

    emailError.textContent = '';
    passwordError.textContent = '';

    if (email === '') {
        emailError.textContent = 'Escriba su correo.';
        return;
    }
    if (password === '') {
        passwordError.textContent = 'Escriba su contraseña.';
        return;
    }

    fetch('./JSON/usuarios.json')
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (datos) {
            var usuarioEncontrado = null;

            for (var i = 0; i < datos.usuarios.length; i++) {
                var u = datos.usuarios[i];
                if (u.email === email && u.password === password) {
                    usuarioEncontrado = u;
                    break;
                }
            }

            if (!usuarioEncontrado) {
                emailError.textContent = 'Correo o contraseña incorrectos.';
                return;
            }

            if (usuarioEncontrado.rol === 'estandar') {
                emailError.textContent = 'Los usuarios estándar navegan sin login. Use el formulario al reservar o pagar.';
                return;
            }

            sessionStorage.setItem('egtravel_usuario', JSON.stringify(usuarioEncontrado));

            if (usuarioEncontrado.rol === 'admin') {
                window.location.href = 'admin.html';
            } else if (usuarioEncontrado.rol === 'agente') {
                window.location.href = 'agente.html';
            }
        });
});

// REGISTRO — usuario estándar (guarda solicitud para admin y agente)
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var nombre = document.getElementById('fullName').value.trim();
    var email = document.getElementById('registerEmail').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var password = document.getElementById('registerPassword').value;

    document.getElementById('fullNameError').textContent = '';
    document.getElementById('registerEmailError').textContent = '';
    document.getElementById('telefonoError').textContent = '';
    document.getElementById('registerPasswordError').textContent = '';

    if (nombre.length < 3) {
        document.getElementById('fullNameError').textContent = 'Nombre demasiado corto.';
        return;
    }
    if (email.indexOf('@') === -1) {
        document.getElementById('registerEmailError').textContent = 'Correo no válido.';
        return;
    }
    if (telefono === '') {
        document.getElementById('telefonoError').textContent = 'Escriba su teléfono.';
        return;
    }
    if (password.length < 6) {
        document.getElementById('registerPasswordError').textContent = 'Mínimo 6 caracteres.';
        return;
    }

    var solicitud = {
        fecha: new Date().toLocaleString('es-ES'),
        nombre: nombre,
        email: email,
        telefono: telefono,
        motivo: motivo === 'reserva' ? 'Reserva de billete' : 'Pago de billete'
    };

    var lista = JSON.parse(localStorage.getItem('solicitudesClientes')) || [];
    lista.push(solicitud);
    localStorage.setItem('solicitudesClientes', JSON.stringify(lista));

    sessionStorage.setItem('egtravel_cliente', JSON.stringify({
        nombre: nombre,
        email: email,
        telefono: telefono
    }));

    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('registerSuccess').classList.remove('hidden');

    setTimeout(function () {
        window.location.href = './' + paginaVolver;
    }, 2000);
});
