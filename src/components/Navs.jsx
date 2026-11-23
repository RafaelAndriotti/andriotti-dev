import { useEffect, useState } from "react";
import { navegacao } from "../data/content";
import { Dock, DockItem } from "./ui/dock";

// Barra superior fixa. Os links crescem conforme o cursor passa (efeito dock).
// No celular os links ficam num menu que abre pelo botão de três linhas.
export function GlobalNav() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const fecharNoEsc = (e) => e.key === "Escape" && setAberto(false);
    const fecharSeDesktop = () => window.innerWidth > 734 && setAberto(false);
    window.addEventListener("keydown", fecharNoEsc);
    window.addEventListener("resize", fecharSeDesktop);
    return () => {
      window.removeEventListener("keydown", fecharNoEsc);
      window.removeEventListener("resize", fecharSeDesktop);
    };
  }, [aberto]);

  const fechar = () => setAberto(false);

  return (
    <header className={`globalnav${aberto ? " is-open" : ""}`}>
      <div className="globalnav__inner">
        <a href="#topo" className="globalnav__brand" onClick={fechar}>andriotti.dev</a>
        <Dock as="nav" className="globalnav__links" aria-label="Principal">
          {navegacao.map((n) => (
            <DockItem key={n.href} href={n.href}>{n.label}</DockItem>
          ))}
        </Dock>
        <div className="globalnav__actions">
          <a href="#precos" className="globalnav__cta" onClick={fechar}>Orçamento</a>
          <button
            type="button"
            className="globalnav__toggle"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <nav id="menu-mobile" className="globalnav__menu" aria-label="Principal (celular)" hidden={!aberto}>
        <ul>
          {navegacao.map((n) => (
            <li key={n.href}><a href={n.href} onClick={fechar}>{n.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
