// Cargar los sonidos
const hoverSound = new Audio('Whoosh.flac');
const clickSound = new Audio('thud.wav');
const bonfireSound = new Audio('Hoguera.wav');
const backgroundMusic = new Audio('BackgroundMusic.mp3');
backgroundMusic.loop = true; // La música de fondo se reproduce en bucle
backgroundMusic.volume = 0.3; // Ajustar el volumen de la música de fondo

let isAudioEnabled = true; // Estado inicial del audio

// Función para reproducir un sonido
function playSound(sound) {
  if (isAudioEnabled) {
    sound.currentTime = 0; // Reiniciar el sonido si ya se está reproduciendo
    sound.play();
  }
}

// Añadir eventos de sonido a enlaces y botones
document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('mouseover', () => playSound(hoverSound));
  element.addEventListener('click', () => playSound(clickSound));
});

// Control de Audio
const audioToggle = document.getElementById('audio-toggle');

if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    isAudioEnabled = !isAudioEnabled; // Alternar el estado del audio
    if (isAudioEnabled) {
      audioToggle.textContent = "🔊"; // Icono de altavoz activado
      // Si la música de fondo estaba reproduciéndose en modo oscuro, reanudarla
      if (!document.body.classList.contains('light-mode')) {
        backgroundMusic.play();
      }
    } else {
      audioToggle.textContent = "🔇"; // Icono de altavoz silenciado
      backgroundMusic.pause(); // Pausar la música de fondo
    }
  });
}

// Toggle modo claro / oscuro
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      themeToggle.innerHTML = "<i class=\"fas fa-fire-extinguisher\"></i>"; // Icono de extintor para modo día
      backgroundMusic.pause(); // Pausar la música en modo claro
      backgroundMusic.currentTime = 0; // Reiniciar la música
    } else {
      themeToggle.innerHTML = "<i class=\"fas fa-fire\"></i>"; // Icono de fuego para modo noche
      if (isAudioEnabled) { // Solo reproducir si el audio está activado
        playSound(bonfireSound); // Sonido de hoguera al activar modo oscuro
        backgroundMusic.play(); // Reproducir música en modo oscuro
      }
    }
  });
}


document.addEventListener('DOMContentLoaded', function() {
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
          value: ["#DC143C", "#FFD700", "#dddddd"] // Rojo (pétalo), Dorado (chispa), Gris (ceniza)
        },
        shape: {
          type: "char", // Usar caracteres como forma
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          character: {
            value: "▚▞▙▟▰▱▲▼◆◇◈◉◎●◦", // Caracteres que evocan formas rúnicas/abstractas
            font: "Verdana", // Una fuente común que soporte estos caracteres
            style: "",
            weight: "400"
          }
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
});  


const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Observador para animaciones de sección
const sections = document.querySelectorAll('section');

const observerOptions = {
  root: null, // El viewport
  rootMargin: '0px',
  threshold: 0.1 // Cuando el 10% de la sección es visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Opcional: para que desaparezca al salir de pantalla
      // entry.target.classList.remove('visible');
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Efecto Glitch en Hover
const glitchElements = document.querySelectorAll('.photo, h1, h2, a');

glichElements.forEach(element => {
  // Para elementos de texto, guarda el texto original en un atributo data-text
  if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'A') {
    element.setAttribute('data-text', element.textContent);
  }

  element.addEventListener('mouseover', () => {
    element.classList.add('glitch-effect');
  });

  element.addEventListener('mouseout', () => {
    element.classList.remove('glitch-effect');
  });
});