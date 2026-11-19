const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
      mainNav.classList.remove('is-open');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !reducedMotionQuery.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const serviceDetails = {
  tech: {
    title: 'Tecnología y sistemas',
    intro: 'Soporte para que tus equipos, redes y herramientas de trabajo funcionen de manera confiable.',
    items: [
      'Diagnóstico y mantenimiento preventivo o correctivo de computadoras, laptops, impresoras y periféricos.',
      'Instalación y configuración de sistemas operativos, programas y dispositivos.',
      'Configuración de redes Wi-Fi y LAN, conectividad y recursos compartidos.',
      'Copias de seguridad, recuperación de información y configuración de accesos.',
      'Revisión básica de seguridad informática; auditorías y pruebas especializadas requieren evaluación aparte.'
    ]
  },
  digital: {
    title: 'Presencia digital y software',
    intro: 'Herramientas digitales pensadas para mostrar tu trabajo y facilitar procesos concretos.',
    items: [
      'Diseño y mantenimiento de páginas web y catálogos digitales.',
      'Desarrollo, adaptación e integración de sistemas y aplicaciones.',
      'Automatización de tareas y conexión entre herramientas autorizadas.',
      'Formularios, reportes e indicadores para apoyar la gestión.',
      'El alcance, las cuentas, las licencias y los servicios de hosting se definen en cada propuesta.'
    ]
  },
  talent: {
    title: 'Gestión del talento',
    intro: 'Procesos claros para atraer, seleccionar e integrar personas en los equipos.',
    items: [
      'Levantamiento de necesidades, perfiles de puesto y competencias.',
      'Convocatoria, reclutamiento, preselección y presentación de candidatos.',
      'Entrevistas, verificación de referencias con autorización y reportes de selección.',
      'Inducción, seguimiento, evaluación del desempeño y desarrollo de equipos.',
      'Las evaluaciones psicolaborales se realizan por profesionales habilitados cuando corresponde.'
    ]
  },
  learning: {
    title: 'Capacitación',
    intro: 'Formación práctica adaptada a las herramientas, roles y objetivos de cada organización.',
    items: [
      'Talleres presenciales, virtuales o híbridos.',
      'Ofimática, alfabetización digital y herramientas colaborativas.',
      'Gestión de recursos humanos, atención al cliente y competencias laborales.',
      'Liderazgo, comunicación y trabajo en equipo.',
      'Diseño de materiales, actividades y evaluaciones de aprendizaje.'
    ]
  },
  admin: {
    title: 'Gestión administrativa',
    intro: 'Ordenamos información y procesos para hacer más claro el trabajo cotidiano.',
    items: [
      'Organización, clasificación, archivo y digitalización documental.',
      'Estandarización de formatos, registros, bases de datos e indicadores.',
      'Asistencia administrativa y seguimiento documental.',
      'Manuales, flujogramas y procedimientos.',
      'Mejora de procesos y herramientas digitales para operaciones internas.'
    ]
  },
  equipment: {
    title: 'Equipos y suministros',
    intro: 'Acompañamiento para elegir, adquirir y poner en funcionamiento la tecnología necesaria.',
    items: [
      'Asesoría para seleccionar computadoras, impresoras, componentes y periféricos.',
      'Suministro de equipos, accesorios, consumibles y componentes tecnológicos.',
      'Orientación sobre conectividad, redes y necesidades de oficina.',
      'Instalación, configuración y puesta en funcionamiento.',
      'Las licencias de software comercial deben ser originales y se cotizan según cada caso.'
    ]
  },
  business: {
    title: 'Consultoría y soporte empresarial',
    intro: 'Apoyo para revisar necesidades, ordenar el alcance y coordinar soluciones para organizaciones.',
    items: [
      'Diagnóstico tecnológico y levantamiento de requerimientos.',
      'Revisión de procesos y oportunidades de mejora.',
      'Configuración de herramientas colaborativas y flujos de trabajo.',
      'Soporte periódico sujeto a horarios, equipos y niveles de atención acordados.'
    ]
  }
};

