document.addEventListener('DOMContentLoaded', () => {
    const carrusel = document.querySelector('.carrusel-proyectos');
    const cards = document.querySelectorAll('.card-proyecto');
    const prevBtn = document.querySelector('.flecha.izquierda');
    const nextBtn = document.querySelector('.flecha.derecha');

    let currentRotation = 0;
    let autoRotateInterval;
    const cardCount = cards.length;
    const cardAngle = 360 / cardCount;
    
    // Calcula el radio para que las tarjetas se coloquen correctamente en el círculo
    const cardWidth = 260; // Ancho de la tarjeta en CSS
    const radius = Math.round(cardWidth / (2 * Math.tan(Math.PI / cardCount))) + 50; 
    
    // Posiciona cada tarjeta en el círculo
    cards.forEach((card, index) => {
        card.style.transform = `rotateY(${index * cardAngle}deg) translateZ(${radius}px)`;
    });

    // Función para rotar el carrusel
    const rotateCarousel = () => {
        carrusel.style.transform = `rotateY(${currentRotation}deg)`;
    };

    // Funciones de control de la rotación automática
    const startAutoRotate = () => {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => {
            currentRotation -= cardAngle;
            rotateCarousel();
        }, 3000);
    };

    const stopAutoRotate = () => {
        clearInterval(autoRotateInterval);
    };

    // Eventos para las flechas de navegación
    prevBtn.addEventListener('click', () => {
        currentRotation += cardAngle;
        rotateCarousel();
        stopAutoRotate();
        startAutoRotate();
    });

    nextBtn.addEventListener('click', () => {
        currentRotation -= cardAngle;
        rotateCarousel();
        stopAutoRotate();
        startAutoRotate();
    });

    // Eventos para cada tarjeta
    cards.forEach(card => {
        // Detener carrusel al pasar el cursor
        card.addEventListener('mouseenter', () => {
            stopAutoRotate();
        });

        // Reanudar carrusel al quitar el cursor
        card.addEventListener('mouseleave', () => {
            startAutoRotate();
        });

        // Voltear la tarjeta al hacer clic
        card.addEventListener('click', () => {
            card.classList.toggle('flip');
        });
    });

    // Inicia la rotación automática al cargar la página
    startAutoRotate();
});