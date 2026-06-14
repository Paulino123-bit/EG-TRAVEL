/* ═══════════════════════════════════════════════════════════════
   MÓDULO 7 — Notificaciones y Soporte
   EG-TRAVEL — Centro de Notificaciones y Soporte Pro 2.0

   Este archivo controla:
   - Notificaciones activas (confirmación, cambios, cancelaciones)
   - Alertas automáticas por correo
   - Sistema de tickets de soporte
   - Chat de asistencia con IA
   - Centro de ayuda con preguntas frecuentes
   ═══════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 1: DATOS INICIALES

   Simulamos los datos que en producción vendrían del servidor.
   ───────────────────────────────────────────────────────────── */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lista de notificaciones de la plataforma
let notificaciones = [
    {
        id: 1,
        tipo: 'critical',
        badge: 'CRÍTICO',
        badgeClass: 'badge-critical',
        icon: 'critical',
        iconEmoji: '❗',
        titulo: 'Retraso en Terminal Puerto Algeciras',
        descripcion: 'Congestión imprevista detectada. 4 envíos en tránsito pueden verse afectados. Se recomienda reprogramar salidas.',
        tiempo: 'Ahora mismo',
        leida: false
    },
    {
        id: 2,
        tipo: 'system',
        badge: 'SISTEMA',
        badgeClass: 'badge-system',
        icon: 'system',
        iconEmoji: '🔄',
        titulo: 'Actualización V3.4.1 Completada',
        descripcion: 'Se han implementado mejoras en el motor de predicción de rutas y optimización de slots portuarios.',
        tiempo: 'Hace 2 horas',
        leida: false
    },
    {
        id: 3,
        tipo: 'operational',
        badge: 'OPERACIONAL',
        badgeClass: 'badge-operational',
        icon: 'operational',
        iconEmoji: '✓',
        titulo: 'Documentación Aprobada: MS-9921',
        descripcion: 'El manifiesto de carga para el buque "Vanguard Pioneer" ha sido validado por las autoridades portuarias.',
        tiempo: 'Hace 5 horas',
        leida: false
    },
    {
        id: 4,
        tipo: 'confirm',
        badge: 'CONFIRMACIÓN',
        badgeClass: 'badge-confirm',
        icon: 'confirm',
        iconEmoji: '✅',
        titulo: 'Reserva Confirmada: RES-EG-4421',
        descripcion: 'Su reserva Shanghai → Barcelona ha sido confirmada. Cabina 820 asignada. Boleto disponible para descarga.',
        tiempo: 'Hace 1 día',
        leida: true
    },
    {
        id: 5,
        tipo: 'change',
        badge: 'CAMBIO',
        badgeClass: 'badge-change',
        icon: 'change',
        iconEmoji: '📅',
        titulo: 'Cambio de Itinerario: Ruta BCN-GEN',
        descripcion: 'La salida del buque EG-TRAVEL AURORA se ha reprogramado al 18 OCT, 2024 — 20:00. Nueva ETA: 20 OCT.',
        tiempo: 'Hace 2 días',
        leida: true
    },
    {
        id: 6,
        tipo: 'cancel',
        badge: 'CANCELACIÓN',
        badgeClass: 'badge-cancel',
        icon: 'cancel',
        iconEmoji: '✕',
        titulo: 'Reserva Cancelada: RES-EG-4398',
        descripcion: 'La reserva Yokohama → Los Ángeles ha sido cancelada. Reembolso del 85% procesado en 5-7 días hábiles.',
        tiempo: 'Hace 3 días',
        leida: true
    }
];

// Tickets de soporte técnico
let tickets = [
    {
        id: 'TK-88291',
        estado: 'process',
        estadoTexto: 'EN PROCESO',
        asunto: 'Discrepancia en Facturación Q4',
        actividad: 'Última actividad: Hace 45 min',
        categoria: 'Facturación'
    },
    {
        id: 'TK-88102',
        estado: 'resolved',
        estadoTexto: 'RESUELTO',
        asunto: 'Acceso a API restringido',
        actividad: 'Cerrado: Ayer 14:20',
        categoria: 'API Técnica'
    }
];

