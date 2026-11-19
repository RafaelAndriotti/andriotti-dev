// Mockup de site usado no palco, nos destaques e na galeria (decorativo)

function Nav({ links = 2 }) {
  return (
    <div className="pp-nav">
      <b />
      {Array.from({ length: links }, (_, i) => <span key={i} />)}
      <em />
    </div>
  );
}

function Conteudo({ layout, kicker, titulo, texto, botao, lojaItens = 8 }) {
  switch (layout) {
    case "hero":
      return (
        <>
          <Nav links={3} />
          <div className="pp-hero">
            <div>
              {kicker && <p className="pp-kicker">{kicker}</p>}
              <p className="pp-title">{titulo}</p>
              {texto && <p className="pp-text">{texto}</p>}
              <span className="pp-btn">{botao}</span>
            </div>
            <div className="pp-photo" />
          </div>
        </>
      );
    case "shop":
      return (
        <>
          <Nav />
          <div className="pp-shop">{Array.from({ length: lojaItens }, (_, i) => <span key={i} />)}</div>
        </>
      );
    case "dash":
      return (
        <div className="pp-dash">
          <aside />
          <div className="pp-kpis"><span /><span /><span /></div>
          <div className="pp-bars">
            {[45, 70, 55, 85, 62, 92, 74].map((h) => <b key={h} style={{ "--h": `${h}%` }} />)}
          </div>
        </div>
      );
    case "chat":
      return (
        <div className="pp-chat">
          <span className="in">Olá! Como posso ajudar?</span>
          <span className="out">Quero saber os horários.</span>
          <span className="in">Abrimos das 8h às 18h. Quer agendar?</span>
          <span className="out">Quero!</span>
        </div>
      );
    case "stack":
      return (
        <>
          <Nav links={0} />
          <p className="pp-title">{titulo}</p>
          <div className="pp-cards pp-cards--stack"><span /><span /><span /></div>
        </>
      );
    case "check":
      return (
        <>
          {kicker && <p className="pp-kicker">{kicker}</p>}
          <p className="pp-title">{titulo}</p>
          <div className="pp-check"><span /><span /><span /><span /></div>
        </>
      );
    default:
      return null;
  }
}

export default function Plane({ variant = "slide", hue, url, children, ...conteudo }) {
  const comBarra = variant !== "tall";
  return (
    <div className={`plane plane--${variant}`} aria-hidden="true">
      {comBarra && (
        <div className="plane__bar">
          <i /><i /><i />
          {url && <span>{url}</span>}
        </div>
      )}
      <div className="plane__page" style={{ "--hue": hue }}>
        <Conteudo {...conteudo} />
        {children}
      </div>
    </div>
  );
}
