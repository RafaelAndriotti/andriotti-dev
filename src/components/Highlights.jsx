import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Plane from "./Plane";
import { destaques } from "../data/content";

// Cada card fica preso no topo e encolhe um pouco quando o próximo chega por cima
function DeckCard({ d, i, total, progresso }) {
  const reduzir = useReducedMotion();
  const escalaFinal = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progresso, [i / total, 1], [1, escalaFinal]);

  return (
    <div className="deck__item" style={{ "--i": i }}>
      <motion.article className="deck-card" style={{ "--glow": d.hue, ...(reduzir ? {} : { scale }) }}>
        <div className="deck-card__info">
          <span className="deck-card__num">{String(i + 1).padStart(2, "0")}</span>
          <p className="hl-claim"><span>{d.nome}</span> {d.frase}</p>
          <p className="deck-card__url">{d.url}</p>
        </div>
        <Plane variant="slide" hue={d.hue} url={d.url} layout={d.layout} kicker={d.kicker} titulo={d.titulo} botao={d.botao} />
      </motion.article>
    </div>
  );
}

export default function Highlights() {
  const deckRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ["start start", "end end"] });

  return (
    <section className="highlights" id="destaques" aria-label="Projetos em destaque">
      <div className="container section-head">
        <h2 className="heading">Destaques.</h2>
        <a href="#galeria" className="text-action">Ver serviços <span aria-hidden="true">›</span></a>
      </div>

      <div className="deck container" ref={deckRef}>
        {destaques.map((d, i) => (
          <DeckCard key={d.nome} d={d} i={i} total={destaques.length} progresso={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
