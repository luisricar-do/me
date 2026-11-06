/**
 * O que eu construí. Cada item diz o que é, para quem, com o quê e onde ver.
 * `href` é o projeto no ar, `repo` o código, `caseHref` o case dentro do site.
 *
 * Os rascunhos, no fim, são espaços que ainda vou preencher: aparecem só no
 * `npm run dev`, com o selo de rascunho, e o build de produção nem leva o
 * texto deles. Para publicar, completa os campos, tira o `draft` e move o
 * item para a lista de cima.
 */
const published = [
  {
    id: "este-site",
    kind: "Site",
    title: "luisr.com.br",
    summary:
      "Este site. Uma página rolável, um desktop com janelas no computador, um app no celular e um terminal que aceita comandos, todos lendo o mesmo conteúdo. Cada rota sai pré-renderizada com as próprias meta tags.",
    stack: ["React", "Vite", "Tailwind", "GitHub Actions"],
    href: "https://luisr.com.br",
    repo: "https://github.com/luisricar-do/me",
    year: 2026,
  },
  {
    id: "regua",
    kind: "IA",
    title: "Régua de autonomia",
    summary:
      "A ferramenta da palestra no HackTown 2026: seis perguntas sobre uma tarefa dizem quanta autonomia a IA pode ter nela, de copiloto a autônomo. O resultado vira link e card para compartilhar.",
    stack: ["React", "IA aplicada"],
    caseHref: "/ia",
    year: 2026,
  },
  {
    id: "streamline",
    kind: "Sistema",
    title: "Streamline",
    summary:
      "A evolução do EduFlow para dentro da empresa: plataforma de automação de processos e workflows para cortar trabalho operacional repetido. Virou a plataforma oficial da Tech for Humans, com mais de 50 processos automatizados e 10 mil blocos processados, e hoje é open source.",
    stack: ["Node.js", "React", "Azure", "Low-code"],
    repo: "https://github.com/tech4humans-brasil/streamline",
    year: 2024,
  },
  {
    id: "eduflow",
    kind: "Sistema",
    title: "EduFlow",
    summary:
      "Sistema low-code para gestão de TCCs: submissão, avaliação em várias etapas e acompanhamento. Testado com usuários e publicado no IEEE IISA 2025.",
    stack: ["React", "Node.js", "Low-code"],
    caseHref: "/eduflow",
    year: 2025,
  },
  {
    id: "volei-cidadao",
    kind: "Site",
    title: "Vôlei Cidadão",
    summary:
      "Site do projeto social que, há 11 anos, oferece vôlei gratuito a jovens de 9 a 17 anos em São Bento do Sapucaí. Conta a história, mostra conquistas, horários e vídeos do time, e leva as famílias direto para a lista de espera.",
    stack: ["React", "TypeScript", "Tailwind", "GitHub Pages"],
    href: "https://voleicidadao.com.br",
    repo: "https://github.com/luisricar-do/volei-cidadao",
    year: 2026,
  },
]

// import.meta.env.DEV vira false no build e o minificador descarta a lista
const drafts = import.meta.env.DEV
  ? [
      {
        id: "rascunho-ia",
        draft: true,
        kind: "IA",
        title: "Agente ou integração com IA",
        summary:
          "Problema, o que foi construído e o resultado medido. Sem nome de cliente se não puder.",
        stack: ["LLMs", "MCP"],
        year: 2026,
      },
      {
        id: "rascunho-infra",
        draft: true,
        kind: "Infra",
        title: "Cloud e DevOps",
        summary: "A área de DevOps que fundei: o que existia antes, o que montei e o que mudou.",
        stack: ["AWS", "Azure", "CI/CD", "Observabilidade"],
        year: 2023,
      },
      {
        id: "rascunho-site",
        draft: true,
        kind: "Site",
        title: "Site ou sistema para cliente",
        summary: "Para quem foi, o que precisava e o que entreguei.",
        stack: [],
        year: 2026,
      },
    ]
  : []

export const projects = [...published, ...drafts]
