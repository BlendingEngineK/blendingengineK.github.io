// Cargar los sonidos
const hoverSound = new Audio('Whoosh.flac');
const clickSound = new Audio('thud.wav');
const bonfireSound = new Audio('Hoguera.wav');
const backgroundMusic = new Audio('BackgroundMusic.mp3');
backgroundMusic.loop = true; // La música de fondo se reproduce en bucle
backgroundMusic.volume = 0.3; // Ajustar el volumen de la música de fondo

// Función para reproducir un sonido
function playSound(sound) {
  sound.currentTime = 0; // Reiniciar el sonido si ya se está reproduciendo
  sound.play();
}

// Añadir eventos de sonido a enlaces y botones
document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('mouseover', () => playSound(hoverSound));
  element.addEventListener('click', () => playSound(clickSound));
});

// Toggle modo claro / oscuro
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      themeToggle.textContent = "🌞";
      backgroundMusic.pause(); // Pausar la música en modo claro
      backgroundMusic.currentTime = 0; // Reiniciar la música
    } else {
      themeToggle.textContent = "🌙";
      playSound(bonfireSound); // Sonido de hoguera al activar modo oscuro
      backgroundMusic.play(); // Reproducir música en modo oscuro
    }
  });
}


// Configuración de particles.js
particlesJS('particles-js', {
    particles: {
      number: {
        value: 100, // Más partículas para un efecto más denso
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#DC143C", "#FFD700", "#808080"] // Rojo (pétalo), Dorado (chispa), Gris (ceniza)
      },
      shape: {
        type: "circle", // Círculos para simular pétalos/cenizas
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 }
      },
      opacity: {
        value: 0.7, // Opacidad inicial más alta
        random: true, // Opacidad inicial aleatoria
        anim: {
          enable: true, // Habilitar animación de opacidad para desvanecimiento
          speed: 1, // Velocidad de desvanecimiento
          opacity_min: 0.1, // Opacidad mínima al desvanecerse
          sync: false
        }
      },
      size: {
        value: 5, // Tamaño de las partículas
        random: true, // Tamaños variados
        anim: {
          enable: false // Sin animación de tamaño
        }
      },
      line_linked: {
        enable: false // Sin líneas de unión para pétalos/cenizas
      },
      move: {
        enable: true,
        speed: 1.5, // Velocidad de caída más lenta
        direction: "bottom", // Caer hacia abajo
        random: true, // Movimiento horizontal aleatorio
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" }, // Mantener repulsión al pasar el ratón
        onclick: { enable: true, mode: "push" } // Mantener empuje al hacer clic
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });  


const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});