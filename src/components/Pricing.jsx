import { useState } from "react";
import Reveal from "./Reveal";
import { contato, planos, ofertas, perguntas } from "../data/content";

function Model({ plano }) {
  return (
    <Reveal as="article" className={`model ${plano.destaque ? "model--featured" : ""}`}>
      {plano.destaque && <p className="model__badge">{plano.destaque}</p>}
      <h3 className="card-heading">{plano.nome}</h3>
      <p className="model__price">{plano.preco}</p>
      <a href={contato.whatsapp} target="_blank" rel="noopener" className="btn btn--sm">{plano.acao}</a>
      <dl className="model__rows">
        {Object.entries(plano.linhas).map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </Reveal>
  );
}

function OfferArt({ tipo }) {
  const pecas = { card: 1, chat: 2, globe: 1, check: 3 }[tipo];
  return (
    <div className={`offer__art offer__art--${tipo}`} aria-hidden="true">
      {Array.from({ length: pecas }, (_, i) => <span key={i} />)}
    </div>
  );
}

function Offer({ oferta }) {
  const [aberto, setAberto] = useState(false);
  return (
    <article className={`offer ${aberto ? "is-open" : ""}`}>
      <div className="offer__copy">
        <p className="offer__label">{oferta.rotulo}</p>
        <h3 className="card-heading">{oferta.titulo}</h3>
        <p className="body offer__more">{oferta.mais}</p>
      </div>
      <OfferArt tipo={oferta.arte} />
      <button
        className="offer__toggle"
        aria-expanded={aberto}
        aria-label={aberto ? "Fechar detalhes" : "Mais detalhes"}
        onClick={() => setAberto((a) => !a)}
      >+</button>
    </article>
  );
}

export default function Pricing() {
  return (
    <section className="light" id="precos" aria-label="Preços">
      <div className="container section-head">
        <h2 className="heading">Escolha o seu.</h2>
        <a className="text-action text-action--light" href={contato.whatsapp} target="_blank" rel="noopener">
          Fale comigo no WhatsApp <span aria-hidden="true">›</span>
        </a>
      </div>

      <div className="container models">
        {planos.map((p) => <Model key={p.nome} plano={p} />)}
      </div>

      <div className="container section-head section-head--spaced">
        <h2 className="heading">Tudo incluído.</h2>
      </div>
      <div className="offer-track" tabIndex={0} aria-label="Benefícios">
        {ofertas.map((o) => <Offer key={o.rotulo} oferta={o} />)}
      </div>

      <div className="container faq" id="faq">
        <h2 className="heading">Vale o investimento? Vale.</h2>
        <Reveal className="faq__list">
          {perguntas.map((q) => (
            <details key={q.p}>
              <summary>{q.p}</summary>
              <p className="body">{q.r}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
