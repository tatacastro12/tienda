// Ejecutar el código una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    let cars = document.querySelectorAll(".car"); // Selecciona todos los botones de "Añadir al carrito"
    let prod_car = document.querySelector('.prod'); // Selecciona el contenedor donde se mostrarán los productos en el carrito
    let contador = document.querySelector('.contador'); // Selecciona el contador que muestra el número de productos en el carrito
    let totalElement = document.getElementById('total'); // Selecciona el elemento que muestra el total del carrito
    let send = document.querySelector('.btn-primary'); // Selecciona el botón de "Enviar pedido"
    let info = []; // Array para almacenar la información de los productos añadidos al carrito
    let cantidad = 0; // Variable para contar el número total de productos en el carrito
    let total = 0; // Variable para almacenar el total del precio de los productos en el carrito

    // Añadir evento de clic a cada botón de "Añadir al carrito"
    cars.forEach(car => {
        car.addEventListener("click", () => {
            let nombreProducto = car.parentNode.querySelector('.top_name').textContent; // Obtiene el nombre del producto
            let precioProducto = parseFloat(car.parentNode.querySelector('.price').textContent); // Obtiene el precio del producto
            let cantidadProducto = car.parentNode.querySelector('input[type="number"]').value; // Obtiene la cantidad del producto ingresada por el usuario

            if (parseInt(cantidadProducto) > 0) { // Verifica que la cantidad sea mayor a 0
                cantidad += parseInt(cantidadProducto); // Incrementa la cantidad total de productos en el carrito
                contador.textContent = cantidad; // Actualiza el contador visualmente

                // Busca si el producto ya está en el carrito
                let existingProduct = info.find(item => item.nombre === nombreProducto);

                if (existingProduct) {
                    existingProduct.cantidad += parseInt(cantidadProducto); // Si el producto ya está en el carrito, incrementa su cantidad
                } else {
                    // Si el producto no está en el carrito, lo añade al array info
                    info.push({
                        nombre: nombreProducto,
                        precio: precioProducto,
                        cantidad: parseInt(cantidadProducto)
                    });
                }

                actualizarCarrito(); // Actualiza el carrito visualmente
            } else {
                alert("No ingresó cantidad"); // Alerta si la cantidad ingresada es 0 o menor
            }
        });
    });

    // Función para actualizar el carrito visualmente
    function actualizarCarrito() {
        prod_car.innerHTML = ''; // Limpia el contenido actual del carrito
        total = 0;  // Reinicia el total antes de recalcular
        info.forEach((item, index) => {
            total += item.precio * item.cantidad;  // Calcula el total sumando el precio por la cantidad de cada producto
            // Añade el producto al carrito visualmente
            prod_car.innerHTML += `
                <div class="producto-carrito">
                    <p class="list_prod">${item.nombre}</p>
                    <p class="list_prod">${item.precio.toFixed(2)}</p>
                    <p class="list_prod">${item.cantidad}</p>
                    <div>
                        <button class="delete btn btn-danger" data-index="${index}">-</button>
                        <button class="more btn btn-success" data-index="${index}">+</button>
                    </div>
                </div>
            `;
        });
        totalElement.textContent = total.toFixed(2);  // Actualiza el total en el DOM
        actualizarBotones(); // Añade los eventos de los botones de eliminar y añadir cantidad
    }

    // Función para añadir eventos a los botones de eliminar y añadir cantidad
    function actualizarBotones() {
        let botonesEliminar = document.querySelectorAll('.delete'); // Selecciona todos los botones de eliminar
        let botonesAumentar = document.querySelectorAll('.more'); // Selecciona todos los botones de añadir cantidad

        // Añade evento de clic a cada botón de eliminar
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                let index = boton.getAttribute('data-index'); // Obtiene el índice del producto en el array info
                let item = info[index]; // Obtiene el producto del array info
                if (item.cantidad > 0) { // Verifica que la cantidad del producto sea mayor a 0
                    cantidad -= 1; // Decrementa la cantidad total de productos en el carrito
                    item.cantidad -= 1; // Decrementa la cantidad del producto específico
                    if (item.cantidad === 0) {
                        info.splice(index, 1); // Si la cantidad del producto es 0, lo elimina del array info
                    }
                    contador.textContent = cantidad; // Actualiza el contador visualmente
                    actualizarCarrito(); // Actualiza el carrito visualmente
                }
            });
        });

        // Añade evento de clic a cada botón de añadir cantidad
        botonesAumentar.forEach(boton => {
            boton.addEventListener('click', () => {
                let index = boton.getAttribute('data-index'); // Obtiene el índice del producto en el array info
                let item = info[index]; // Obtiene el producto del array info
                cantidad += 1; // Incrementa la cantidad total de productos en el carrito
                item.cantidad += 1; // Incrementa la cantidad del producto específico
                contador.textContent = cantidad; // Actualiza el contador visualmente
                actualizarCarrito(); // Actualiza el carrito visualmente
            });
        });
    }

    // Evento de clic para enviar el pedido a WhatsApp
    send.addEventListener('click', () => {
        // Crear el mensaje del pedido
        let mensaje = 'Hola, me gustaría ordenar:\n';
        info.forEach(item => {
            mensaje += `${item.cantidad} x ${item.nombre} (${item.precio.toFixed(2)})\n`; // Añade cada producto al mensaje
        });
        mensaje += `Total: ${total.toFixed(2)}`; // Añade el total al mensaje

        // Mostrar un resumen del pedido para que el usuario confirme los cambios
        if (confirm(`¿Estás seguro de enviar este pedido?\n\n${mensaje}`)) {
            // Si el usuario confirma, procede a enviar el pedido a WhatsApp
            let numeroWhatsApp = '1234567890'; // Reemplaza '1234567890' con tu número de WhatsApp
            let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`; // Crea la URL para enviar el mensaje a WhatsApp
            window.open(url, '_blank'); // Abre la URL en una nueva pestaña
            alert(`Pedido enviado a WhatsApp: \n${mensaje}`);
        }
    });
});
