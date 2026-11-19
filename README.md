# Andriotti.dev

Landing page de serviços de criação de sites, feita com React + Vite.

## Rodar local

```bash
npm install
npm run dev
```

Build de produção: `npm run build` (gera `dist/`). Para conferir o build: `npm run preview`.

## Estrutura

- `src/data/content.js` — todo o conteúdo editável: contato, projetos, serviços, preços, comparações, FAQ.
- `src/components/` — uma seção da página por componente (`Stage`, `Highlights`, `Comparison`, `Pricing`...).
- `src/styles.css` — estilos e tokens de design.
- `versions/` — versões antigas do design em HTML puro, só para referência (não vão para o deploy).

## Deploy (GitHub Pages)

Todo push na branch `main` roda `npm ci`, `npm run build` e publica a pasta `dist/` via `.github/workflows/deploy.yml`.

1. No repositório: **Settings → Pages → Source: GitHub Actions**.
2. O link aparece na aba **Actions** após o primeiro deploy.

### Domínio próprio (andriotti.dev)

1. Crie um arquivo `CNAME` na raiz com o conteúdo `andriotti.dev` (o workflow copia ele para o build).
2. No DNS do domínio, aponte registros `A` para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (e `CNAME www` para `<usuario>.github.io`).
3. Em **Settings → Pages**, informe o domínio e marque **Enforce HTTPS**.

## O que trocar antes de publicar

Tudo em `src/data/content.js`:

- Número do WhatsApp (`wa.me/5500000000000`) e e-mail.
- Valores, comparações, projetos e linha do tempo (são exemplos).
- Links de LinkedIn e Instagram.
