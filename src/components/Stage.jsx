import { forwardRef } from "react";
import Plane from "./Plane";

function WordSculpture({ palavra = "SITES" }) {
  return (
    <svg className="sculpture" viewBox="0 0 1200 360">
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3d" />
          <stop offset="0.38" stopColor="#f5f5f7" />
          <stop offset="0.55" stopColor="#c9ccd1" />
          <stop offset="1" stopColor="#5d6066" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".9" />
          <stop offset="0.3" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="rim" x="-10%" y="-20%" width="120%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <g>
        <text x="600" y="318" className="s-rim" filter="url(#rim)">{palavra}</text>
        <text x="600" y="330" className="s-depth s-depth--2">{palavra}</text>
        <text x="600" y="324" className="s-depth">{palavra}</text>
        <text x="600" y="318" className="s-face">{palavra}</text>
        <text x="600" y="318" className="s-edge">{palavra}</text>
      </g>
    </svg>
  );
}

const Stage = forwardRef(function Stage(_, ref) {
  return (
    <section className="stage" id="topo" aria-label="Abertura" ref={ref}>
      <div className="stage__art" aria-hidden="true">
        <WordSculpture />
        <Plane
          variant="hero"
          hue={168}
          url="vitalis.com.br"
          layout="hero"
          kicker="Agende online"
          titulo="Cuidado que começa antes da consulta."
          texto="Marque seu horário em poucos cliques, sem ligação."
          botao="Agendar agora"
        >
          <div className="pp-cards"><span /><span /><span /></div>
        </Plane>
      </div>

      <div className="stage__bottom container">
        <div className="stage__identity">
          <p className="product-name">Andriotti.dev</p>
          <h1 className="hero-promise">Sites que vendem.</h1>
        </div>
        <div className="platter">
          <div className="platter__price">
            <p className="price">Landing page a partir de R$ 1.200</p>
            <p className="price price--muted">ou em até 3x no cartão</p>
          </div>
          <a className="btn" href="#precos">Pedir orçamento</a>
        </div>
      </div>
    </section>
  );
});

export default Stage;
