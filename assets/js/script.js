// Menu responsivo
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");

  // Animação do menu hamburger
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

// Fechar menu ao clicar em um item (em dispositivos móveis)
const menuItems = document.querySelectorAll("#menu a");
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.remove("show");
    const spans = menuToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Newsletter form
const formNewsletter = document.getElementById("newsletterForm");
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

// Validação de e-mail
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Destaque de notícia ao passar o mouse
const newsCards = document.querySelectorAll(".card-noticia");
newsCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  });
});

// Atualizar o ano do copyright automaticamente
document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.querySelector("footer p:last-child");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace(
      "2023",
      currentYear
    );
  }
});

// Carrossel de Destaque - Versão Melhorada
document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o carrossel existe na página
  const carrossel = document.querySelector(".carrossel");
  if (!carrossel) return;

  const items = document.querySelectorAll(".carrossel-item");
  const setaAnterior = document.querySelector(".carrossel-seta.anterior");
  const setaProximo = document.querySelector(".carrossel-seta.proximo");
  const indicadores = document.querySelectorAll(".carrossel-indicador");

  let indiceAtual = 0;
  const totalItems = items.length;
  let intervalo = null;

  // Função para atualizar o carrossel
  function atualizarCarrossel() {
    carrossel.style.transform = `translateX(-${indiceAtual * 100}%)`;

    // Atualizar indicadores
    indicadores.forEach((indicador, index) => {
      if (index === indiceAtual) {
        indicador.classList.add("ativo");
      } else {
        indicador.classList.remove("ativo");
      }
    });
  }

  // Função para avançar para o próximo slide
  function proximoSlide() {
    indiceAtual = (indiceAtual + 1) % totalItems;
    atualizarCarrossel();
    reiniciarAutoPlay();
  }

  // Função para voltar ao slide anterior
  function slideAnterior() {
    indiceAtual = (indiceAtual - 1 + totalItems) % totalItems;
    atualizarCarrossel();
    reiniciarAutoPlay();
  }

  // Função para iniciar o auto-play
  function iniciarAutoPlay() {
    intervalo = setInterval(proximoSlide, 5000);
  }

  // Função para reiniciar o auto-play
  function reiniciarAutoPlay() {
    clearInterval(intervalo);
    iniciarAutoPlay();
  }

  // Event listeners para as setas
  if (setaProximo) {
    setaProximo.addEventListener("click", proximoSlide);
  }

  if (setaAnterior) {
    setaAnterior.addEventListener("click", slideAnterior);
  }

  // Event listeners para os indicadores
  indicadores.forEach((indicador, index) => {
    indicador.addEventListener("click", function () {
      indiceAtual = index;
      atualizarCarrossel();
      reiniciarAutoPlay();
    });
  });

  // Navegação por teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      proximoSlide();
    } else if (e.key === "ArrowLeft") {
      slideAnterior();
    }
  });

  // Pausar auto-play ao passar o mouse
  carrossel.addEventListener("mouseenter", function () {
    clearInterval(intervalo);
  });

  // Retomar auto-play ao sair do mouse
  carrossel.addEventListener("mouseleave", function () {
    iniciarAutoPlay();
  });

  // Swipe para dispositivos móveis
  let touchStartX = 0;
  let touchEndX = 0;

  carrossel.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  carrossel.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const minSwipeDistance = 50;

    if (touchEndX < touchStartX && touchStartX - touchEndX > minSwipeDistance) {
      proximoSlide(); // Swipe para esquerda
    }

    if (touchEndX > touchStartX && touchEndX - touchStartX > minSwipeDistance) {
      slideAnterior(); // Swipe para direita
    }
  }

  // Inicializar
  atualizarCarrossel();
  iniciarAutoPlay();

  //ajustarAlturaCarrossel por esta versão corrigida:
  function ajustarAlturaCarrossel() {
    const carrosselContainer = document.querySelector(".carrossel-container");
    const img = items[indiceAtual].querySelector("img");

    if (img && img.complete) {
      carrosselContainer.style.height = img.offsetHeight + "px";
    } else if (img) {
      img.addEventListener("load", function () {
        carrosselContainer.style.height = img.offsetHeight + "px";
      });
    }
  }

  // Ajustar altura quando a janela for redimensionada
  window.addEventListener("resize", ajustarAlturaCarrossel);
  ajustarAlturaCarrossel();
});

// Animação da Timeline
function animateTimeline() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item) => observer.observe(item));
}

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", animateTimeline);
