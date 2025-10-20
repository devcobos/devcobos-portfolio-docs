/**
 * Sistema de scroll snap para navegación entre secciones
 * Permite navegación fluida entre Hero y Bento+Footer
 */

let isScrolling = false;
let currentSection = 0; // 0 = hero, 1 = content

export function initScrollSnap() {
  // Siempre empezar en el inicio
  window.scrollTo(0, 0);
  currentSection = 0;

  const heroSection = document.getElementById("hero");
  const contentSection = document.getElementById("content");

  if (!heroSection || !contentSection) return;

  // Función para navegar a una sección específica
  function scrollToSection(sectionIndex: number) {
    // Si ya estamos en esa sección, no hacer nada
    if (currentSection === sectionIndex) return;

    if (isScrolling) return;

    isScrolling = true;
    currentSection = sectionIndex;

    const targetSection = sectionIndex === 0 ? heroSection : contentSection;

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Reset del flag después de la animación (más rápido)
    setTimeout(() => {
      isScrolling = false;
    }, 300);
  }

  // Detectar scroll del usuario
  let lastScrollTime = 0;

  function handleWheel(e: WheelEvent) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastScrollTime < 50) return; // Throttle más rápido
    lastScrollTime = now;

    if (isScrolling) return;

    const deltaY = e.deltaY;

    if (deltaY > 0) {
      // Scroll hacia abajo - ir al contenido
      if (currentSection === 0) {
        scrollToSection(1);
      }
    } else {
      // Scroll hacia arriba - ir al hero
      if (currentSection === 1) {
        scrollToSection(0);
      }
    }
  }

  // Detectar scroll táctil (móvil)
  let touchStartY = 0;

  function handleTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchEnd(e: TouchEvent) {
    if (isScrolling) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) < 50) return; // Mínimo movimiento

    if (deltaY > 0) {
      // Swipe hacia arriba - ir al contenido
      if (currentSection === 0) {
        scrollToSection(1);
      }
    } else {
      // Swipe hacia abajo - ir al hero
      if (currentSection === 1) {
        scrollToSection(0);
      }
    }
  }

  // Detectar teclas de navegación
  function handleKeyDown(e: KeyboardEvent) {
    if (isScrolling) return;

    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
      case " ": // Espacio
        e.preventDefault();
        if (currentSection === 0) {
          scrollToSection(1);
        }
        break;
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        if (currentSection === 1) {
          scrollToSection(0);
        }
        break;
      case "Home":
        e.preventDefault();
        scrollToSection(0);
        break;
      case "End":
        e.preventDefault();
        scrollToSection(1);
        break;
    }
  }

  // Event listeners
  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("keydown", handleKeyDown);

  // Prevenir scroll normal
  document.body.style.overflow = "hidden";
}
