import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

// Espiral inicial do traço (coordenadas originais, começando em 876.605 394.131)
const ESPIRAL =
  "M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655";
const INICIO = [876.605, 394.131];
const FIM_ESPIRAL = [953.797, 561.655];

// Gerador pseudoaleatório a partir de uma semente (uma nova a cada visita)
function aleatorio(semente) {
  let t = semente >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n) => n.toFixed(1);

// Espiral centrada no meio da primeira tela, seguida de pontos aleatórios ligados por curvas suaves
function montarCaminho(largura, altura, tela, semente) {
  const s = (Math.min(largura, 1400) / 1400) * 0.55;
  const ox = largura / 2 - INICIO[0] * s;
  const oy = tela / 2 - INICIO[1] * s;
  let i = 0;
  const espiral = ESPIRAL.replace(/-?\d*\.?\d+/g, (n) => {
    const v = parseFloat(n);
    return f(i++ % 2 === 0 ? v * s + ox : v * s + oy);
  });

  const rand = aleatorio(semente);
  const limitaX = (v) => Math.min(Math.max(v, largura * 0.04), largura * 0.96);
  const fim = altura - 60;
  let x = FIM_ESPIRAL[0] * s + ox;
  let y = FIM_ESPIRAL[1] * s + oy;
  const pontos = [[x, y]];
  let lacoAntes = false;

  while (y < fim - tela * 0.5) {
    // De vez em quando o traço dá um laço antes de seguir (nunca dois seguidos)
    if (!lacoAntes && rand() < 0.3) {
      const r = Math.min(largura, tela) * (0.06 + rand() * 0.06);
      const d = x > largura / 2 ? -1 : 1;
      [[1, 0.3], [1.6, -0.9], [0.4, -1.6], [-0.4, -0.6], [0.6, 0.9]].forEach(([px, py]) =>
        pontos.push([limitaX(x + d * r * px), y + r * py])
      );
      [x, y] = pontos[pontos.length - 1];
      lacoAntes = true;
    } else {
      lacoAntes = false;
    }

    let nx = largura * (0.08 + rand() * 0.84);
    if (Math.abs(nx - x) < largura * 0.25) nx = x > largura / 2 ? nx - largura * 0.3 : nx + largura * 0.3;
    x = Math.min(Math.max(nx, largura * 0.06), largura * 0.94);
    y = Math.min(y + tela * (0.45 + rand() * 0.6), fim);
    pontos.push([x, y]);
  }
  pontos.push([largura / 2, fim]);

  // Catmull-Rom: a tangente em cada ponto é compartilhada pelas duas curvas, então não há quinas.
  // No primeiro ponto a tangente segue a direção com que a espiral termina.
  const ex = FIM_ESPIRAL[0] - 956.297;
  const ey = FIM_ESPIRAL[1] - 483.647;
  const norma = Math.hypot(ex, ey);
  const dist0 = Math.hypot(pontos[1][0] - pontos[0][0], pontos[1][1] - pontos[0][1]);
  const tangentes = pontos.map((p, k) => {
    if (k === 0) return [(ex / norma) * dist0, (ey / norma) * dist0];
    const ant = pontos[k - 1];
    if (k === pontos.length - 1) return [p[0] - ant[0], p[1] - ant[1]];
    const prox = pontos[k + 1];
    return [(prox[0] - ant[0]) / 2, (prox[1] - ant[1]) / 2];
  });
  const curvas = [];
  for (let k = 0; k < pontos.length - 1; k++) {
    const [ax, ay] = pontos[k];
    const [bx, by] = pontos[k + 1];
    const [tax, tay] = tangentes[k];
    const [tbx, tby] = tangentes[k + 1];
    curvas.push(`C${f(ax + tax / 3)} ${f(ay + tay / 3)} ${f(bx - tbx / 3)} ${f(by - tby / 3)} ${f(bx)} ${f(by)}`);
  }
  return espiral + curvas.join("");
}

// Traço sobre o conteúdo de `alvo` cuja ponta acompanha a altura da tela durante o scroll
export function ScrollStroke({ alvo }) {
  const reduzir = useReducedMotion();
  const pathRef = useRef(null);
  const amostras = useRef(null);
  const [caixa, setCaixa] = useState(null);
  const [semente] = useState(() => Math.floor(Math.random() * 2 ** 32));

  // Mede o alvo e redesenha o caminho quando o tamanho da página muda.
  // useEffect (e não useLayoutEffect): o ref do <main> pai só é ligado depois dos layout effects dos filhos
  useEffect(() => {
    const el = alvo.current;
    if (!el) return;
    const medir = () => setCaixa({ w: el.offsetWidth, h: el.offsetHeight, tela: window.innerHeight });
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(el);
    window.addEventListener("resize", medir);
    return () => { obs.disconnect(); window.removeEventListener("resize", medir); };
  }, [alvo]);

  // Tabela comprimento x maior altura já alcançada, para achar até onde desenhar
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || !caixa) return;
    const total = path.getTotalLength();
    const N = 600;
    const ys = new Float32Array(N + 1);
    let max = -Infinity;
    for (let k = 0; k <= N; k++) {
      max = Math.max(max, path.getPointAtLength((total * k) / N).y);
      ys[k] = max;
    }
    amostras.current = ys;
  }, [caixa]);

  const { scrollY } = useScroll();
  const bruto = useTransform(scrollY, (sy) => {
    const ys = amostras.current;
    const el = alvo.current;
    if (!ys || !el) return 0;
    const tela = window.innerHeight;
    const topo = el.getBoundingClientRect().top + sy;
    const curso = Math.max(el.offsetHeight + topo - tela, 1);
    const p = Math.min(Math.max(sy / curso, 0), 1);
    const ponta = sy - topo + tela * (0.6 + 0.4 * p);
    let lo = 0;
    let hi = ys.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (ys[mid] < ponta) lo = mid + 1;
      else hi = mid;
    }
    return lo / (ys.length - 1);
  });
  const pathLength = useSpring(bruto, { stiffness: 140, damping: 30, mass: 0.4 });

  if (!caixa) return null;

  return (
    <svg className="scroll-stroke" viewBox={`0 0 ${caixa.w} ${caixa.h}`} fill="none" aria-hidden="true">
      <motion.path
        ref={pathRef}
        d={montarCaminho(caixa.w, caixa.h, caixa.tela, semente)}
        stroke="currentColor"
        strokeWidth={Math.max(6, Math.min(12, caixa.w / 140))}
        strokeLinecap="round"
        style={reduzir ? undefined : { pathLength }}
      />
    </svg>
  );
}
