# Portfólio Pessoal

Portfólio single-page com React 18, Vite, Tailwind CSS e Framer Motion.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS** (v4 com `@tailwindcss/vite`)
- **Framer Motion** — animações e parallax
- **Lucide React** — ícones
- **date-fns** — formatação de datas (ex.: projetos)
- **React Router DOM** — instalado; use se adicionar mais rotas

## Estrutura de pastas

```
src/
├── components/
│   ├── layout/       # Header, Footer
│   ├── sections/     # Hero, About, Projects, Contact
│   └── ui/           # Button, SectionTitle
├── data/             # site.js, projects.js (conteúdo editável)
├── hooks/            # useParallax, useScrollProgress
├── pages/            # Home (agrupa as seções)
├── App.jsx
├── main.jsx
└── index.css         # Tailwind + tema (cores, fontes)
```

## Como rodar

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Personalizar

1. **Dados do site** — edite `src/data/site.js` (nome, tagline, email, redes).
2. **Projetos** — edite `src/data/projects.js` (título, descrição, tags, link, data).
3. **Cores e fontes** — em `src/index.css` no bloco `@theme` (e no `index.html` se trocar fontes do Google Fonts).

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy-pages.yml` faz o deploy automático ao dar push na branch `main`.

**Configuração no repositório:**

1. **Settings** → **Pages** → **Build and deployment**
2. Em **Source**, escolha **GitHub Actions**.

Depois do primeiro push (ou execução manual do workflow), o site fica em:

**https://luisricar-do.github.io/me/**

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção em `dist/`
- `npm run preview` — preview do build