// Historial completo de tickets (incluye cerrados antiguos)
const historialTickets = [
    { id: 'TK-88291', estado: 'EN PROCESO', asunto: 'Discrepancia en Facturación Q4', fecha: 'Oct 27, 2024' },
    { id: 'TK-88102', estado: 'RESUELTO', asunto: 'Acceso a API restringido', fecha: 'Oct 25, 2024' },
    { id: 'TK-87950', estado: 'RESUELTO', asunto: 'Error en generación de boleto PDF', fecha: 'Oct 20, 2024' },
    { id: 'TK-87801', estado: 'RESUELTO', asunto: 'Consulta sobre crédito de agencia', fecha: 'Oct 15, 2024' }
];

// Preguntas frecuentes del centro de ayuda
const faqData = [
    {
        pregunta: '¿Cómo confirmo una reserva de camarote?',
        respuesta: 'Acceda al Módulo 4 (Reservas), seleccione su cabina en el plano del buque, complete los datos del pasajero y pulse "Configurar Reserva". Recibirá una notificación de confirmación automática.'
    },
    {
        pregunta: '¿Cómo descargo mi boleto en PDF?',
        respuesta: 'En la tarjeta de embarque del panel de reservas, pulse el botón "DESCARGAR TICKET PDF". El boleto incluye código QR para verificación en puerto.'
    },
    {
        pregunta: '¿Cómo solicito un reembolso?',
        respuesta: 'En el panel de gestión de reserva, seleccione "Solicitar Reembolso". Las cancelaciones con más de 48h de anticipación son elegibles para reembolso parcial del 85%.'
    },
    {
        pregunta: '¿Cómo configuro alertas por correo?',
        respuesta: 'En este módulo, sección "Alertas Automáticas", ingrese su correo y seleccione los tipos de notificación: confirmaciones, cambios de itinerario y cancelaciones.'
    }
];

// Guías de uso detalladas
const guiasUso = [
    { titulo: 'Guía de Reservas', descripcion: 'Aprenda a seleccionar cabinas, registrar pasajeros y emitir boletos paso a paso.' },
    { titulo: 'Guía de Pagos', descripcion: 'Configure métodos de pago, gestione crédito de agencia y descargue facturas fiscales.' },
    { titulo: 'Guía de Reportes', descripcion: 'Utilice el dashboard analítico para exportar reportes PDF/Excel con proyecciones por temporada.' },
    { titulo: 'Guía de API', descripcion: 'Integre EG-TRAVEL con su sistema mediante nuestra API REST documentada.' }
];

// Respuestas automáticas del chat IA según el tema
const respuestasChat = {
    logistica: 'Para consultas logísticas, puede revisar el catálogo de rutas en el Módulo 2. ¿Necesita información sobre una ruta específica?',
    facturacion: 'El Centro de Control Financiero (Módulo 5) le permite gestionar pagos, facturas y crédito. ¿Tiene alguna factura pendiente?',
    api: 'La documentación de la API está disponible en la sección Documentación. ¿Necesita ayuda con autenticación o endpoints?',
    default: 'Gracias por su consulta. Un agente de soporte revisará su caso. Mientras tanto, puede crear un ticket formal desde el panel derecho.'
};


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 2: FUNCIONES AUXILIARES
   ───────────────────────────────────────────────────────────── */

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.remove('hidden');
    setTimeout(function () { toast.classList.add('hidden'); }, 3500);
}

function abrirModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function cerrarModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = '';
}

function marcarError(input, errorEl, mensaje) {
    if (mensaje) {
        if (input) input.classList.add('error');
        if (errorEl) errorEl.textContent = mensaje;
        return false;
    }
    if (input) input.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
}

function contarNoLeidas() {
    return notificaciones.filter(function (n) { return !n.leida; }).length;
}

function contarTicketsAbiertos() {
    return tickets.filter(function (t) { return t.estado !== 'resolved'; }).length;
}


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 3: RENDERIZAR NOTIFICACIONES
   ───────────────────────────────────────────────────────────── */

