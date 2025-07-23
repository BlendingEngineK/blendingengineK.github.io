console.log("script.js cargado y ejecutándose.");
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

// --- Traducciones ---
const translations = {
  es: {
    pageTitle: "Forjador de mundos. Guerrero del detalle.",
    logoText: " Forjador de mundos. Guerrero del detalle. ",
    navProjects: "🚀 Proyectos Destacados",
    navEducation: "🎓 Educación",
    navSkills: "🛠️ Competencias Digitales",
    navLanguages: "📖 Idiomas",
    heroSubtitle: "Donde termina el código, nace la leyenda.",
    heroLocation: "📍 España",
    aboutTitle: "Sobre mí: Gabriel Huerta",
    aboutP1: "Mi viaje como diseñador de videojuegos nace de una profunda pasión por las historias que nos hacen sentir vivos. Experiencias como las de la saga <em>Souls</em> no solo me enseñaron sobre la superación y la resiliencia, sino que encendieron en mí el deseo de construir mundos que ofrezcan ese mismo nivel de desafío y emoción. Mi objetivo es dar vida a esos mundos que he visualizado, creando refugios e historias que permitan a otros jugadores desconectar y vivir sus propias aventuras.",
    aboutP2New: "Mi identidad profesional, <strong>Blending EngineK</strong>, es un reflejo de mi enfoque técnico y creativo. 'Blending' por mi destreza en <strong>Blender</strong> para el modelado 3D, y 'Engine' porque simboliza mi capacidad para ser el motor que impulsa los proyectos, dominando tanto <strong>Unreal Engine</strong> como <strong>Unity</strong>. La 'K' es un guiño a mis influencias, desde la estética samurái a la mitología nórdica, que inspiran mi búsqueda de un estilo realista y de alta calidad.",
    aboutP3: "Aunque mi foco está en el realismo y en exprimir el potencial de Unreal, también cuento con experiencia práctica en <strong>Unity</strong>, motor con el que he desarrollado tres juegos, lo que me ha dado una base sólida y versátil en el desarrollo. Busco la oportunidad de unirme a un equipo donde pueda aportar mi visión como 'Forjador de mundos' y mi habilidad como 'Guerrero del detalle', para crear no solo videojuegos, sino leyendas.",
    navContribution: "✨ Mi Aportación",
    contributionTitle: "Lo que Aporto a la Forja",
    designerTitle: "<i class=\"fas fa-drafting-compass\"></i> Como Diseñador",
    designerSkill1: "<strong>Visión Creativa y Narrativa:</strong> Convierto ideas en mundos cohesivos y experiencias memorables.",
    designerSkill2: "<strong>Puente entre Disciplinas:</strong> Facilito la comunicación entre arte y programación para asegurar una visión unificada.",
    designerSkill3: "<strong>Enfoque en el Jugador:</strong> Diseño mecánicas y sistemas que priorizan la diversión y el desafío.",
    programmerTitle: "<i class=\"fas fa-code\"></i> Como Programador",
    programmerSkill1: "<strong>Solidez Técnica y Versatilidad:</strong> Domino la lógica de programación en C++ (Unreal) y C# (Unity).",
    programmerSkill2: "<strong>Resolución de Problemas:</strong> Descompongo desafíos complejos en soluciones eficientes y mantenibles.",
    programmerSkill3: "<strong>Cultura de Equipo y Colaboración:</strong> Me integro en equipos ágiles, utilizando Git para un desarrollo limpio y colaborativo.",
    generalTitle: "<i class=\"fas fa-fire\"></i> Generales",
    generalSkill1: "<strong>Pasión y Compromiso:</strong> Mi trabajo es mi vocación, por lo que mi dedicación va más allá de un horario.",
    generalSkill2: "<strong>Amante de las Mecánicas:</strong> Disfruto diseñando y programando sistemas de juego que sean innovadores y divertidos.",
    projectsTitle: "Proyectos Destacados",
    roleLabel: "Rol:",
    engineLabel: "Motor:",
    dateLabel: "Fecha:",
    teamLabel: "Equipo:",
    studioLabel: "Estudio:",
    cyberRunnerRole: " Desarrollador Solitario",
    cyberRunnerResp1: "🔹 Desarrollo completo del prototipo y mecánicas de juego.",
    cyberRunnerResp2: "🔹 Integración de assets de alta calidad de Quixel Megascans para crear un entorno visualmente rico.",
    cyberRunnerResp3: "🔹 Creación de efectos visuales (VFX) avanzados con el sistema Niagara.",
    cyberRunnerResp4: "🔹 Implementación y personalización de personajes realistas utilizando MetaHuman.",
    endlessSeasonResp1: "🔹 Diseño e implementación de una interfaz de usuario (UI) compleja y atractiva.",
    endlessSeasonResp2: "🔹 Programación de paneles de menú interactivos que cambiaban dinámicamente según la estación del año en el juego.",
    endlessSeasonResp3: "🔹 Mi primera experiencia sólida en un proyecto de equipo con Unity.",
    experimentIARole: " Programador de Gameplay y IA",
    experimentIATeam: " Colaboración en Equipo",
    experimentIAResp1: "🔹 Desarrollo de las mecánicas principales para un FPS de estilo 2.5D Pixel Art.",
    experimentIAResp2: "🔹 Programación del comportamiento y la inteligencia artificial (IA) de múltiples tipos de enemigos.",
    experimentIAResp3: "🔹 Diseño e implementación de un jefe final con distintas fases y habilidades de invocación de enemigos.",
    ohMyGodsRole: " Programador de Sistemas y Economía",
    ohMyGodsStudio: " Bug & Play Studio (no oficial)",
    ohMyGodsDate: " Actual",
    ohMyGodsResp1: "🔹 Diseño y desarrollo de un sistema Gacha complejo, inspirado en referentes como *AFK Arena* y *Genshin Impact*.",
    ohMyGodsResp2: "🔹 Implementación de sistema de \"pity\" y banners de temporada para la obtención de personajes.",
    ohMyGodsResp3: "🔹 Creación de la economía del juego, gestionando monedas de pago y gratuitas.",
    ohMyGodsResp4: "🔹 Programación del inventario del jugador, la tienda in-game y los sistemas de progresión de personajes (niveles y estrellas).",
    educationTitle: "Educación",
    degreeTitle: "🎓 Animación 3D, Juegos y Entornos Interactivos (Grado Superior)",
    institutionLabel: "🏢 Centro de estudios:",
    skillsTitle: "Competencias Digitales",
    unrealCardTitle: "Unreal Engine",
    unrealCardDesc: "Experiencia en desarrollo de videojuegos y entornos interactivos.",
    invokeButton: "Invocar",
    unityCardTitle: "Unity",
    unityCardDesc: "Desarrollo de juegos 2D/3D, UI y sistemas de juego.",
    cppCardDesc: "Programación de bajo nivel y optimización para motores de juego.",
    cppCardDetail1: "POO",
    cppCardDetail2: "Estructuras de Datos",
    cppCardDetail3: "Algoritmos",
    csharpCardDesc: "Lenguaje principal para scripting en Unity y desarrollo de lógica de juego.",
    csharpCardDetail2: "Eventos y Delegados",
    csharpCardDetail3: "Corrutinas",
    blueprintsCardTitle: "Blueprints",
    blueprintsCardDesc: "Programación visual para prototipado rápido y lógica de juego en Unreal Engine.",
    blueprintsCardDetail1: "Lógica de Gameplay",
    blueprintsCardDetail2: "Interfaces",
    blueprintsCardDetail3: "Macros",
    pythonCardDesc: "Scripting, automatización y herramientas para desarrollo de juegos.",
    pythonCardDetail1: "Automatización",
    pythonCardDetail2: "Análisis de Datos",
    pythonCardDetail3: "Herramientas de Pipeline",
    mechanicsCardTitle: "Diseño de Mecánicas",
    mechanicsCardDesc: "Creación de reglas y sistemas de juego atractivos y equilibrados.",
    mechanicsCardDetail1: "Prototipado",
    mechanicsCardDetail2: "Balanceo",
    mechanicsCardDetail3: "Iteración",
    gameplayCardTitle: "Programación de Gameplay",
    gameplayCardDesc: "Implementación de la lógica central y la interactividad del juego.",
    gameplayCardDetail1: "Control de Personajes",
    gameplayCardDetail2: "Sistemas de Combate",
    gameplayCardDetail3: "IA de Enemigos",
    systemsCardTitle: "Diseño de Sistemas",
    systemsCardDesc: "Conceptualización y estructuración de la economía, progresión y otros sistemas.",
    systemsCardDetail1: "Economía del Juego",
    systemsCardDetail2: "Progresión",
    blenderCardDesc: "Modelado 3D, texturizado, rigging y animación para assets de juego.",
    blenderCardDetail1: "Modelado Hard Surface",
    blenderCardDetail2: "Esculpido",
    blenderCardDetail3: "Renderizado",
    kritaCardDesc: "Creación de arte 2D, texturas y concept art para videojuegos.",
    kritaCardDetail1: "Pintura Digital",
    kritaCardDetail2: "Concept Art",
    kritaCardDetail3: "Texturizado",
    gitCardDesc: "Control de versiones para colaboración en equipos de desarrollo.",
    gitCardDetail1: "Repositorios",
    gitCardDetail2: "Ramas",
    gitCardDetail3: "Merge/Rebase",
    teamsCardDesc: "Herramienta de comunicación y colaboración para equipos de trabajo.",
    teamsCardDetail1: "Comunicación",
    teamsCardDetail2: "Gestión de Proyectos",
    teamsCardDetail3: "Reuniones",
    aiCardTitle: "Herramientas de IA",
    aiCardDesc: "Dominio de herramientas de IA generativa para arte, texto y desarrollo.",
    languagesTitle: "Elige tu Filo",
    nativeLang: "Nativo",
    languageQuote: "El lenguaje es la hoja del entendimiento."
  },
  en: {
    pageTitle: "World Forger. Detail Warrior.",
    logoText: " World Forger. Detail Warrior. ",
    navProjects: "🚀 Featured Projects",
    navEducation: "🎓 Education",
    navSkills: "🛠️ Digital Skills",
    navLanguages: "📖 Languages",
    heroSubtitle: "Where the code ends, the legend begins.",
    heroLocation: "📍 Spain",
    aboutTitle: "About Me: Gabriel Huerta",
    aboutP1: "My journey as a game designer stems from a deep passion for stories that make us feel alive. Experiences like those in the <em>Souls</em> series not only taught me about perseverance and resilience but also ignited in me the desire to build worlds that offer the same level of challenge and excitement. My goal is to bring to life the worlds I have envisioned, creating refuges and stories that allow other players to disconnect and live their own adventures.",
    aboutP2New: "My professional identity, <strong>Blending EngineK</strong>, reflects my technical and creative approach. 'Blending' for my skill in <strong>Blender</strong> for 3D modeling, and 'Engine' because it symbolizes my ability to be the engine that drives projects, mastering both <strong>Unreal Engine</strong> and <strong>Unity</strong>. The 'K' is a nod to my influences, from samurai aesthetics to Norse mythology, which inspire my pursuit of a realistic, high-quality style.",
    aboutP3: "Although my focus is on realism and pushing Unreal's potential, I also have practical experience with <strong>Unity</strong>, the engine with which I have developed three games, giving me a solid and versatile foundation in development. I am looking for an opportunity to join a team where I can contribute my vision as a 'World Forger' and my skill as a 'Detail Warrior' to create not just video games, but legends.",
    projectsTitle: "Featured Projects",
    roleLabel: "Role:",
    engineLabel: "Engine:",
    dateLabel: "Date:",
    teamLabel: "Team:",
    studioLabel: "Studio:",
    cyberRunnerRole: " Solo Developer",
    cyberRunnerResp1: "🔹 Full prototype and game mechanics development.",
    cyberRunnerResp2: "🔹 Integration of high-quality assets from Quixel Megascans to create a visually rich environment.",
    cyberRunnerResp3: "🔹 Creation of advanced visual effects (VFX) with the Niagara system.",
    cyberRunnerResp4: "🔹 Implementation and customization of realistic characters using MetaHuman.",
    endlessSeasonResp1: "🔹 Design and implementation of a complex and engaging user interface (UI).",
    endlessSeasonResp2: "🔹 Programming of interactive menu panels that dynamically changed based on the in-game season.",
    endlessSeasonResp3: "🔹 My first solid experience in a team project with Unity.",
    experimentIARole: " Gameplay & AI Programmer",
    experimentIATeam: " Team Collaboration",
    experimentIAResp1: "🔹 Development of the main mechanics for a 2.5D Pixel Art style FPS.",
    experimentIAResp2: "🔹 Programming the behavior and artificial intelligence (AI) of multiple enemy types.",
    experimentIAResp3: "🔹 Design and implementation of a final boss with different phases and enemy summoning abilities.",
    ohMyGodsRole: " Systems & Economy Programmer",
    ohMyGodsStudio: " Bug & Play Studio (unofficial)",
    ohMyGodsDate: " Present",
    ohMyGodsResp1: "🔹 Design and development of a complex Gacha system, inspired by references like *AFK Arena* and *Genshin Impact*.",
    ohMyGodsResp2: "🔹 Implementation of a \"pity\" system and seasonal banners for character acquisition.",
    ohMyGodsResp3: "🔹 Creation of the in-game economy, managing premium and free currencies.",
    ohMyGodsResp4: "🔹 Programming of the player inventory, in-game store, and character progression systems (levels and stars).",
    educationTitle: "Education",
    degreeTitle: "🎓 Higher Degree in 3D Animation, Games and Interactive Environments",
    institutionLabel: "🏢 Institution:",
    skillsTitle: "Digital Skills",
    unrealCardTitle: "Unreal Engine",
    unrealCardDesc: "Experience in video game development and interactive environments.",
    invokeButton: "Invoke",
    unityCardTitle: "Unity",
    unityCardDesc: "Development of 2D/3D games, UI, and game systems.",
    cppCardDesc: "Low-level programming and optimization for game engines.",
    cppCardDetail1: "OOP",
    cppCardDetail2: "Data Structures",
    cppCardDetail3: "Algorithms",
    csharpCardDesc: "Main language for scripting in Unity and game logic development.",
    csharpCardDetail2: "Events and Delegates",
    csharpCardDetail3: "Coroutines",
    blueprintsCardTitle: "Blueprints",
    blueprintsCardDesc: "Visual programming for rapid prototyping and game logic in Unreal Engine.",
    blueprintsCardDetail1: "Gameplay Logic",
    blueprintsCardDetail2: "Interfaces",
    blueprintsCardDetail3: "Macros",
    pythonCardDesc: "Scripting, automation, and tools for game development.",
    pythonCardDetail1: "Automation",
    pythonCardDetail2: "Data Analysis",
    pythonCardDetail3: "Pipeline Tools",
    mechanicsCardTitle: "Game Mechanics Design",
    mechanicsCardDesc: "Creation of engaging and balanced game rules and systems.",
    mechanicsCardDetail1: "Prototyping",
    mechanicsCardDetail2: "Balancing",
    mechanicsCardDetail3: "Iteration",
    gameplayCardTitle: "Gameplay Programming",
    gameplayCardDesc: "Implementation of the core logic and interactivity of the game.",
    gameplayCardDetail1: "Character Control",
    gameplayCardDetail2: "Combat Systems",
    gameplayCardDetail3: "Enemy AI",
    systemsCardTitle: "Game Systems Design",
    systemsCardDesc: "Conceptualization and structuring of the economy, progression, and other systems.",
    systemsCardDetail1: "Game Economy",
    systemsCardDetail2: "Progression",
    blenderCardDesc: "3D modeling, texturizado, rigging and animation for game assets.",
    blenderCardDetail1: "Hard Surface Modeling",
    blenderCardDetail2: "Esculpido",
    blenderCardDetail3: "Renderizado",
    kritaCardDesc: "Creation of 2D art, textures, and concept art for video games.",
    kritaCardDetail1: "Digital Painting",
    kritaCardDetail2: "Concept Art",
    kritaCardDetail3: "Texturizado",
    gitCardDesc: "Version control for collaboration in development teams.",
    gitCardDetail1: "Repositories",
    gitCardDetail2: "Branches",
    gitCardDetail3: "Merge/Rebase",
    teamsCardDesc: "Communication and collaboration tool for work teams.",
    teamsCardDetail1: "Communication",
    teamsCardDetail2: "Project Management",
    teamsCardDetail3: "Meetings",
    aiCardTitle: "AI Tools",
    aiCardDesc: "Proficiency in generative AI tools for art, text, and development.",
    languagesTitle: "Choose Your Blade",
    nativeLang: "Nativo",
    languageQuote: "Language is the blade of understanding."
  }
};

