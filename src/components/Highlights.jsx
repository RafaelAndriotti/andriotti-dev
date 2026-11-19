import { useEffect, useRef, useState } from "react";
import Plane from "./Plane";
import { destaques } from "../data/content";
import { reduzMovimento } from "../hooks/useInView";

const INTERVALO = 5000;

export default function Highlights() {
  const trackRef = useRef(null);
  const slidesRef = useRef([]);
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(reduzMovimento);

  const irPara = (i) => {
    const track = trackRef.current;
    const slides = slidesRef.current;
    const alvo = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[alvo].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
  };

  // Marca o slide visível conforme o usuário rola
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setAtual(slidesRef.current.indexOf(e.target));
      }),
      { root: trackRef.current, threshold: 0.6 }
    );
    slidesRef.current.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Avanço automático
  useEffect(() => {
    if (pausado) return;
    const t = setInterval(() => irPara(atual + 1), INTERVALO);
    return () => clearInterval(t);
  }, [pausado, atual]);

  return (
    <section className="highlights" id="destaques" aria-label="Projetos em destaque">
      <div className="container section-head">
        <h2 className="heading">Destaques.</h2>
        <a href="#galeria" className="text-action">Ver serviços <span aria-hidden="true">›</span></a>
      </div>

      <div className="hl-track" ref={trackRef} tabIndex={0} aria-label="Galeria de projetos">
        {destaques.map((d, i) => (
          <article key={d.nome} className="hl-slide" style={{ "--glow": d.hue }} ref={(el) => (slidesRef.current[i] = el)}>
            <p className="hl-claim"><span>{d.nome}</span> {d.frase}</p>
            <Plane variant="slide" hue={d.hue} url={d.url} layout={d.layout} kicker={d.kicker} titulo={d.titulo} botao={d.botao} />
          </article>
        ))}
      </div>

      <div className="hl-controller">
        <div className="hl-dots">
          {destaques.map((d, i) => (
            <button key={d.nome} className={`hl-dot ${i === atual ? "is-active" : ""}`} aria-label={`Projeto ${i + 1}`} aria-current={i === atual} onClick={() => irPara(i)} />
          ))}
        </div>
        <button className={`hl-pause ${pausado ? "is-paused" : ""}`} aria-label={pausado ? "Reproduzir" : "Pausar"} onClick={() => setPausado((p) => !p)}>
          <svg width="12" height="12" viewBox="0 0 12 12" className="i-pause"><rect x="2" y="1" width="3" height="10" rx="1" fill="currentColor" /><rect x="7" y="1" width="3" height="10" rx="1" fill="currentColor" /></svg>
          <svg width="12" height="12" viewBox="0 0 12 12" className="i-play"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
        </button>
      </div>
    </section>
  );
}