function renderizarNotificaciones(filtro) {
    const lista = document.getElementById('notifList');
    lista.innerHTML = '';
    const textoFiltro = (filtro || '').toLowerCase();

    notificaciones.forEach(function (notif) {
        const textoBusqueda = (notif.titulo + notif.descripcion).toLowerCase();
        if (textoFiltro && !textoBusqueda.includes(textoFiltro)) return;

        const item = document.createElement('div');
        item.className = 'notif-item' + (notif.leida ? ' read' : '');
        item.dataset.id = notif.id;

        item.innerHTML =
            '<div class="notif-icon ' + notif.icon + '">' + notif.iconEmoji + '</div>' +
            '<div class="notif-body">' +
            '<span class="notif-badge ' + notif.badgeClass + '">' + notif.badge + '</span>' +
            '<p class="notif-title">' + notif.titulo + '</p>' +
            '<p class="notif-desc">' + notif.descripcion + '</p>' +
            '<span class="notif-time">' + notif.tiempo + '</span>' +
            '</div>' +
            '<span class="notif-arrow">›</span>';

        // Al hacer clic, marcamos como leída y mostramos detalle
        item.addEventListener('click', function () {
            notif.leida = true;
            renderizarNotificaciones(filtro);
            actualizarContadores();
            mostrarToast('Notificación: ' + notif.titulo);
        });

        lista.appendChild(item);
    });

    actualizarContadores();
}


function actualizarContadores() {
    const noLeidas = contarNoLeidas();
    document.getElementById('notifyCount').textContent = noLeidas;
    document.getElementById('notifyCount').style.display = noLeidas > 0 ? 'flex' : 'none';
}


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 4: MARCAR TODO LEÍDO
   ───────────────────────────────────────────────────────────── */

document.getElementById('markAllRead').addEventListener('click', function () {
    notificaciones.forEach(function (n) { n.leida = true; });
    renderizarNotificaciones();
    mostrarToast('Todas las notificaciones marcadas como leídas.');
});


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 5: TICKETS DE SOPORTE
   ───────────────────────────────────────────────────────────── */

function renderizarTickets() {
    const lista = document.getElementById('ticketList');
    lista.innerHTML = '';

    tickets.forEach(function (ticket) {
        const div = document.createElement('div');
        div.className = 'ticket-item';
        div.innerHTML =
            '<p class="ticket-id">ID: #' + ticket.id + '</p>' +
            '<span class="ticket-status ' + ticket.estado + '">' + ticket.estadoTexto + '</span>' +
            '<p class="ticket-subject">' + ticket.asunto + '</p>' +
            '<p class="ticket-activity">' + ticket.actividad + '</p>';
        lista.appendChild(div);
    });

    const abiertos = contarTicketsAbiertos();
    document.getElementById('openTicketsBadge').textContent = abiertos + ' Abierto' + (abiertos !== 1 ? 's' : '');
}


// Crear nuevo ticket
document.getElementById('newTicket').addEventListener('click', function () {
    abrirModal('ticketModal');
});

document.getElementById('ticketForm').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const asunto = document.getElementById('ticketSubject');
    const categoria = document.getElementById('ticketCategory');
    const descripcion = document.getElementById('ticketDesc');

    let valido = true;

    if (asunto.value.trim().length < 5) {
        marcarError(asunto, document.getElementById('ticketSubjectError'), 'El asunto debe tener al menos 5 caracteres.');
        valido = false;
    } else {
        marcarError(asunto, document.getElementById('ticketSubjectError'), '');
    }

    if (!categoria.value) {
        marcarError(categoria, document.getElementById('ticketCategoryError'), 'Seleccione una categoría.');
        valido = false;
    } else {
        marcarError(categoria, document.getElementById('ticketCategoryError'), '');
    }

    if (descripcion.value.trim().length < 10) {
        marcarError(descripcion, document.getElementById('ticketDescError'), 'Describa la incidencia (mínimo 10 caracteres).');
        valido = false;
    } else {
        marcarError(descripcion, document.getElementById('ticketDescError'), '');
    }

    if (!valido) return;

    // Generamos un ID único para el nuevo ticket
    const nuevoId = 'TK-' + Math.floor(88000 + Math.random() * 1000);

    tickets.unshift({
        id: nuevoId,
        estado: 'open',
        estadoTexto: 'ABIERTO',
        asunto: asunto.value.trim(),
        actividad: 'Creado: Ahora mismo',
        categoria: categoria.value
    });

    historialTickets.unshift({
        id: nuevoId,
        estado: 'ABIERTO',
        asunto: asunto.value.trim(),
        fecha: new Date().toLocaleDateString('es-ES')
    });

    renderizarTickets();
    document.getElementById('ticketSuccess').classList.remove('hidden');
    document.getElementById('ticketForm').reset();

    mostrarToast('Ticket #' + nuevoId + ' creado. Un agente le atenderá pronto.');
});


