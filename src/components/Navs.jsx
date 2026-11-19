import { navegacao } from "../data/content";
import { Dock, DockItem } from "./ui/dock";

// Barra superior fixa. Os links crescem conforme o cursor passa (efeito dock).
export function GlobalNav() {
  return (
    <header className="globalnav">
      <div className="globalnav__inner">
        <a href="#topo" className="globalnav__brand">andriotti.dev</a>
        <Dock as="nav" className="globalnav__links" aria-label="Principal">
          {navegacao.map((n) => (
            <DockItem key={n.href} href={n.href}>{n.label}</DockItem>
          ))}
        </Dock>
        <a href="#precos" className="globalnav__cta">Orçamento</a>
      </div>
    </header>
  );
}
