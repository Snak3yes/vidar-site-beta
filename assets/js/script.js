// =======================
// Menu Responsivo
// =======================
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");

  // Animação do menu hambúrguer
  const spans = menuToggle.querySelectorAll("span");
  if (menu.classList.contains("show")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Fechar menu ao clicar em um item (mobile)
document.querySelectorAll("#menu a").forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("show");
    const spans = menuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// =======================
// Newsletter
// =======================
const formNewsletter = document.getElementById("newsletterForm");
if (formNewsletter) {
  formNewsletter.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = formNewsletter.querySelector("input");
    const email = emailInput.value;

    if (validateEmail(email)) {
      alert(`Obrigado por se inscrever com o e-mail: ${email}`);
      formNewsletter.reset();
    } else {
      alert("Por favor, insira um e-mail válido.");
      emailInput.focus();
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// =======================
// Destaque nos Cards de Notícias
// =======================
document.querySelectorAll(".card-noticia").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  });
});

// =======================
// Atualizar o ano do rodapé
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.querySelector("footer p:last-child");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace(/\d{4}/, currentYear);
  }
});

// =======================
// Carrossel de Destaque
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const carrossel = document.querySelector(".carrossel");
  if (!carrossel) return;

  const items = document.querySelectorAll(".carrossel-item");
  const setaAnterior = document.querySelector(".carrossel-seta.anterior");
  const setaProximo = document.querySelector(".carrossel-seta.proximo");
  const indicadores = document.querySelectorAll(".carrossel-indicador");

  let indiceAtual = 0;
  const totalItems = items.length;
  let intervalo = null;

  // Atualiza o carrossel
  function atualizarCarrossel() {
    carrossel.style.transform = `translateX(-${indiceAtual * 100}%)`;
    indicadores.forEach((indicador, index) =>
      indicador.classList.toggle("ativo", index === indiceAtual)
    );
  }

  function proximoSlide() {
    indiceAtual = (indiceAtual + 1) % totalItems;
    atualizarCarrossel();
    reiniciarAutoPlay();
  }

  function slideAnterior() {
    indiceAtual = (indiceAtual - 1 + totalItems) % totalItems;
    atualizarCarrossel();
    reiniciarAutoPlay();
  }

  function iniciarAutoPlay() {
    intervalo = setInterval(proximoSlide, 5000);
  }

  function reiniciarAutoPlay() {
    clearInterval(intervalo);
    iniciarAutoPlay();
  }

  // Navegação manual pelas setas
  setaProximo?.addEventListener("click", proximoSlide);
  setaAnterior?.addEventListener("click", slideAnterior);

  // Navegação pelos indicadores
  indicadores.forEach((indicador, index) => {
    indicador.addEventListener("click", () => {
      indiceAtual = index;
      atualizarCarrossel();
      reiniciarAutoPlay();
    });
  });

  // Teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") proximoSlide();
    if (e.key === "ArrowLeft") slideAnterior();
  });

  // Pausar autoplay ao passar mouse
  carrossel.addEventListener("mouseenter", () => clearInterval(intervalo));
  carrossel.addEventListener("mouseleave", iniciarAutoPlay);

  // Swipe no mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carrossel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carrossel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDist = touchStartX - touchEndX;

    if (swipeDist > 50) proximoSlide();
    if (swipeDist < -50) slideAnterior();
  });

  // Ajustar altura do carrossel baseado na imagem
  function ajustarAlturaCarrossel() {
    const carrosselContainer = document.querySelector(".carrossel-container");
    const img = items[indiceAtual].querySelector("img");

    if (img && img.complete) {
      carrosselContainer.style.height = img.offsetHeight + "px";
    } else if (img) {
      img.addEventListener("load", () => {
        carrosselContainer.style.height = img.offsetHeight + "px";
      });
    }
  }

  window.addEventListener("resize", ajustarAlturaCarrossel);

  // Inicialização
  atualizarCarrossel();
  iniciarAutoPlay();
  ajustarAlturaCarrossel();
});

// =======================
// Animação da Timeline
// =======================
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", animateTimeline);
