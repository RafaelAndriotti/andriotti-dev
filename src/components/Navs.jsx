import { navegacao } from "../data/content";

export function GlobalNav() {
  return (
    <header className="globalnav">
      <div className="globalnav__inner">
        <a href="#topo" className="globalnav__brand">andriotti.dev</a>
        <nav className="globalnav__links" aria-label="Principal">
          {navegacao.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <a href="#precos" className="globalnav__cta">Orçamento</a>
      </div>
    </header>
  );
}

// Barra flutuante que aparece depois da abertura
export function LocalNav({ visivel }) {
  return (
    <nav className={`localnav ${visivel ? "is-visible" : ""}`} aria-label="Atalhos">
      <span className="localnav__name">Andriotti.dev</span>
      <div className="localnav__right">
        <a href="#servicos" className="localnav__link">Serviços</a>
        <a href="#comparar" className="localnav__link">Comparar</a>
        <a href="#precos" className="btn btn--xs">Orçamento</a>
      </div>
    </nav>
  );
}
