// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

/* ---------- Palco: trilho de projetos ---------- */
const projetos = [
  { url: "vitalis.com.br", kicker: "Agende online", title: "Cuidado que começa antes da consulta.", btn: "Agendar", name: "Clínica Vitalis — landing page" },
  { url: "jkeletronicos.com.br", kicker: "Ofertas da semana", title: "Tecnologia com entrega para todo o Brasil.", btn: "Comprar", name: "JK Eletrônicos — loja virtual" },
  { url: "app.dindin.com.br", kicker: "Resumo do mês", title: "Seu dinheiro, organizado em um só lugar.", btn: "Ver relatório", name: "Din-Din — sistema web" },
  { url: "guaiba.com.br", kicker: "Atendimento 24h", title: "Respostas rápidas pelo WhatsApp, a qualquer hora.", btn: "Iniciar conversa", name: "Atendimento Guaíba — chatbot" },
];

const artifact = document.querySelector(".artifact");
const thumbs = document.querySelectorAll(".rail__thumb");
const set = (sel, txt) => (artifact.querySelector(sel).textContent = txt);

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const i = Number(thumb.dataset.project);
    const p = projetos[i];
    thumbs.forEach((t) => t.classList.toggle("is-active", t === thumb));
    artifact.classList.add("is-switching");
    setTimeout(() => {
      set(".artifact__url", p.url);
      set(".artifact__kicker", p.kicker);
      set(".artifact__title", p.title);
      set(".a-btn", p.btn);
      set(".artifact__name", p.name);
      set(".artifact__caption .chapter", `(0${i + 1})`);
      artifact.classList.remove("is-switching");
    }, 250);
  });
});

/* ---------- Abas da experiência ---------- */
const textosAbas = [
  "Desenvolvo sites e sistemas para pequenos negócios e profissionais de diversos segmentos, do primeiro esboço à publicação.",
  "Desenvolvedor front-end, criando interfaces web e sistemas internos com foco em usabilidade.",
  "Formação em tecnologia e primeiros projetos freelance para clientes locais.",
];
const tabs = document.querySelectorAll(".tab");
const painel = document.querySelector(".tabpanel");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      const ativo = t === tab;
      t.classList.toggle("is-active", ativo);
      t.setAttribute("aria-selected", String(ativo));
    });
    painel.textContent = textosAbas[Number(tab.dataset.tab)];
  });
});

/* ---------- Diagrama de pontos (orbit) ---------- */
(function desenharOrbit() {
  const svg = document.getElementById("orbit");
  if (!svg) return;
  svg.classList.add("dots");
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs, cls) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (cls) n.setAttribute("class", cls);
    svg.appendChild(n);
    return n;
  };

  const cx = 720, cy = 420;
  const obj = { x: cx - 220, y: cy - 150, w: 440, h: 300 };
  const dentro = (x, y) => x > obj.x - 12 && x < obj.x + obj.w + 12 && y > obj.y - 12 && y < obj.y + obj.h + 12;

  // Órbitas: pontos ao longo de elipses, com trechos falhados e ocultos atrás do objeto
  const orbitas = [
    { rx: 560, ry: 150, rot: -8, n: 220, gap: [0.62, 0.7] },
    { rx: 440, ry: 250, rot: 12, n: 190, gap: [0.1, 0.16] },
    { rx: 660, ry: 300, rot: -3, n: 260, gap: [0.36, 0.46] },
  ];
  orbitas.forEach((o) => {
    const r = (o.rot * Math.PI) / 180;
    for (let i = 0; i < o.n; i++) {
      const t = i / o.n;
      if (t > o.gap[0] && t < o.gap[1]) continue;
      const a = t * Math.PI * 2;
      const ex = o.rx * Math.cos(a), ey = o.ry * Math.sin(a);
      const x = cx + ex * Math.cos(r) - ey * Math.sin(r);
      const y = cy + ex * Math.sin(r) + ey * Math.cos(r);
      if (dentro(x, y)) continue;
      const raio = 1 + (Math.sin(i * 1.7) + 1) * 0.5;
      el("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: raio.toFixed(2), style: `fill:rgba(255,255,255,${0.35 + 0.4 * Math.abs(Math.sin(a))});stroke:none` });
    }
  });

  // Objeto central: wireframe pontilhado de um site
  el("rect", { x: obj.x, y: obj.y, width: obj.w, height: obj.h, rx: 10 }, "hot");
  el("line", { x1: obj.x, y1: obj.y + 34, x2: obj.x + obj.w, y2: obj.y + 34 });
  el("line", { x1: obj.x + 40, y1: obj.y + 80, x2: obj.x + 260, y2: obj.y + 80 });
  el("line", { x1: obj.x + 40, y1: obj.y + 108, x2: obj.x + 210, y2: obj.y + 108 });
  el("rect", { x: obj.x + 40, y: obj.y + 140, width: 110, height: 30, rx: 4 }, "hot");
  el("rect", { x: obj.x + 290, y: obj.y + 66, width: 110, height: 110, rx: 4 });
  el("rect", { x: obj.x + 40, y: obj.y + 205, width: 110, height: 60, rx: 4 });
  el("rect", { x: obj.x + 165, y: obj.y + 205, width: 110, height: 60, rx: 4 });
  el("rect", { x: obj.x + 290, y: obj.y + 205, width: 110, height: 60, rx: 4 });

  // Chamadas técnicas com linhas-guia em ângulo reto
  const chamadas = [
    { from: [obj.x + 400, obj.y + 120], to: [1180, 200], label: "[ RESPONSIVO ]" },
    { from: [obj.x + 150, obj.y + 155], to: [260, 250], label: "[ BOTÃO DE WHATSAPP ]" },
    { from: [obj.x + 220, obj.y + 265], to: [330, 700], label: "[ SEO DESDE O 1º DIA ]" },
    { from: [obj.x + 400, obj.y + 235], to: [1120, 660], label: "[ PAINEL DE EDIÇÃO ]" },
  ];
  chamadas.forEach((c) => {
    const [x1, y1] = c.from, [x2, y2] = c.to;
    el("path", { d: `M${x1} ${y1} H${x2} V${y2}` }, "leader");
    el("rect", { x: x2 - 4, y: y2 - 4, width: 8, height: 8 }, "box");
    const t = el("text", { x: x2, y: y2 < y1 ? y2 - 16 : y2 + 28, "text-anchor": "middle" });
    t.textContent = c.label;
  });
})();

/* ---------- Entrada suave ---------- */
const alvos = document.querySelectorAll(".centered, .feature, .overview__title, .split, .proof__item, .plan, .reading");
alvos.forEach((el) => el.classList.add("reveal"));
const revelar = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); revelar.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);
alvos.forEach((el) => revelar.observe(el));