const serviceDialog = document.querySelector('.service-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDescription = document.querySelector('#dialog-description');
const dialogList = document.querySelector('#dialog-list');
const contactArea = document.querySelector('#contact-area');
let selectedServiceTitle = '';

if (serviceDialog && dialogTitle && dialogDescription && dialogList) {
  document.querySelectorAll('.service-open').forEach((button) => {
    button.addEventListener('click', () => {
      const detail = serviceDetails[button.dataset.service];
      if (!detail) return;
      selectedServiceTitle = detail.title;
      dialogTitle.textContent = detail.title;
      dialogDescription.textContent = detail.intro;
      dialogList.replaceChildren(...detail.items.map((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        return listItem;
      }));
      if (typeof serviceDialog.showModal === 'function') serviceDialog.showModal();
    });
  });

  const dialogClose = serviceDialog.querySelector('.dialog-close');
  if (dialogClose) dialogClose.addEventListener('click', () => serviceDialog.close());

  serviceDialog.addEventListener('click', (event) => {
    if (event.target === serviceDialog) serviceDialog.close();
  });

  const dialogCta = serviceDialog.querySelector('.dialog-cta');
  if (dialogCta) {
    dialogCta.addEventListener('click', () => {
      if (contactArea && selectedServiceTitle) {
        const matchingOption = [...contactArea.options].find((option) => option.text === selectedServiceTitle);
        if (matchingOption) contactArea.value = matchingOption.value;
      }
      serviceDialog.close();
    });
  }
}

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const whatsappNumber = '51930315185';

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const lines = [
      'Hola, soy ' + name + '.',
      company ? 'Organización: ' + company + '.' : '',
      'Me interesa: ' + service + '.',
      'Necesito resolver: ' + message
    ].filter(Boolean);
    const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(lines.join('\n'));

    if (formStatus) formStatus.textContent = 'WhatsApp se abrirá con tu consulta lista. Revísala y presiona Enviar para que llegue a Sistemika.';
    const openedWindow = window.open(whatsappUrl, '_blank');
    if (openedWindow) {
      openedWindow.opener = null;
    } else {
      window.location.href = whatsappUrl;
    }
  });
}

const carousel = document.querySelector('.hero-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const dots = carousel.querySelector('.carousel-dots');
  const hero = document.querySelector('.hero');
  const interval = 8500;
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
  let timer;
  let pointerInside = false;
  let focusInside = false;
  let touchStartX = 0;
  const prefersReducedMotion = reducedMotionQuery.matches;

  function updateCarousel(index, fromUser) {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.inert = !isActive;
    });

    [...dots.children].forEach((dot, dotIndex) => {
      const isCurrent = dotIndex === activeIndex;
      dot.setAttribute('aria-current', String(isCurrent));
      dot.tabIndex = isCurrent ? 0 : -1;
    });

    if (hero) hero.dataset.theme = String(activeIndex);
    if (fromUser) restartTimer();
  }

  function stopTimer() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function startTimer() {
    stopTimer();
    if (!prefersReducedMotion && !document.hidden && !pointerInside && !focusInside && slides.length > 1) {
      timer = window.setInterval(() => updateCarousel(activeIndex + 1, false), interval);
    }
  }

  function restartTimer() {
    stopTimer();
    startTimer();
  }

  slides.forEach((slide, index) => {
    const label = slide.getAttribute('aria-label') || ('Mostrar diapositiva ' + (index + 1));
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Mostrar ' + label.split(',')[0]);
    dot.setAttribute('aria-current', String(index === activeIndex));
    dot.tabIndex = index === activeIndex ? 0 : -1;
    dot.addEventListener('click', () => updateCarousel(index, true));
    dots.append(dot);
  });

  carousel.addEventListener('pointerenter', () => {
    pointerInside = true;
    stopTimer();
  });
  carousel.addEventListener('pointerleave', () => {
    pointerInside = false;
    startTimer();
  });
  carousel.addEventListener('focusin', () => {
    focusInside = true;
    stopTimer();
  });
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      focusInside = false;
      startTimer();
    }
  });
  dots.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      updateCarousel(activeIndex + direction, true);
      dots.children[activeIndex].focus();
    }
  });
  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) > 55) updateCarousel(activeIndex + (distance < 0 ? 1 : -1), true);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? stopTimer() : startTimer());
  startTimer();
}
