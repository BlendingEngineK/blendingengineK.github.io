// Cargar los sonidos
const hoverSound = new Audio('Whoosh.flac');
const clickSound = new Audio('thud.wav');
const clickSoundLight = new Audio('thudLightMode.wav');
const bonfireSound = new Audio('Hoguera.wav');
const bonfireSoundLight = new Audio('HogueraLightMode.wav');
const backgroundMusic = new Audio('BackgroundMusic.mp3');
const backgroundMusicLight = new Audio('BackgroundMusicLightMode.mp3');

// --- Configuración de Audio ---
const soundEffects = [hoverSound, clickSound, clickSoundLight];

backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;
backgroundMusicLight.loop = true;
backgroundMusicLight.volume = 0.3;

bonfireSound.loop = true;
bonfireSound.volume = 0.15;
bonfireSoundLight.loop = true;
bonfireSoundLight.volume = 0.15;

let isAudioEnabled = true;

// --- Configuración de Partículas ---
const particlesDarkConfig = {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: ["#FFD700", "#DC143C", "#808080"] }, // Amarillo/Dorado, Rojo y Gris
    shape: { type: "circle" },
    opacity: { value: 0.7, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 5, random: true },
    line_linked: { enable: false }, // Asegurarse de que no haya líneas
    move: { enable: true, speed: 1.5, direction: "bottom", random: true, straight: false, out_mode: "out", bounce: false }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
  },
  retina_detect: true
};

const particlesLightConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    shape: {
      type: 'image',
      image: { src: 'snowflake.png', width: 100, height: 100 }
    },
    opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 12, random: true, anim: { enable: false, speed: 4, size_min: 8, sync: false } },
    line_linked: { enable: false },
    move: { enable: true, speed: 2, direction: 'bottom-left', random: false, straight: false, out_mode: 'out', bounce: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 2 } }
  },
  retina_detect: true
};

// --- Funciones ---
function playSound(sound) {
  if (isAudioEnabled) {
    const shortSounds = [hoverSound, clickSound, clickSoundLight];
    if (shortSounds.includes(sound)) {
      const isAnotherSoundInEarlyPlay = shortSounds.some(s => !s.paused && s.currentTime < 2);
      if (isAnotherSoundInEarlyPlay) {
        return;
      }
    }
    soundEffects.forEach(effect => {
      if (effect !== sound) {
        effect.pause();
        effect.currentTime = 0;
      }
    });
    sound.currentTime = 0;
    sound.play();
  }
}

function loadParticles(config) {
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
  particlesJS('particles-js', config);
}


// --- Eventos ---
document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('mouseover', () => playSound(hoverSound));
  element.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      playSound(clickSoundLight);
    } else {
      playSound(clickSound);
    }
  });
});

const audioToggle = document.getElementById('audio-toggle');
if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    isAudioEnabled = !isAudioEnabled;
    if (isAudioEnabled) {
      audioToggle.textContent = "🔊";
      if (document.body.classList.contains('light-mode')) {
        backgroundMusicLight.play();
        bonfireSoundLight.play();
      } else {
        backgroundMusic.play();
        bonfireSound.play();
      }
    }
    else {
      audioToggle.textContent = "🔇";
      backgroundMusic.pause();
      backgroundMusicLight.pause();
      bonfireSound.pause();
      bonfireSoundLight.pause();
    }
  });
}

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      themeToggle.innerHTML = "<i class=\"fas fa-fire-extinguisher\"></i>";
      loadParticles(particlesLightConfig);
      backgroundMusic.pause();
      bonfireSound.pause();
      if (isAudioEnabled) {
        backgroundMusicLight.play();
        bonfireSoundLight.play();
      }
    } else {
      themeToggle.innerHTML = "<i class=\"fas fa-fire\"></i>";
      loadParticles(particlesDarkConfig);
      backgroundMusicLight.pause();
      bonfireSoundLight.pause();
      if (isAudioEnabled) {
        backgroundMusic.play();
        bonfireSound.play();
      }
    }
  });
}

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.addEventListener('DOMContentLoaded', function() {
  // Comprobar el tema actual y cargar las partículas correspondientes
  if (document.body.classList.contains('light-mode')) {
    loadParticles(particlesLightConfig);
  } else {
    loadParticles(particlesDarkConfig);
  }

  // Iniciar música en la primera interacción del usuario
  document.body.addEventListener('click', () => {
    if (isAudioEnabled) {
      if (document.body.classList.contains('light-mode')) {
        backgroundMusicLight.play();
        bonfireSoundLight.play();
      } else {
        backgroundMusic.play();
        bonfireSound.play();
      }
    }
  }, { once: true });
});