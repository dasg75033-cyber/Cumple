// main.js - CÓDIGO FINAL CON SALUDO DINÁMICO Y CONFETI

// Función para disparar el confeti
function dispararConfeti(spread, ticks) {
    confetti({
        // El confeti sale del centro superior de la pantalla
        origin: { y: 0.6 }, 
        spread: spread,
        ticks: ticks, // Duración de la animación
        zIndex: 9999,
        // Usamos colores de tu paleta final
        shapes: ['circle', 'square', 'star', 'heart'], 
        colors: ['#e91e63', '#8bc34a', '#00bcd4', '#ffeb3b'] 
    });
}


document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE SALUDO DINÁMICO ---
    const hora = new Date().getHours();
    let saludo;

    if (hora >= 5 && hora < 12) {
        saludo = "☀️ ¡Buenos Días, Cumpleañero(a)!";
    } else if (hora >= 12 && hora < 19) {
        saludo = "🎈 ¡Feliz Tarde, Es Hora del Pastel! 🎂";
    } else {
        saludo = "✨ ¡Feliz Noche de Celebración! 🎉";
    }

    const tituloH1 = document.querySelector('h1');
    if (tituloH1) {
        tituloH1.textContent = saludo;
    }
    
    // --- CONFETI AL CARGAR LA PÁGINA ---
    // Dispara un confeti inicial grande y corto
    dispararConfeti(180, 100); 


    // --- LÓGICA DE AUDIO Y BOTÓN ---
    const audio = document.getElementById('audioFondo');
    const boton = document.getElementById('botonAudio');
    
    boton.addEventListener('click', () => {
        // 1. Iniciar la música
        audio.play()
            .then(() => {
                boton.style.display = 'none';
                
                // 2. Disparar confeti de fiesta al hacer clic (más duradero)
                setTimeout(() => {
                    dispararConfeti(60, 300); 
                }, 0);
            })
            .catch(error => {
                // Mensaje en caso de error de audio
                console.error("Error al iniciar la música:", error);
            });
    });
});