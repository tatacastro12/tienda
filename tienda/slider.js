document.addEventListener("DOMContentLoaded", function () {
    // Espera a que el DOM esté completamente cargado
    let currentIndex = 0; // Índice de la imagen actual
    const images = document.querySelectorAll(".slider img"); // Obtiene todas las imágenes del slider
    const totalImages = images.length; // Número total de imágenes
    const pagination = document.querySelector(".pagination"); // Contenedor del paginado
    let intervalId; // Almacena el ID del intervalo

    // Crea los números de página
    for (let i = 0; i < totalImages; i++) {
        const pageNumber = document.createElement("span");
        pageNumber.textContent = i + 1;
        pageNumber.dataset.index = i;
        pagination.appendChild(pageNumber);
    }

    // Muestra la primera imagen y activa la primera página
    showSlide(currentIndex);
    pagination.children[currentIndex].classList.add("active");

    // Función para avanzar al siguiente slide
    function nextSlide() {
        images[currentIndex].style.display = "none"; // Oculta la imagen actual
        currentIndex = (currentIndex + 1) % totalImages; // Calcula el índice de la siguiente imagen
        showSlide(currentIndex); // Muestra la siguiente imagen
        updatePagination(currentIndex); // Actualiza el paginado
    }

    // Función para mostrar una imagen específica
    function showSlide(index) {
        // Oculta todas las imágenes
        for (let i = 0; i < totalImages; i++) {
            images[i].style.display = "none";
        }
        // Muestra la imagen correspondiente al índice actual
        images[index].style.display = "block";
    }

    // Función para actualizar el paginado
    function updatePagination(index) {
        // Quita la clase 'active' de todos los números de página
        for (let i = 0; i < totalImages; i++) {
            pagination.children[i].classList.remove("active");
        }
        // Añade la clase 'active' al número de página correspondiente
        pagination.children[index].classList.add("active");
    }

    // Manejo de eventos para los números de página
    pagination.addEventListener("click", function (event) {
        if (event.target.tagName === "SPAN") {
            const index = parseInt(event.target.dataset.index);
            showSlide(index);
            updatePagination(index);
            restartInterval(); // Reinicia el intervalo cuando el usuario hace clic en el paginado
        }
    });

    // Función para reiniciar el intervalo de cambio de imagen
    function restartInterval() {
        clearInterval(intervalId); // Limpia el intervalo existente
        intervalId = setInterval(nextSlide, 3000); // Inicia un nuevo intervalo
    }

    // Iniciar el intervalo inicial
    intervalId = setInterval(nextSlide, 3000);
});
