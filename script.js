// Cargar los sonidos
const hoverSound = new Audio('Whoosh.flac');
const clickSound = new Audio('thud.wav');
const clickSoundLight = new Audio('thudLightMode.wav');
const bonfireSound = new Audio('Hoguera.wav');
const bonfireSoundLight = new Audio('HogueraLightMode.wav');
const backgroundMusic = new Audio('BackgroundMusic.mp3');
const backgroundMusicLight = new Audio('BackgroundMusicLightMode.mp3');
const katanaSlashSound = new Audio('katana-slash.wav');

// --- Configuración de Audio ---
const soundEffects = [hoverSound, clickSound, clickSoundLight, katanaSlashSound];

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
      image: { src: 'images/snowflake.png', width: 100, height: 100 }
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
  console.log('loadParticles called with config:', config);
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
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      const snowflakeImages = ['images/snowflake.png', 'images/snowflake2.png', 'images/snowflake3.png'];
      const randomIndex = Math.floor(Math.random() * snowflakeImages.length);
      const currentParticlesLightConfig = JSON.parse(JSON.stringify(particlesLightConfig)); // Deep copy
      currentParticlesLightConfig.particles.shape.image.src = snowflakeImages[randomIndex];
      loadParticles(currentParticlesLightConfig);
      backgroundMusic.pause();
      bonfireSound.pause();
      if (isAudioEnabled) {
        backgroundMusicLight.play();
        bonfireSoundLight.play();
      }
    } else {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
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

  // Video Pop-up functionality
  const videoPopup = document.getElementById('video-popup');
  const closeButton = document.querySelector('.video-popup .close-button');
  const projectVideo = document.getElementById('project-video');
  const comingSoonGlitch = document.getElementById('coming-soon-glitch');
  const projectPlayIcons = document.querySelectorAll('.project-play-icon');
  const profilePhoto = document.querySelector('.photo[data-project-id="profile"]');
  
  const clickableElements = [...projectPlayIcons, profilePhoto];

  clickableElements.forEach(element => {
    element.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent parent click events
      const projectId = element.closest('[data-project-id]').dataset.projectId;

      if (projectId === 'oh-my-gods') {
        projectVideo.style.display = 'none';
        comingSoonGlitch.style.display = 'flex';
        startGlitchAnimation();
      } else {
        projectVideo.style.display = 'block';
        comingSoonGlitch.style.display = 'none';
        stopGlitchAnimation();
        let videoFileName;
        if (projectId === 'cyber-runner') {
          videoFileName = 'Cyber Runner.mp4';
        } else if (projectId === 'endless-season') {
          videoFileName = 'Endless Season.mp4';
        } else if (projectId === 'experiment-ia') {
          videoFileName = 'ExperimentIA.mp4';
        } else if (projectId === 'profile') {
            videoFileName = 'Perfil.mp4';
        }
        projectVideo.src = `videos/${videoFileName}`;
        projectVideo.load();
        projectVideo.play();
      }
      videoPopup.classList.add('show');
    });
  });

  // Profile video preview on hover
  const profileImg = document.getElementById('profile-img');
  const profileVideoPreview = document.getElementById('profile-video-preview');

  if (profilePhoto && profileImg && profileVideoPreview) {
    profilePhoto.addEventListener('mouseenter', () => {
      profileImg.style.display = 'none';
      profileVideoPreview.style.display = 'block';
      profileVideoPreview.play();
    });

    profilePhoto.addEventListener('mouseleave', () => {
      profileVideoPreview.pause();
      profileVideoPreview.currentTime = 0;
      profileVideoPreview.style.display = 'none';
      profileImg.style.display = 'block';
    });
  }

  closeButton.addEventListener('click', () => {
    videoPopup.classList.remove('show');
    projectVideo.pause();
    projectVideo.currentTime = 0;
    stopGlitchAnimation();
  });

  videoPopup.addEventListener('click', (event) => {
    if (event.target === videoPopup) {
      videoPopup.classList.remove('show');
      projectVideo.pause();
      projectVideo.currentTime = 0;
      stopGlitchAnimation();
    }
  });

  // Glitch animation for "Próximamente"
  function startGlitchAnimation() {
    // No movement logic needed here, CSS will handle glitch and pulse
  }

  function stopGlitchAnimation() {
    // No movement logic needed here
  }

  // --- Gamification ---
  const achievements = {
    'sobre-mi': 'Mundo Descubierto: Has iniciado tu viaje.',
    'experiencia': 'Forjador de Leyendas: Has visto los proyectos destacados.',
    'educacion': 'Maestro del Conocimiento: Has consultado la formación.',
    'habilidades': 'Arsenal Desbloqueado: Has inspeccionado las competencias.',
    'idiomas': 'Políglota: Has comprobado los idiomas dominados.'
  };

  const unlockedAchievements = new Set();
  const totalAchievements = Object.keys(achievements).length;
  const toastContainer = document.getElementById('toast-container');
  const achievementPopup = document.getElementById('achievement-popup');
  const achievementPopupClose = achievementPopup.querySelector('.close-button');

  function createToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `🏆 ${message}`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 5000); // El toast desaparece después de 5 segundos
  }

  function showFinalAchievement() {
    achievementPopup.classList.add('show');
  }

  achievementPopupClose.addEventListener('click', () => {
    achievementPopup.classList.remove('show');
  });

  achievementPopup.addEventListener('click', (event) => {
    if (event.target === achievementPopup) {
      achievementPopup.classList.remove('show');
    }
  });

  const achievementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (achievements[sectionId] && !unlockedAchievements.has(sectionId)) {
          unlockedAchievements.add(sectionId);
          createToast(achievements[sectionId]);
          observer.unobserve(entry.target); // Dejar de observar una vez desbloqueado

          if (unlockedAchievements.size === totalAchievements) {
            // Esperar un poco antes de mostrar el pop-up final
            setTimeout(showFinalAchievement, 2000);
          }
        }
      }
    });
  }, { threshold: 0.5 }); // Se activa cuando el 50% de la sección es visible

  // Observar todas las secciones con logros
  Object.keys(achievements).forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      achievementObserver.observe(section);
    }
  });

  // --- Interacción de Elige tu Filo ---
  const katanaItemsFinal = document.querySelectorAll('.katana-item');
  const quoteContainer = document.getElementById('quote-container');
  const quoteTextFinal = document.getElementById('language-quote-text');

  const quotesFinal = {
    es: 'El lenguaje es la hoja del entendimiento.',
    en: 'Language is the blade of understanding.'
  };

  katanaItemsFinal.forEach(item => {
    item.addEventListener('mouseover', () => {
      playSound(hoverSound);
    });

    item.addEventListener('click', () => {
      const lang = item.dataset.lang;
      
      // Poner la frase correcta
      quoteTextFinal.textContent = quotesFinal[lang];
      
      // Mostrar el contenedor de la frase
      quoteContainer.classList.add('active');
      
      // Reproducir sonido de corte
      playSound(katanaSlashSound);

      // Opcional: ocultar la frase después de un tiempo
      setTimeout(() => {
        quoteContainer.classList.remove('active');
      }, 4000); // La frase desaparece después de 4 segundos
    });
  });
});