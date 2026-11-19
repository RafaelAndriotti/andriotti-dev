// Todo o conteúdo editável do site fica aqui.
// Troque os valores marcados como exemplo antes de publicar.

export const contato = {
  // Exemplo: troque pelo seu número com DDI + DDD
  whatsapp: "https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento%20de%20site.",
  email: "contato@andriotti.dev",
  redes: [
    { nome: "GitHub", url: "https://github.com/RafaelAndriotti" },
    { nome: "LinkedIn", url: "https://linkedin.com/" },
    { nome: "Instagram", url: "https://instagram.com/" },
  ],
};

export const navegacao = [
  { href: "#destaques", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#precos", label: "Preços" },
  { href: "#faq", label: "Dúvidas" },
];

// Projetos de exemplo no carrossel de destaques
export const destaques = [
  { nome: "Clínica Vitalis.", frase: "Agendamentos que chegam sozinhos.", url: "vitalis.com.br", hue: 168, layout: "hero", kicker: "Agende online", titulo: "Cuidado que começa antes da consulta.", botao: "Agendar" },
  { nome: "JK Eletrônicos.", frase: "Uma vitrine aberta 24 horas.", url: "jkeletronicos.com.br", hue: 220, layout: "shop" },
  { nome: "Din-Din.", frase: "As contas do mês num só lugar.", url: "app.dindin.com.br", hue: 145, layout: "dash" },
  { nome: "Atendimento Guaíba.", frase: "Respostas a qualquer hora.", url: "wa.guaiba.com.br", hue: 280, layout: "chat" },
];

export const servicos = [
  { titulo: "Landing pages.", texto: "Uma página com até 8 seções, focada em vender, captar contatos ou divulgar um evento.", hue: 25, largo: true, plane: { variant: "card", layout: "hero", titulo: "Uma oferta. Um botão.", botao: "Quero" } },
  { titulo: "Sites institucionais.", texto: "Até 6 páginas e um painel para você editar textos e imagens.", hue: 205, plane: { variant: "tall", layout: "stack", titulo: "Sobre nós" } },
  { titulo: "Lojas e sistemas.", texto: "E-commerce, agendamentos e painéis sob medida, com Pix, cartão e WhatsApp integrados.", hue: 330, largo: true, plane: { variant: "card", layout: "shop", lojaItens: 4 } },
  { titulo: "Manutenção.", texto: "Ajustes, novas seções, atualizações e backup, a partir de R$ 150 por mês.", hue: 50, plane: { variant: "tall", layout: "check", kicker: "Manutenção", titulo: "Tudo em dia." } },
];

export const timeline = [
  { periodo: "2025 — hoje.", texto: "Andriotti.dev: sites e sistemas para clientes de diversos segmentos." },
  { periodo: "2023 — 2025.", texto: "Desenvolvedor front-end em interfaces web e sistemas internos." },
  { periodo: "2021 — 2023.", texto: "Formação em tecnologia e primeiros projetos freelance." },
];

export const ferramentas = ["HTML", "CSS", "JavaScript", "React", "Node.js", "WordPress", "Figma"];

export const baselines = [
  { value: "template", label: "Template pronto" },
  { value: "sozinho", label: "Fazer sozinho" },
  { value: "agencia", label: "Agência grande" },
];

// Exemplo: revise as comparações para o que você pode afirmar
export const provas = [
  { tipo: "numero", valor: "7 dias", texto: "para sua landing page ficar pronta.",
    vs: { template: "Template: semanas ajustando tema e plugins.", sozinho: "Sozinho: depende do seu tempo livre.", agencia: "Agência: fila de projetos e prazos maiores." } },
  { tipo: "icone", icone: "phone", destaque: "Responsivo.", texto: "Pensado primeiro para o celular.",
    vs: { template: "Template: nem sempre funciona bem no celular.", sozinho: "Sozinho: testar cada tela fica com você.", agencia: "Agência: também entrega, normalmente por mais." } },
  { tipo: "numero", valor: "30 dias", texto: "de suporte incluídos após a entrega.",
    vs: { template: "Template: suporte só do tema, não do seu site.", sozinho: "Sozinho: o suporte é você.", agencia: "Agência: costuma ser cobrado à parte." } },
  { tipo: "icone", icone: "chat", destaque: "Contato direto.", texto: "Você fala comigo, não com um ticket.",
    vs: { template: "Template: fórum ou chat do fornecedor.", sozinho: "Sozinho: tutoriais e tentativa e erro.", agencia: "Agência: atendimento por intermediário." } },
  { tipo: "numero", valor: "3x", texto: "no cartão, ou Pix com 50% na entrega.",
    vs: { template: "Template: licença anual, mais o seu tempo.", sozinho: "Sozinho: sem custo de serviço, mas com as suas horas.", agencia: "Agência: valores maiores e contratos longos." } },
  { tipo: "icone", icone: "panel", destaque: "Painel de edição.", texto: "Troque textos e fotos sem depender de ninguém.",
    vs: { template: "Template: painel genérico, cheio de opções.", sozinho: "Sozinho: você monta e mantém o painel.", agencia: "Agência: depende do contrato." } },
];

// Exemplo: ajuste os valores reais
export const planos = [
  { nome: "Landing page", preco: "A partir de R$ 1.200", acao: "Escolher",
    linhas: { Páginas: "1, com até 8 seções", Prazo: "Até 7 dias", "Painel de edição": "—", SEO: "Básico", Suporte: "30 dias" } },
  { nome: "Site institucional", preco: "A partir de R$ 2.500", acao: "Escolher", destaque: "Mais pedido",
    linhas: { Páginas: "Até 6", Prazo: "Até 20 dias", "Painel de edição": "Incluído", SEO: "Completo + Analytics", Suporte: "30 dias" } },
  { nome: "Loja ou sistema", preco: "Sob consulta", acao: "Conversar",
    linhas: { Páginas: "Conforme escopo", Prazo: "Conforme escopo", "Painel de edição": "Incluído", SEO: "Completo + Analytics", Suporte: "30 dias" } },
];

export const ofertas = [
  { rotulo: "Pagamento", titulo: "Pague em até 3x no cartão.", mais: "Ou via Pix: 50% para começar e 50% na entrega.", arte: "card" },
  { rotulo: "Suporte", titulo: "30 dias de ajustes depois de no ar.", mais: "Correções e pequenos ajustes de texto e imagem sem custo extra.", arte: "chat" },
  { rotulo: "Publicação", titulo: "Domínio e hospedagem configurados.", mais: "Eu ajudo a registrar o domínio e entrego tudo funcionando. Os serviços ficam no seu nome.", arte: "globe" },
  { rotulo: "Manutenção", titulo: "Seu site sempre em dia.", mais: "Planos a partir de R$ 150 por mês, com atualizações, backup e novas seções.", arte: "check" },
];

export const perguntas = [
  { p: "Preciso ter domínio e hospedagem?", r: "Não. Eu ajudo a registrar o domínio e configuro a hospedagem. Os custos desses serviços ficam no seu nome." },
  { p: "Consigo editar o site depois?", r: "Sim. No site institucional você recebe um painel para editar textos e imagens. Na landing page, ajustes entram na manutenção." },
  { p: "Como é o pagamento?", r: "50% para iniciar e 50% na entrega, via Pix ou cartão em até 3x." },
  { p: "E se eu não gostar do design?", r: "Cada etapa passa pela sua aprovação, com rodadas de ajuste incluídas antes de seguir." },
];