// Ver historial de soporte
document.getElementById('viewHistory').addEventListener('click', function () {
    const lista = document.getElementById('historyList');
    lista.innerHTML = '';

    historialTickets.forEach(function (t) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = '<strong>#' + t.id + '</strong> — ' + t.asunto + ' <em>(' + t.estado + ', ' + t.fecha + ')</em>';
        lista.appendChild(div);
    });

    abrirModal('historyModal');
});


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 6: CHAT DE ASISTENCIA CON IA
   ───────────────────────────────────────────────────────────── */

let temaChatActivo = 'default';

document.getElementById('startChat').addEventListener('click', function () {
    temaChatActivo = 'default';
    abrirModal('chatModal');
});

// Botones de asistencia rápida por tema
document.querySelectorAll('.btn-assist').forEach(function (boton) {
    boton.addEventListener('click', function () {
        temaChatActivo = boton.dataset.topic;
        abrirModal('chatModal');

        const mensajes = {
            logistica: 'Tengo una consulta sobre logística y rutas marítimas.',
            facturacion: 'Necesito ayuda con facturación y pagos.',
            api: 'Tengo un problema técnico con la API.'
        };

        agregarMensajeChat('user', mensajes[temaChatActivo]);

        setTimeout(function () {
            agregarMensajeChat('bot', respuestasChat[temaChatActivo]);
        }, 800);
    });
});


/**
 * Añade un mensaje al área de chat.
 * @param {string} tipo - 'user' o 'bot'
 * @param {string} texto - Contenido del mensaje
 */
function agregarMensajeChat(tipo, texto) {
    const contenedor = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + tipo;

    const avatar = tipo === 'bot' ? '🤖' : '👤';
    div.innerHTML = '<span class="chat-avatar">' + avatar + '</span><p>' + texto + '</p>';

    contenedor.appendChild(div);
    contenedor.scrollTop = contenedor.scrollHeight;
}


document.getElementById('chatForm').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const input = document.getElementById('chatInput');
    const mensaje = input.value.trim();

    if (!mensaje) return;

    agregarMensajeChat('user', mensaje);
    input.value = '';

    // Simulamos respuesta de la IA después de 1 segundo
    setTimeout(function () {
        let respuesta = respuestasChat.default;

        if (mensaje.toLowerCase().includes('factur') || mensaje.toLowerCase().includes('pago')) {
            respuesta = respuestasChat.facturacion;
        } else if (mensaje.toLowerCase().includes('api') || mensaje.toLowerCase().includes('técnico')) {
            respuesta = respuestasChat.api;
        } else if (mensaje.toLowerCase().includes('ruta') || mensaje.toLowerCase().includes('logíst')) {
            respuesta = respuestasChat.logistica;
        }

        agregarMensajeChat('bot', respuesta);
    }, 1000);
});


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 7: CENTRO DE AYUDA (FAQ)
   ───────────────────────────────────────────────────────────── */

function renderizarFAQ() {
    const lista = document.getElementById('faqList');
    lista.innerHTML = '';

    faqData.forEach(function (faq, indice) {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML =
            '<button type="button" class="faq-question">' + faq.pregunta + ' <span>+</span></button>' +
            '<div class="faq-answer">' + faq.respuesta + '</div>';

        div.querySelector('.faq-question').addEventListener('click', function () {
            div.classList.toggle('open');
        });

        lista.appendChild(div);
    });
}


