import { useState } from "react";
import Reveal from "./Reveal";
import { baselines, provas } from "../data/content";

const icones = {
  phone: (
    <svg viewBox="0 0 64 64" className="pict"><rect x="20" y="6" width="24" height="52" rx="6" fill="none" stroke="currentColor" strokeWidth="3" /><rect x="28" y="50" width="8" height="2.5" rx="1.2" fill="currentColor" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 64 64" className="pict pict--blue"><path d="M10 30c0-11 10-20 22-20s22 9 22 20-10 20-22 20c-3 0-6-.5-8.5-1.5L12 52l3-10c-3-3.5-5-7.5-5-12z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" /><circle cx="23" cy="30" r="2.5" fill="currentColor" /><circle cx="32" cy="30" r="2.5" fill="currentColor" /><circle cx="41" cy="30" r="2.5" fill="currentColor" /></svg>
  ),
  panel: (
    <svg viewBox="0 0 64 64" className="pict"><rect x="8" y="12" width="48" height="36" rx="5" fill="none" stroke="currentColor" strokeWidth="3" /><path d="M24 56h16M32 48v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path d="M20 36l14-14 6 6-14 14h-6z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" /></svg>
  ),
};

export default function Comparison() {
  const [base, setBase] = useState(baselines[0].value);

  return (
    <section className="chapter" id="comparar" aria-label="Comparação">
      <div className="container">
        <div className="compare">
          <div className="compare__head">
            <h2 className="heading-lg">Por que fazer<br />comigo?</h2>
            <label className="selector">
              <span className="selector__label">Comparar com</span>
              <span className="selector__field">
                <select value={base} onChange={(e) => setBase(e.target.value)}>
                  {baselines.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </span>
            </label>
          </div>
          <div className="proof-grid">
            {provas.map((p, i) => (
              <Reveal key={i} className={`proof ${p.tipo === "icone" ? "proof--icon" : ""}`}>
                {p.tipo === "numero" ? (
                  <>
                    <p className="heading">{p.valor}</p>
                    <p className="proof__q">{p.texto}</p>
                  </>
                ) : (
                  <>
                    {icones[p.icone]}
                    <p className="proof__q"><strong>{p.destaque}</strong> {p.texto}</p>
                  </>
                )}
                <p className="proof__vs" aria-live="polite">{p.vs[base]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
