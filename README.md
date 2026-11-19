# Andriotti.dev

Landing page de serviços de criação de sites. HTML, CSS e JS puros, sem build.

## Rodar local

Abra `index.html` no navegador, ou:

```bash
npx serve .
```

## Deploy (GitHub Pages)

Todo push na branch `main` publica o site via `.github/workflows/deploy.yml`.

1. Crie o repositório no GitHub e faça o push.
2. No repositório: **Settings → Pages → Source: GitHub Actions**.
3. O link aparece na aba **Actions** após o primeiro deploy.

### Domínio próprio (andriotti.dev)

1. Crie um arquivo `CNAME` na raiz com o conteúdo `andriotti.dev`.
2. No DNS do domínio, aponte registros `A` para `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (e `CNAME www` para `<usuario>.github.io`).
3. Em **Settings → Pages**, informe o domínio e marque **Enforce HTTPS**.

## O que trocar antes de publicar

- Número do WhatsApp (`wa.me/5500000000000`) e e-mail em `index.html`.
- Valores, estatísticas, projetos e linha do tempo (são exemplos).
- Links de GitHub, LinkedIn e Instagram no rodapé.