document.getElementById('openHelpCenter').addEventListener('click', function () {
    const contenedor = document.getElementById('helpGuides');
    contenedor.innerHTML = '';

    guiasUso.forEach(function (guia) {
        const div = document.createElement('div');
        div.className = 'help-guide';
        div.innerHTML = '<h4>' + guia.titulo + '</h4><p>' + guia.descripcion + '</p>';
        contenedor.appendChild(div);
    });

    abrirModal('helpModal');
});

var footerHelp = document.getElementById('footerHelp');
if (footerHelp) {
    footerHelp.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('openHelpCenter').click();
    });
}


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 8: ALERTAS AUTOMÁTICAS POR CORREO
   ───────────────────────────────────────────────────────────── */

document.getElementById('alertForm').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const email = document.getElementById('alertEmail');

    if (!EMAIL_REGEX.test(email.value.trim())) {
        marcarError(email, document.getElementById('alertEmailError'), 'Ingrese un correo válido.');
        return;
    }

    marcarError(email, document.getElementById('alertEmailError'), '');

    const alertas = [];
    if (document.getElementById('alertConfirm').checked) alertas.push('confirmaciones');
    if (document.getElementById('alertChanges').checked) alertas.push('cambios de itinerario');
    if (document.getElementById('alertCancel').checked) alertas.push('cancelaciones');

    mostrarToast('Alertas configuradas para ' + email.value.trim() + ': ' + alertas.join(', '));

    // Simulamos el envío de una notificación de prueba
    notificaciones.unshift({
        id: Date.now(),
        tipo: 'system',
        badge: 'SISTEMA',
        badgeClass: 'badge-system',
        icon: 'system',
        iconEmoji: '📧',
        titulo: 'Alertas por correo activadas',
        descripcion: 'Recibirá notificaciones en ' + email.value.trim() + ' sobre: ' + alertas.join(', ') + '.',
        tiempo: 'Ahora mismo',
        leida: false
    });

    renderizarNotificaciones();
});


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 9: BÚSQUEDA Y ESTADO DEL SISTEMA
   ───────────────────────────────────────────────────────────── */

document.getElementById('searchExpedientes').addEventListener('input', function () {
    renderizarNotificaciones(this.value);
});

// Actualizar timestamp del estado del sistema cada 2 minutos
function actualizarEstadoSistema() {
    document.getElementById('lastUpdate').textContent = 'ACTUALIZADO: HACE UN MOMENTO';

    setTimeout(function () {
        document.getElementById('lastUpdate').textContent = 'ACTUALIZADO: HACE 2 MINUTOS';
    }, 5000);
}

setInterval(actualizarEstadoSistema, 120000);


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 10: MODAL DE LOGIN
   ───────────────────────────────────────────────────────────── */

function mostrarVista(vista) {
    document.querySelectorAll('.modal-view').forEach(function (v) { v.classList.remove('active'); });
    document.getElementById(vista).classList.add('active');
}

document.getElementById('openLogin').addEventListener('click', function () {
    mostrarVista('viewLogin');
    abrirModal('loginModal');
});

document.getElementById('goForgot').addEventListener('click', function () { mostrarVista('viewForgot'); });
document.getElementById('goRegister').addEventListener('click', function () { mostrarVista('viewRegister'); });
document.getElementById('backLogin1').addEventListener('click', function () { mostrarVista('viewLogin'); });
document.getElementById('backLogin2').addEventListener('click', function () { mostrarVista('viewLogin'); });

document.querySelectorAll('[data-close]').forEach(function (btn) {
    btn.addEventListener('click', function () { cerrarModal(btn.dataset.close); });
});

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    cerrarModal('loginModal');
    mostrarToast('Sesión iniciada correctamente.');
});

document.getElementById('btnBell').addEventListener('click', function () {
    document.querySelector('.notif-list').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btnShip').addEventListener('click', function () {
    mostrarToast('Redirigiendo al módulo de envíos...');
});


/* ─────────────────────────────────────────────────────────────
   SECCIÓN 11: INICIALIZACIÓN
   ───────────────────────────────────────────────────────────── */

function inicializar() {
    renderizarNotificaciones();
    renderizarTickets();
    renderizarFAQ();
    actualizarContadores();

    console.log('EG-TRAVEL Módulo 7: Centro de Notificaciones y Soporte iniciado.');
}

inicializar();
