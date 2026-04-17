// ===========================
// MENU HAMBURGER
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        menuToggle.textContent = '☰';
      });
    });
  }
});

// ===========================
// EMAIL JS - FORMULÁRIO
// ===========================
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Validação básica
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert("Por favor, preencha todos os campos 📝");
      return;
    }

    // Verificar se EmailJS está carregado
    if (typeof emailjs !== 'undefined') {
      emailjs.sendForm("service_jk6k52k", "template_u4j2snl", this)
        .then(function() {
          alert("Mensagem enviada com sucesso 🚀");
          form.reset();
        }, function(error) {
          alert("Erro ao enviar 😢");
          console.log(error);
        });
    } else {
      alert("Serviço de email não disponível. Tente novamente mais tarde.");
    }
  });
}

// ===========================
// FILTRO DE PORTFÓLIO
// ===========================
const items = document.querySelectorAll(".portfolio-item");

if (items.length > 0) {
  let currentFilter = "all";
  let currentCreator = "all";

  function filterItems() {
    let visibleCount = 0;
    
    items.forEach(item => {
      const type = item.getAttribute("data-type");
      const creator = item.getAttribute("data-creator");

      const matchType = currentFilter === "all" || type === currentFilter;
      const matchCreator = currentCreator === "all" || creator === currentCreator;

      if (matchType && matchCreator) {
        item.style.display = "block";
        item.style.animation = "fadeInUp 0.6s ease-out";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    // Mensagem se nenhum item for encontrado
    if (visibleCount === 0) {
      console.log("Nenhum item encontrado com os filtros selecionados");
    }
  }

  // Filtros de tipo
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      // Remover classe active de todos os botões
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      // Adicionar classe active ao botão clicado
      this.classList.add("active");
      
      currentFilter = this.getAttribute("data-filter");
      filterItems();
    });
  });

  // Filtros de criador
  document.querySelectorAll(".filter-creator").forEach(btn => {
    btn.addEventListener("click", function() {
      // Remover classe active de todos os botões
      document.querySelectorAll(".filter-creator").forEach(b => b.classList.remove("active"));
      // Adicionar classe active ao botão clicado
      this.classList.add("active");
      
      currentCreator = this.getAttribute("data-creator");
      filterItems();
    });
  });

  // Definir primeiro botão como ativo
  const firstFilterBtn = document.querySelector(".filter-btn[data-filter='all']");
  const firstCreatorBtn = document.querySelector(".filter-creator[data-creator='all']");
  
  if (firstFilterBtn) firstFilterBtn.classList.add("active");
  if (firstCreatorBtn) firstCreatorBtn.classList.add("active");
}

// ===========================
// SCROLL SUAVE PARA SEÇÕES
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===========================
// ANIMAÇÃO DE SCROLL
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar elementos com classe animável
document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
  observer.observe(el);
});

// ===========================
// EFEITO PARALLAX (OPCIONAL)
// ===========================
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero');
  
  parallaxElements.forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});

// ===========================
// BOTÕES CTA - REDIRECIONAMENTO
// ===========================
document.querySelectorAll('.btn-cta').forEach(btn => {
  if (!btn.getAttribute('href') && btn.textContent.includes('Instagram')) {
    btn.addEventListener('click', function() {
      window.open('https://instagram.com/mattify.co', '_blank');
    });
  }
});

// ===========================
// BOTÃO VER SERVIÇOS - REDIRECIONAMENTO
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const btnServicos = document.querySelector('.btn-primary');
  if (btnServicos && btnServicos.textContent.includes('Ver Serviços')) {
    btnServicos.addEventListener('click', function() {
      window.location.href = 'servicos.html';
    });
  }
});

// ===========================
// INDICADOR DE PÁGINA ATIVA
// ===========================
window.addEventListener('load', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--primary)';
    }
  });
});

// ===========================
// FUNÇÃO AUXILIAR - SCROLL PARA SEÇÃO
// ===========================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


const portfolioImages = document.querySelectorAll(".portfolio-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

if (portfolioImages.length > 0) {
  portfolioImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
}