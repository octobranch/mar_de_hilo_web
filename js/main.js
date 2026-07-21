// ============================================================
// MAIN.JS – Funcionalidades globales (menú, header/footer, etc.)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

  // ---- Cargar header y footer desde partials ----
  function loadPartial(id, url) {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        document.getElementById(id).innerHTML = html;
        // Re-ejecutar eventos del menú después de cargar
        if (id === 'header') initMenu();
      })
      .catch(err => console.warn('Error cargando ' + url, err));
  }

  if (document.getElementById('header')) {
    loadPartial('header', './partials/header.html');
  }
  if (document.getElementById('footer')) {
    loadPartial('footer', './partials/footer.html');
  }

  // ---- Menú hamburguesa (se ejecuta después de cargar header) ----
  function initMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('open');
      });
    }
  }

  // ---- Marcar enlace activo según la página ----
  function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-menu a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  // Se ejecuta después de cargar header, pero también ahora si ya está cargado
  setTimeout(setActiveLink, 300); // Esperar a que header se cargue

  // ---- Selector de idioma (delegado) ----
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('lang-btn')) {
      const lang = e.target.dataset.lang;
      if (lang) {
        setLanguage(lang);
        // Actualizar clase activa en botones
        document.querySelectorAll('.lang-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.lang === lang);
        });
      }
    }
  });

  // ---- Función para cambiar idioma (global) ----
  window.setLanguage = function(lang) {
    localStorage.setItem('mardehilo-lang', lang);
    // Cambiar atributo lang del html
    document.documentElement.lang = lang;
    // Disparar evento personalizado para que i18n.js lo escuche
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  };

  // ---- Cargar idioma guardado ----
  const savedLang = localStorage.getItem('mardehilo-lang') || 'es';
  setLanguage(savedLang);
  // Marcar botón activo después de cargar header
  setTimeout(() => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === savedLang);
    });
  }, 500);

});
