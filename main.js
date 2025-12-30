// main.js - CÓDIGO FINAL CON CONTADOR DE 3 SEGUNDOS PERMANENTE POST-MEDIANOCHE

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

    noButton.style.transform = `translate(${newX}px, ${newY}px)`;
    noButton.textContent = '¡No me atraparás!';
}


// --- CONTADOR FINAL DE 3 SEGUNDOS ---
function iniciarCuentaRegresivaFinal() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingTitle = document.getElementById('loadingTitle');
    const countdownTimer = document.getElementById('countdownTimer');
    const countdownMessage = document.getElementById('countdownMessage');
    
    // Si no encontramos la pantalla de carga, salimos
    if (!loadingScreen) {
        // Si la pantalla de carga ya desapareció, pasamos directo a los botones
        document.getElementById('previewScreen').classList.remove('hidden');
        return;
    }

    // Preparamos la pantalla de carga para el contador simple
    loadingTitle.textContent = '¡PREPÁRATE!';
    // Reemplazamos el contador de Horas/Minutos/Segundos con el simple:
    countdownTimer.innerHTML = `<span id="finalCountdown" class="counter-unit" style="font-size: 6em;">3</span>`;
    countdownMessage.textContent = 'La sorpresa se revelará en...';
    
    let contador = 3;
    const finalCountdownSpan = document.getElementById('finalCountdown');

    const intervaloFinal = setInterval(() => {
        contador--;
        if (contador > 0) {
            finalCountdownSpan.textContent = contador;
        } else {
            clearInterval(intervaloFinal);
            // Mostrar la pantalla de bienvenida con los botones
            loadingScreen.classList.add('hidden');
            document.getElementById('previewScreen').classList.remove('hidden');
        }
    }, 1000); 
}


// --- LÓGICA DEL CONTADOR DE TIEMPO REAL (SINCRONIZADO A MEDIANOCHE) ---
function iniciarContadorSincronizado() {
    
    const loadingScreen = document.getElementById('loadingScreen');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const countdownMessage = document.getElementById('countdownMessage');

    if (!loadingScreen) return; 

    function actualizarContador() {
        const ahora = new Date();
        const medianoche = new Date();
        
        // Objetivo: Medianoche de HOY/MAÑANA (24:00)
        medianoche.setHours(24, 0, 0, 0); 
        
        let diferenciaMs = medianoche.getTime() - ahora.getTime();
        
        // --- LÓGICA CORREGIDA PARA ACCESO PERMANENTE DESPUÉS DE 1 AM ---
        // La página siempre debe abrirse (con el mini-reset) si:
        // 1. El contador acaba de llegar a cero (diferenciaMs <= 0).
        // 2. O si ya es después de la 1:00 AM (ahora.getHours() >= 1).
        if (diferenciaMs <= 0 || ahora.getHours() >= 1) { 
            clearInterval(intervalo);
            iniciarCuentaRegresivaFinal(); 
            return;
        }

        // 3. Conversión de milisegundos a tiempo (Solo si AÚN NO es medianoche)
        const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
        diferenciaMs -= horas * 1000 * 60 * 60;
        
        const minutos = Math.floor(diferenciaMs / (1000 * 60));
        diferenciaMs -= minutos * 1000 * 60;
        
        const segundos = Math.floor(diferenciaMs / 1000);

        // 4. Formatear y mostrar (solo si los elementos existen, para evitar errores)
        if (hoursSpan && minutesSpan && secondsSpan) {
            hoursSpan.textContent = horas.toString().padStart(2, '0');
            minutesSpan.textContent = minutos.toString().padStart(2, '0');
            secondsSpan.textContent = segundos.toString().padStart(2, '0');
        }
        
        if (countdownMessage) {
            countdownMessage.textContent = `¡Faltan solo ${horas} horas para que empiece el día!`;
        }
    }

    // Actualizar el contador y luego cada segundo
    actualizarContador();
    const intervalo = setInterval(actualizarContador, 1000);
}


// --- LÓGICA DE PAUSA/PLAY ---
function manejarAudio() {
    const audio = document.getElementById('audioFondo');
    const playPauseButton = document.getElementById('playPauseButton');
    
    if (!audio || !playPauseButton) return; // Evitar errores si no existen

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

    // INICIA EL CONTADOR DE TIEMPO REAL APENAS CARGA LA PÁGINA
    iniciarContadorSincronizado();

    // --- 1. LÓGICA DEL BOTÓN "SÍ" ---
    if(yesButton) yesButton.addEventListener('click', mostrarContenidoPrincipal);
    
    // --- 2. LÓGICA DEL BOTÓN "NO" ---
    if(noButton) noButton.addEventListener('click', esquivarBoton);
    
    // --- 3. LÓGICA DEL BOTÓN PAUSA/PLAY ---
    if(playPauseButton) playPauseButton.addEventListener('click', manejarAudio);
});
