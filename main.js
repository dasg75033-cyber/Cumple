// main.js - CÓDIGO FINAL CON CONTADOR SINCRONIZADO AL 30 DE DICIEMBRE DE 2026

// --- LÓGICA DEL CONFETI Y FUNCIONES DE INICIO ---

function dispararConfeti(spread, ticks) {
    confetti({
        origin: { y: 0.6 }, 
        spread: spread,
        ticks: ticks,
        zIndex: 9999,
        shapes: ['circle', 'square', 'star', 'heart'], 
        colors: ['#e91e63', '#8bc34a', '#00bcd4', '#ffeb3b'] 
    });
}

function mostrarContenidoPrincipal() {
    // Oculta la pantalla de preview y muestra el contenido principal
    document.getElementById('previewScreen').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');

    // Lógica del Saludo Dinámico (Buenos Días/Tardes/Noches)
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
    
    // Dispara un confeti inicial
    dispararConfeti(180, 100); 
}

function esquivarBoton(event) {
    event.preventDefault(); 
    
    const noButton = document.getElementById('noButton');
    const maxMovement = 300; 
    
    const newX = Math.random() * maxMovement - (maxMovement / 2);
    const newY = Math.random() * maxMovement - (maxMovement / 2);

    if(noButton) {
        noButton.style.transform = `translate(${newX}px, ${newY}px)`;
        noButton.textContent = '¡No me atraparás!';
    }
}


// --- LÓGICA DEL CONTADOR SINCRONIZADO A FECHA FIJA ---
function iniciarContadorAFechaFija() {
    
    // Establecemos la fecha objetivo: 30 de Diciembre de 2026 a medianoche
    const TARGET_DATE = new Date('2026-12-30T00:00:00'); 
    let intervalo; 
    
    const loadingScreen = document.getElementById('loadingScreen');
    const daysSpan = document.getElementById('days'); 
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const countdownTitle = document.getElementById('loadingTitle');
    const countdownMessage = document.getElementById('countdownMessage');


    if (!loadingScreen || !daysSpan || !hoursSpan || !minutesSpan || !secondsSpan) {
        return; 
    }

    function actualizarContador() {
        const ahora = new Date();
        let diferenciaMs = TARGET_DATE.getTime() - ahora.getTime();
        
        // --- LÓGICA DE DESBLOQUEO ---
        if (diferenciaMs <= 0) { 
            // Si la fecha objetivo ya pasó, desactivamos el contador y mostramos la pantalla de bienvenida.
            clearInterval(intervalo);
            loadingScreen.classList.add('hidden');
            const preview = document.getElementById('previewScreen');
            if (preview) preview.classList.remove('hidden');
            return;
        }

        // 3. Conversión de milisegundos a Días, Horas, Minutos, Segundos
        const SEGUNDO = 1000;
        const MINUTO = SEGUNDO * 60;
        const HORA = MINUTO * 60;
        const DIA = HORA * 24;
        
        const dias = Math.floor(diferenciaMs / DIA);
        diferenciaMs -= dias * DIA;
        
        const horas = Math.floor(diferenciaMs / HORA);
        diferenciaMs -= horas * HORA;
        
        const minutos = Math.floor(diferenciaMs / MINUTO);
        diferenciaMs -= minutos * MINUTO;
        
        const segundos = Math.floor(diferenciaMs / SEGUNDO);

        // 4. Formatear y mostrar 
        daysSpan.textContent = dias.toString().padStart(2, '0');
        hoursSpan.textContent = horas.toString().padStart(2, '0');
        minutesSpan.textContent = minutos.toString().padStart(2, '0');
        secondsSpan.textContent = segundos.toString().padStart(2, '0');
        
        // Actualizar el mensaje con el número de días
        if (countdownTitle) {
            countdownTitle.textContent = `¡Faltan solo ${dias} días!`;
        }
    }

    // Actualizar el contador y luego cada segundo
    actualizarContador();
    intervalo = setInterval(actualizarContador, 1000);
}


// --- LÓGICA DE PAUSA/PLAY ---
function manejarAudio() {
    const audio = document.getElementById('audioFondo');
    const playPauseButton = document.getElementById('playPauseButton');
    
    if (!audio || !playPauseButton) return; 

    if (audio.paused) {
        audio.play()
            .then(() => {
                playPauseButton.innerHTML = '⏸️ Pausar Música';
                if (!audio.confettiFired) {
                    dispararConfeti(60, 300); 
                    audio.confettiFired = true; 
                }
            })
            .catch(error => {
                console.error("Error al iniciar la música:", error);
                playPauseButton.innerHTML = '▶️ Intentar Reproducir';
            });
    } else {
        audio.pause();
        playPauseButton.innerHTML = '▶️ Reanudar Música';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const playPauseButton = document.getElementById('playPauseButton');

    // INICIA EL CONTADOR DE FECHA FIJA
    iniciarContadorAFechaFija();

    // --- 1. LÓGICA DEL BOTÓN "SÍ" ---
    if(yesButton) yesButton.addEventListener('click', mostrarContenidoPrincipal);
    
    // --- 2. LÓGICA DEL BOTÓN "NO" ---
    if(noButton) noButton.addEventListener('click', esquivarBoton);
    
    // --- 3. LÓGICA DEL BOTÓN PAUSA/PLAY ---
    if(playPauseButton) playPauseButton.addEventListener('click', manejarAudio);
});
