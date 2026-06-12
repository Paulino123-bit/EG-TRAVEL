
/* CATÁLOGO DE RUTAS DESDE JSON  */

// Referencia al tbody donde se insertan las filas del catálogo
const cuerpoCatalogo = document.getElementById('cuerpoCatalogo');



// Extrae todas las rutas del archivo catalogo.json y las muestra en la tabla
const cargarCatalogo = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './JSON/catalogo.json');

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const datos = JSON.parse(xhr.responseText);

            cuerpoCatalogo.innerHTML = '';

            datos.rutas.forEach((ruta) => {
                const fila = document.createElement('tr');

                fila.dataset.search = (
                    ruta.codigo + ' ' +
                    ruta.nombre + ' ' +
                    ruta.puertoOrigen + ' ' +
                    ruta.puertoDestino + ' ' +
                    ruta.distancia + ' ' +
                    ruta.duracion
                ).toLowerCase();

                const celdaCodigo = document.createElement('td');
                celdaCodigo.textContent = ruta.codigo;

                const celdaNombre = document.createElement('td');
                celdaNombre.textContent = ruta.nombre;

                const celdaOrigen = document.createElement('td');
                celdaOrigen.textContent = ruta.puertoOrigen;

                const celdaDestino = document.createElement('td');
                celdaDestino.textContent = ruta.puertoDestino;

                const celdaDistancia = document.createElement('td');
                celdaDistancia.textContent = ruta.distancia;

                const celdaDuracion = document.createElement('td');
                celdaDuracion.textContent = ruta.duracion;

                fila.appendChild(celdaCodigo);
                fila.appendChild(celdaNombre);
                fila.appendChild(celdaOrigen);
                fila.appendChild(celdaDestino);
                fila.appendChild(celdaDistancia);
                fila.appendChild(celdaDuracion);

                cuerpoCatalogo.appendChild(fila);
            });

          
        } else {
            console.error('Error al cargar catalogo.json:', xhr.status);
            mostrarToast('No se pudo cargar el catálogo de rutas.');
        }
    };

    xhr.onerror = () => {
        console.error('Error al cargar catalogo.json:', xhr.statusText);
        mostrarToast('No se pudo cargar el catálogo de rutas.');
    };

    xhr.send();
};




// Carga el catálogo al iniciar la página
cargarCatalogo();

// Busca en el catálogo mientras el usuario escribe
campoBusqueda.addEventListener('input', aplicarBusquedaCatalogo);




