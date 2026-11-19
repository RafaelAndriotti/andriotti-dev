import { useEffect, useRef, useState } from "react";
import Plane from "./Plane";
import Reveal from "./Reveal";
import { useInView } from "../hooks/useInView";
import { servicos, timeline, ferramentas } from "../data/content";

export function Overview() {
  return (
    <section className="chapter chapter--center" aria-label="Visão geral">
      <Reveal className="copy-column">
        <p className="eyebrow">Visão geral</p>
        <h2 className="display">Bonito é só o começo.</h2>
        <p className="lead">
          Um bom site não fica parado esperando visita.{" "}
          <span className="lead--bright">Ele explica o que você faz, mostra por que confiar em você e leva o visitante até o contato</span>{" "}
          — no celular, no computador e no Google.
        </p>
      </Reveal>
    </section>
  );
}

export function ServicesMacro() {
  return (
    <section className="chapter" id="servicos" aria-label="Serviços">
      <Reveal className="container">
        <p className="eyebrow">Serviços</p>
        <h2 className="display">Uma página.<br />Um objetivo.</h2>
        <p className="lead lead--left">
          Cada seção é escrita e desenhada para um único próximo passo.{" "}
          <span className="lead--bright">Sem distração, sem link perdido, sem botão escondido.</span>
        </p>
      </Reveal>
      <Reveal className="container">
        <div className="macro" aria-hidden="true">
          <div className="macro__pill">Pedir orçamento</div>
          <svg className="macro__cursor" viewBox="0 0 40 56">
            <path d="M2 2 L2 44 L12 34 L19 52 L27 48 L20 31 L35 31 Z" fill="#f5f5f7" stroke="#1d1d1f" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="media-caption">
          <strong>Feito para o clique.</strong> Botões com o tamanho certo para o dedo, contraste para qualquer tela e o caminho mais curto até o seu WhatsApp.
        </p>
      </Reveal>
    </section>
  );
}

export function ServicesGallery() {
  const trackRef = useRef(null);
  const [limites, setLimites] = useState({ inicio: true, fim: false });

  const atualizar = () => {
    const t = trackRef.current;
    if (!t) return;
    setLimites({ inicio: t.scrollLeft <= 2, fim: t.scrollLeft >= t.scrollWidth - t.clientWidth - 2 });
  };

  useEffect(() => {
    atualizar();
    addEventListener("resize", atualizar);
    return () => removeEventListener("resize", atualizar);
  }, []);

  const rolar = (dir) => trackRef.current.scrollBy({ left: dir * 392, behavior: "smooth" });

  return (
    <section className="chapter chapter--charcoal" id="galeria" aria-label="O que eu faço">
      <div className="container">
        <h2 className="heading">O que eu faço.</h2>
      </div>
      <div className="cg-track" ref={trackRef} onScroll={atualizar} tabIndex={0} aria-label="Galeria de serviços">
        {servicos.map((s) => (
          <figure key={s.titulo} className={`cg-item ${s.largo ? "cg-item--wide" : ""}`}>
            <div className="cg-media" style={{ "--glow": s.hue }}>
              <Plane hue={s.hue} {...s.plane} />
            </div>
            <figcaption className="media-caption"><strong>{s.titulo}</strong> {s.texto}</figcaption>
          </figure>
        ))}
      </div>
      <div className="container paddles">
        <button className="paddle" aria-label="Anterior" disabled={limites.inicio} onClick={() => rolar(-1)}>
          <svg width="36" height="36" viewBox="0 0 36 36"><path d="M20.5 12 14.5 18l6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className="paddle" aria-label="Próximo" disabled={limites.fim} onClick={() => rolar(1)}>
          <svg width="36" height="36" viewBox="0 0 36 36"><path d="m15.5 12 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </section>
  );
}

export function Performance() {
  const [ref, visivel] = useInView({ threshold: 0.4 });
  return (
    <section className="chapter chapter--center" aria-label="Desempenho">
      <Reveal className="copy-column">
        <p className="eyebrow">Desempenho</p>
        <h2 ref={ref} className={`display display--light ${visivel ? "is-swept" : ""}`}>Rápido. De verdade.</h2>
        <p className="lead">
          Imagens otimizadas, código enxuto e nada de plugin desnecessário.{" "}
          <span className="lead--bright">Seu site abre rápido no 4G e já nasce preparado para aparecer no Google.</span>
        </p>
        <div className="chip" aria-hidden="true"><span>SEO</span></div>
      </Reveal>
    </section>
  );
}

export function About() {
  return (
    <section className="chapter chapter--charcoal" id="sobre" aria-label="Sobre">
      <Reveal className="container about">
        <div>
          <p className="eyebrow">Sobre</p>
          <h2 className="display">Prazer,<br />Andriotti.</h2>
        </div>
        <div className="about__text">
          <p className="lead lead--left">
            Sou desenvolvedor web e trabalho com pequenos negócios e profissionais que querem ser encontrados.{" "}
            <span className="lead--bright">Eu cuido do design, do código e da publicação. Você cuida do seu negócio.</span>
          </p>
          <ul className="timeline">
            {timeline.map((t) => (
              <li key={t.periodo} className="caption-strong"><strong>{t.periodo}</strong> <span>{t.texto}</span></li>
            ))}
          </ul>
          <p className="body tools">{ferramentas.join(" · ")}</p>
        </div>
      </Reveal>
    </section>
  );
}