// --- Funciones ---
function playSound(sound) {
  if (isAudioEnabled) {
    soundEffects.forEach(effect => {
      if (effect !== sound) {
        effect.pause();
        effect.currentTime = 0;
      }
    });
    sound.currentTime = 0;
    sound.play().catch(error => {
        console.error("Error playing sound:", sound.src, error);
    });
  }
}

function loadParticles(config) {
  if (typeof particlesJS === 'undefined') {
    console.error('particles.js is not loaded yet.');
    return;
  }
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
  particlesJS('particles-js', config);
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(el => {
    const key = el.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.querySelectorAll('.lang-flag').forEach(flag => {
    flag.classList.remove('active');
    if (flag.dataset.lang === lang) {
      flag.classList.add('active');
    }
  });
}

// --- Eventos ---
document.addEventListener('DOMContentLoaded', function() {
  
  // --- Initial Setup ---
  setLanguage('es');
  setTimeout(() => {
    if (document.body.classList.contains('light-mode')) {
      loadParticles(particlesLightConfig);
    } else {
      loadParticles(particlesDarkConfig);
    }
  }, 100); // Pequeño retraso para asegurar que particles.js esté cargado

  // --- First Interaction Audio ---
  document.body.addEventListener('click', () => {
    if (isAudioEnabled) {
      if (document.body.classList.contains('light-mode')) {
        backgroundMusicLight.play().catch(e => console.error("Audio play failed", e));
        bonfireSoundLight.play().catch(e => console.error("Audio play failed", e));
      } else {
        backgroundMusic.play().catch(e => console.error("Audio play failed", e));
        bonfireSound.play().catch(e => console.error("Audio play failed", e));
      }
    }
  }, { once: true });

  // --- Sound and UI Listeners ---
  document.querySelectorAll('a, button, .lang-flag').forEach(element => {
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
      audioToggle.querySelector('i').className = isAudioEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
      if (isAudioEnabled) {
        if (document.body.classList.contains('light-mode')) {
          backgroundMusicLight.play();
          bonfireSoundLight.play();
        } else {
          backgroundMusic.play();
          bonfireSound.play();
        }
      } else {
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
      const isLight = document.body.classList.contains('light-mode');

      themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      
      if (isLight) {
        const snowflakeImages = ['images/snowflake.png', 'images/snowflake2.png', 'images/snowflake3.png'];
        const randomIndex = Math.floor(Math.random() * snowflakeImages.length);
        const currentParticlesLightConfig = JSON.parse(JSON.stringify(particlesLightConfig));
        currentParticlesLightConfig.particles.shape.image.src = snowflakeImages[randomIndex];
        loadParticles(currentParticlesLightConfig);
        backgroundMusic.pause();
        bonfireSound.pause();
        if (isAudioEnabled) {
          backgroundMusicLight.play();
          bonfireSoundLight.play();
        }
      } else {
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

  // --- Language Selector Events ---
  document.querySelectorAll('.lang-flag').forEach(flag => {
    flag.addEventListener('click', (event) => {
      setLanguage(event.target.dataset.lang);
    });
  });

  // --- Video Pop-up ---
  const videoPopup = document.getElementById('video-popup');
  const closeButton = document.querySelector('.video-popup .close-button');
  const projectVideo = document.getElementById('project-video');
  const comingSoonGlitch = document.getElementById('coming-soon-glitch');
  const projectPlayIcons = document.querySelectorAll('.project-play-icon');
  const profilePhoto = document.querySelector('.photo[data-project-id="profile"]');
  
  const clickableElements = [...projectPlayIcons, profilePhoto];

  if (videoPopup && closeButton && projectVideo && comingSoonGlitch && profilePhoto) {
    clickableElements.forEach(element => {
      if (element) { 
        element.addEventListener('click', (event) => {
          event.stopPropagation(); 
          const projectId = element.closest('[data-project-id]').dataset.projectId;

          if (projectId === 'oh-my-gods') {
            projectVideo.style.display = 'none';
            comingSoonGlitch.style.display = 'flex';
          } else {
            projectVideo.style.display = 'block';
            comingSoonGlitch.style.display = 'none';
            let videoFileName;
            if (projectId === 'cyber-runner') videoFileName = 'Cyber Runner.mp4';
            else if (projectId === 'endless-season') videoFileName = 'Endless Season.mp4';
            else if (projectId === 'experiment-ia') videoFileName = 'ExperimentIA.mp4';
            else if (projectId === 'profile') videoFileName = 'Perfil.mp4';
            
            projectVideo.src = `videos/${videoFileName}`;
            projectVideo.muted = true;
            projectVideo.setAttribute('playsinline', '');
            projectVideo.load();
            projectVideo.play().catch(error => console.error('Error playing video:', error));
          }
          videoPopup.classList.add('show');
        });
      }
    });

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
    });

    videoPopup.addEventListener('click', (event) => {
      if (event.target === videoPopup) {
        videoPopup.classList.remove('show');
        projectVideo.pause();
        projectVideo.currentTime = 0;
      }
    });
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
    }, 5000);
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
          observer.unobserve(entry.target);

          if (unlockedAchievements.size === totalAchievements) {
            setTimeout(showFinalAchievement, 2000);
          }
        }
      }
    });
  }, { threshold: 0.5 });

  Object.keys(achievements).forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      achievementObserver.observe(section);
    }
  });

  // --- Interacción de Elige tu Filo (Idiomas) ---
  const katanaItemsFinal = document.querySelectorAll('.katana-item');
  const quoteContainer = document.getElementById('quote-container');
  const quoteTextFinal = document.getElementById('language-quote-text');

  if (katanaItemsFinal.length > 0 && quoteContainer && quoteTextFinal) {
    katanaItemsFinal.forEach(item => {
      item.addEventListener('mouseover', () => playSound(hoverSound));
      item.addEventListener('click', () => {
        const lang = item.dataset.lang;
        setLanguage(lang);
        quoteTextFinal.textContent = translations[lang].languageQuote;
        quoteContainer.classList.add('active');
        playSound(katanaSlashSound);
        setTimeout(() => {
          quoteContainer.classList.remove('active');
        }, 4000); 
      });
    });
  }

  // --- Interacción de las Cartas de Habilidades ---
  const skillCards = document.querySelectorAll('.skill-card');
  const invocationPopup = document.getElementById('invocation-popup');
  const closeInvocationButton = document.querySelector('.close-invocation');
  const invokedSkillTitle = document.getElementById('invoked-skill-title');
  const invokedSkillDescription = document.getElementById('invoked-skill-description');
  const invokedSkillDetails = document.getElementById('invoked-skill-details');

  if (skillCards.length > 0 && invocationPopup && closeInvocationButton && invokedSkillTitle && invokedSkillDescription && invokedSkillDetails) {
    const skillData = {
      'unreal-engine': {
        title: 'Unreal Engine',
        description: 'Experiencia en desarrollo de videojuegos y entornos interactivos.',
        details: ['Blueprints', 'C++', 'Niagara VFX', 'MetaHuman']
      },
      'unity': {
        title: 'Unity',
        description: 'Desarrollo de juegos 2D/3D, UI y sistemas de juego.',
        details: ['C# Scripting', 'UI Toolkit', 'Mecanim']
      },
      'cpp': {
        title: 'C++',
        description: 'Programación de bajo nivel y optimización para motores de juego.',
        details: ['POO', 'Estructuras de Datos', 'Algoritmos']
      },
      'csharp': {
        title: 'C#',
        description: 'Lenguaje principal para scripting en Unity y desarrollo de lógica de juego.',
        details: ['Unity API', 'Eventos y Delegados', 'Corrutinas']
      },
      'blueprints': {
        title: 'Blueprints',
        description: 'Programación visual para prototipado rápido y lógica de juego en Unreal Engine.',
        details: ['Lógica de Gameplay', 'Interfaces', 'Macros']
      },
      'python': {
        title: 'Python',
        description: 'Scripting, automatización y herramientas para desarrollo de juegos.',
        details: ['Automatización', 'Análisis de Datos', 'Herramientas de Pipeline']
      },
      'game-mechanics': {
        title: 'Diseño de Mecánicas',
        description: 'Creación de reglas y sistemas de juego atractivos y equilibrados.',
        details: ['Prototipado', 'Balanceo', 'Iteración']
      },
      'gameplay-programming': {
        title: 'Programación de Gameplay',
        description: 'Implementación de la lógica central y la interactividad del juego.',
        details: ['Control de Personajes', 'Sistemas de Combate', 'IA de Enemigos']
      },
      'game-systems': {
        title: 'Diseño de Sistemas de Juego',
        description: 'Conceptualización y estructuración de la economía, progresión y otros sistemas.',
        details: ['Economía del Juego', 'Progresión', 'Gacha Systems']
      },
      'blender': {
        title: 'Blender',
        description: 'Modelado 3D, texturizado, rigging y animación para assets de juego.',
        details: ['Modelado Hard Surface', 'Esculpido', 'Renderizado']
      },
      'krita': {
        title: 'Krita',
        description: 'Creación de arte 2D, texturas y concept art para videojuegos.',
        details: ['Pintura Digital', 'Concept Art', 'Texturizado']
      },
      'git': {
        title: 'Git',
        description: 'Control de versiones para colaboración en equipos de desarrollo.',
        details: ['Repositorios', 'Ramas', 'Merge/Rebase']
      },
      'microsoft-teams': {
        title: 'Microsoft Teams',
        description: 'Herramienta de comunicación y colaboración para equipos de trabajo.',
        details: ['Comunicación', 'Gestión de Proyectos', 'Reuniones']
      },
      'ai-tools': {
        title: 'Herramientas de IA',
        description: 'Dominio de herramientas de IA generativa para arte, texto y desarrollo.',
        details: ['ChatGPT', 'Gemini', 'Midjourney', 'NotebookLM', 'Suno']
      }
    };

    skillCards.forEach(card => {
      if (card) {
        const invokeButton = card.querySelector('.invoke-button');
        if (invokeButton) {
          invokeButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            const skillId = card.dataset.skill;
            const data = skillData[skillId];

            if (data) {
              invokedSkillTitle.textContent = data.title;
              invokedSkillDescription.textContent = data.description;
              invokedSkillDetails.innerHTML = '';
              data.details.forEach(detail => {
                const li = document.createElement('li');
                li.textContent = detail;
                invokedSkillDetails.appendChild(li);
              });
              invocationPopup.classList.add('active');
            }
          });
        }
      }
    });

    closeInvocationButton.addEventListener('click', () => {
      invocationPopup.classList.remove('active');
    });

    invocationPopup.addEventListener('click', (event) => {
      if (event.target === invocationPopup) {
        invocationPopup.classList.remove('active');
      }
    });
  }
});