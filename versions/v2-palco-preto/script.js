// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Entrada suave dos blocos
const alvos = document.querySelectorAll(".exhibit, .statement, .prose, .feature, .plan, .page-title, .timeline li, .invitation");
alvos.forEach((el) => el.classList.add("reveal"));

const revelar = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revelar.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
alvos.forEach((el) => revelar.observe(el));

// Navegação: destino atual fica totalmente branco
const links = document.querySelectorAll("[data-nav]");
const secoes = [...links].map((a) => document.querySelector(a.getAttribute("href")));

const marcar = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const i = secoes.indexOf(entry.target);
      links[i].classList.toggle("is-active", entry.isIntersecting);
    });
  },
  { rootMargin: "-40% 0px -40% 0px" }
);
secoes.forEach((s) => s && marcar.observe(s));
