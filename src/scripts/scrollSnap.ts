/**
 * Sistema de scroll snap para navegación entre secciones
 * Permite navegación fluida entre Hero y Bento+Footer
 * Incluye indicador visual de scroll
 */

// Tipos
interface ScrollSectionChangeEvent extends CustomEvent {
  detail: { section: number };
}

interface ScrollIndicatorClickEvent extends CustomEvent {
  detail: { section: number };
}

// Variables globales
let isScrolling = false;
let currentSection = 0; // 0 = hero, 1 = content

// Detectar si estamos en un dispositivo móvil
function isMobileDevice(): boolean {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
}

// Función para actualizar el indicador de scroll
function updateScrollIndicator(sectionIndex: number): void {
  const event: ScrollSectionChangeEvent = new CustomEvent("scrollSectionChange", {
    detail: { section: sectionIndex },
  });
  window.dispatchEvent(event);
}

// Inicializar el indicador de scroll
function initScrollIndicator(): void {
  // Solo en desktop
  if (isMobileDevice()) return;

  const indicator = document.getElementById("scroll-indicator") as HTMLElement | null;
  const dots = document.querySelectorAll(".scroll-dot") as NodeListOf<HTMLButtonElement>;

  if (!indicator) return;

  // Mostrar indicador inmediatamente
  indicator.classList.remove("opacity-0");
  indicator.classList.add("opacity-100");

  // Actualizar indicador cuando scrollSnap cambie de sección
  window.addEventListener("scrollSectionChange", (event: Event) => {
    const customEvent = event as ScrollSectionChangeEvent;
    const { section } = customEvent.detail;

    // Actualizar dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === section);
    });
  });

  // Click en dots para navegar
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const event: ScrollIndicatorClickEvent = new CustomEvent("scrollIndicatorClick", {
        detail: { section: index },
      });
      window.dispatchEvent(event);
    });
  });
}

export function initScrollSnap(): void {
  // Siempre empezar en el inicio al cargar/recargar
  window.scrollTo({ top: 0, behavior: "instant" });
  currentSection = 0;

  // Forzar scroll al inicio después de un pequeño delay para asegurar que funcione
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 10);

  // Inicializar indicador de scroll
  initScrollIndicator();

  // Si es móvil, no aplicar ningún comportamiento de scroll snap
  if (isMobileDevice()) {
    // En móvil, asegurar que el body tenga scroll normal
    document.body.style.overflow = "auto";
    return;
  }

  const heroSection = document.getElementById("hero") as HTMLElement | null;
  const contentSection = document.getElementById("content") as HTMLElement | null;

  if (!heroSection || !contentSection) return;

  // Función para navegar a una sección específica
  function scrollToSection(sectionIndex: number): void {
    // Si ya estamos en esa sección, no hacer nada
    if (currentSection === sectionIndex) return;

    if (isScrolling) return;

    isScrolling = true;
    currentSection = sectionIndex;

    const targetSection = sectionIndex === 0 ? heroSection : contentSection;

    if (targetSection) {
      // Obtener la altura del header (56px = h-14 en Tailwind)
      const headerHeight = 56;
      let targetPosition: number;

      if (sectionIndex === 0) {
        // Para la sección hero, siempre ir al inicio absoluto
        targetPosition = 0;
      } else {
        // Para la sección de contenido, scroll hasta el final para mostrar el footer
        targetPosition = document.documentElement.scrollHeight - window.innerHeight;
      }

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }

    // Actualizar indicador visual
    updateScrollIndicator(sectionIndex);

    // Reset del flag después de la animación
    setTimeout(() => {
      isScrolling = false;
    }, 300);
  }

  // Detectar scroll del usuario (solo en desktop)
  let lastScrollTime = 0;

  function handleWheel(e: WheelEvent): void {
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

  // Detectar teclas de navegación
  function handleKeyDown(e: KeyboardEvent): void {
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

  // Escuchar clicks del indicador de scroll
  window.addEventListener("scrollIndicatorClick", (event: Event) => {
    const customEvent = event as ScrollIndicatorClickEvent;
    scrollToSection(customEvent.detail.section);
  });

  // Event listeners - solo en desktop
  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeyDown);

  // Solo ocultar overflow en desktop, en móvil permitir scroll normal
  document.body.style.overflow = "hidden";

  // Inicializar el indicador en la sección correcta
  updateScrollIndicator(0);
}
