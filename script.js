// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Navegação local: aparece depois da abertura ---------- */
const localnav = document.querySelector(".localnav");
new IntersectionObserver(
  ([e]) => localnav.classList.toggle("is-visible", !e.isIntersecting),
  { threshold: 0.15 }
).observe(document.querySelector(".stage"));

/* ---------- Destaques: carrossel com pontos e pausa ---------- */
const hlTrack = document.querySelector(".hl-track");
const slides = [...hlTrack.querySelectorAll(".hl-slide")];
const dots = [...document.querySelectorAll(".hl-dot")];
const pausa = document.querySelector(".hl-pause");
let atual = 0;
let pausado = reduzMovimento;
let timer;

const irPara = (i) => {
  atual = (i + slides.length) % slides.length;
  hlTrack.scrollTo({ left: slides[atual].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
};
const marcar = (i) => dots.forEach((d, j) => d.classList.toggle("is-active", j === i));
const agendar = () => {
  clearInterval(timer);
  if (!pausado) timer = setInterval(() => irPara(atual + 1), 5000);
};

dots.forEach((d, i) => d.addEventListener("click", () => { irPara(i); agendar(); }));
pausa.classList.toggle("is-paused", pausado);
pausa.addEventListener("click", () => {
  pausado = !pausado;
  pausa.classList.toggle("is-paused", pausado);
  pausa.setAttribute("aria-label", pausado ? "Reproduzir" : "Pausar");
  agendar();
});
const hlObs = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { atual = slides.indexOf(e.target); marcar(atual); }
  }),
  { root: hlTrack, threshold: 0.6 }
);
slides.forEach((s) => hlObs.observe(s));
agendar();

/* ---------- Galeria de serviços: setas ---------- */
const cgTrack = document.querySelector(".cg-track");
const paddles = document.querySelectorAll(".paddle");
const atualizarSetas = () => {
  const max = cgTrack.scrollWidth - cgTrack.clientWidth - 2;
  paddles[0].disabled = cgTrack.scrollLeft <= 2;
  paddles[1].disabled = cgTrack.scrollLeft >= max;
};
paddles.forEach((p) => p.addEventListener("click", () => {
  cgTrack.scrollBy({ left: Number(p.dataset.dir) * 392, behavior: "smooth" });
}));
cgTrack.addEventListener("scroll", atualizarSetas, { passive: true });
addEventListener("resize", atualizarSetas);
atualizarSetas();

/* ---------- Comparação: muda a base ---------- */
const comparacoes = {
  template: {
    prazo: "Template: semanas ajustando tema e plugins.",
    resp: "Template: nem sempre funciona bem no celular.",
    suporte: "Template: suporte só do tema, não do seu site.",
    contato: "Template: fórum ou chat do fornecedor.",
    pag: "Template: licença anual, mais o seu tempo.",
    painel: "Template: painel genérico, cheio de opções.",
  },
  sozinho: {
    prazo: "Sozinho: depende do seu tempo livre.",
    resp: "Sozinho: testar cada tela fica com você.",
    suporte: "Sozinho: o suporte é você.",
    contato: "Sozinho: tutoriais e tentativa e erro.",
    pag: "Sozinho: sem custo de serviço, mas com as suas horas.",
    painel: "Sozinho: você monta e mantém o painel.",
  },
  agencia: {
    prazo: "Agência: fila de projetos e prazos maiores.",
    resp: "Agência: também entrega, normalmente por mais.",
    suporte: "Agência: costuma ser cobrado à parte.",
    contato: "Agência: atendimento por intermediário.",
    pag: "Agência: valores maiores e contratos longos.",
    painel: "Agência: depende do contrato.",
  },
};
const baseline = document.getElementById("baseline");
const preencher = () => {
  const dados = comparacoes[baseline.value];
  document.querySelectorAll(".proof__vs").forEach((p) => (p.textContent = dados[p.dataset.k]));
};
baseline.addEventListener("change", preencher);
preencher();

/* ---------- Cards de benefícios: abrir/fechar ---------- */
document.querySelectorAll(".offer__toggle").forEach((b) => {
  b.addEventListener("click", () => {
    const card = b.closest(".offer");
    const aberto = card.classList.toggle("is-open");
    b.setAttribute("aria-expanded", String(aberto));
    b.setAttribute("aria-label", aberto ? "Fechar detalhes" : "Mais detalhes");
  });
});

/* ---------- Entrada suave + brilho do título ---------- */
const alvos = document.querySelectorAll(".copy-column, .chapter .container, .section-head, .model, .proof, .faq__list, .directory__cols");
alvos.forEach((el) => el.classList.add("reveal"));
const sweep = document.getElementById("sweep");
const observar = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    if (e.target === sweep) sweep.classList.add("is-swept");
    else e.target.classList.add("is-visible");
    observar.unobserve(e.target);
  }),
  { threshold: 0.15 }
);
alvos.forEach((el) => observar.observe(el));
observar.observe(sweep);
