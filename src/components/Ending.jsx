import Reveal from "./Reveal";
import { contato } from "../data/content";

export function Directory() {
  return (
    <section className="directory" id="contato" aria-label="Continue explorando">
      <div className="container">
        <h2 className="heading">Continue explorando.</h2>
        <Reveal className="directory__cols">
          <div>
            <p className="directory__label">Navegar</p>
            <a className="directory__big" href="#destaques">Projetos</a>
            <a className="directory__big" href="#servicos">Serviços</a>
            <a className="directory__big" href="#precos">Preços</a>
            <a className="directory__big" href="#sobre">Sobre</a>
          </div>
          <div>
            <p className="directory__label">Contato</p>
            <a className="directory__link" href={contato.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
            <a className="directory__link" href={`mailto:${contato.email}`}>{contato.email}</a>
          </div>
          <div>
            <p className="directory__label">Redes</p>
            {contato.redes.map((r) => (
              <a key={r.nome} className="directory__link" href={r.url} target="_blank" rel="noopener">{r.nome}</a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__terms">
          Valores de referência. O orçamento final depende do escopo do projeto. Parcelamento sujeito às condições da operadora do cartão.
        </p>
        <p className="footer__help">
          Quer conversar antes? <a href={contato.whatsapp} target="_blank" rel="noopener">Chame no WhatsApp</a> ou escreva para{" "}
          <a href={`mailto:${contato.email}`}>{contato.email}</a>.
        </p>
        <div className="footer__legal">
          <span>© {new Date().getFullYear()} Andriotti.dev. Todos os direitos reservados.</span>
          <span>Brasil</span>
        </div>
      </div>
    </footer>
  );
}
