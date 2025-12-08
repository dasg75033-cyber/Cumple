// main.js - CÓDIGO FINAL CON BOTÓN ESQUIVO QUE RESPONDE AL CLICK (Móviles y PC)

function dispararConfeti(spread, ticks) {
    // Función de confeti
    confetti({
        origin: { y: 0.6 }, 
        spread: spread,
        ticks: ticks,
        zIndex: 9999,
        shapes: ['circle', 'square', 'star', 'heart'], 
        colors: ['#e91e63', '#8bc34a', '#00bcd4', '#ffeb3b'] 
    });
}

function iniciarPagina() {
    // 1. Oculta la pantalla de preview y muestra el contenido principal
    document.getElementById('previewScreen').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');

    // 2. Lógica del Saludo Dinámico
    const hora = new Date().getHours();
    let saludo;

    if (hora >= 5 && hora < 12) {
        saludo = "☀️ ¡Buenos Días, Cumpleañero(a)!";
    } else if (hora >= 12 && hora < 19) {
        saludo = "🎈 ¡Feliz Tarde, Es Hora del Pastel! 🎂";
    } else {
        saludo = "✨ ¡Feliz Noche de Celebración! 🎉";
    }

    const tituloH1 = document.querySelector('#mainContent h1');
    if (tituloH1) {
        tituloH1.textContent = saludo;
    }
    
    // 3. Dispara un confeti inicial al mostrar la página
    dispararConfeti(180, 100); 
}


document.addEventListener('DOMContentLoaded', () => {
    
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    
    // --- 1. LÓGICA DEL BOTÓN "SÍ" (Muestra la página) ---
    yesButton.addEventListener('click', iniciarPagina);
    
    // --- 2. LÓGICA DEL BOTÓN "NO" (Botón Esquivo - Ahora responde al click/toque) ---
    
    // CAMBIO CLAVE AQUÍ: Usamos 'click' en lugar de 'mouseenter'
    noButton.addEventListener('click', (event) => {
        // Detener el comportamiento predeterminado del botón (evitar submits, aunque no aplica aquí)
        event.preventDefault(); 

        // Coordenadas del movimiento, limitadas a un área de 300x300px
        const maxMovement = 300; 
        
        const newX = Math.random() * maxMovement - (maxMovement / 2);
        const newY = Math.random() * maxMovement - (maxMovement / 2);

        // Aplica la transformación para mover el botón
        noButton.style.transform = `translate(${newX}px, ${newY}px)`;
        
        // Cambiar el texto para agregar drama (¡se queda en esta posición y texto!)
        noButton.textContent = '¡No me atraparás!';
    });
    
    // --- 3. LÓGICA ORIGINAL DEL AUDIO ---
    const audio = document.getElementById('audioFondo');
    const botonAudio = document.getElementById('botonAudio');
    
    if(botonAudio) {
        botonAudio.addEventListener('click', () => {
            audio.play()
                .then(() => {
                    botonAudio.style.display = 'none';
                    setTimeout(() => {
                        dispararConfeti(60, 300); 
                    }, 0);
                })
                .catch(error => {
                    console.error("Error al iniciar la música:", error);
                });
        });
    }
});
