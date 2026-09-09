import { site } from "../data/site"
import { about } from "../data/about"
import { talks, talkKinds } from "../data/talks"
import { publications } from "../data/publications"
import { projects } from "../data/projects"
import { timelineEntries } from "../data/timeline"

const SECTIONS = [
  ["sobre", "quem sou e o que faço"],
  ["destaques", "projetos de impacto e publicações"],
  ["palestras", "palcos, mentorias e presenças"],
  ["projetos", "trabalhos recentes"],
  ["trajetoria", "linha do tempo"],
  ["contato", "como me achar"],
]

const FILES = {
  "me.txt": () => [
    { kind: "accent", text: "# whoami" },
    { kind: "out", text: `${site.role} · ${site.company}` },
    { kind: "muted", text: "DPO: governança de dados e conformidade com a LGPD" },
  ],
  "palestras.md": () =>
    talks.flatMap((talk) => [
      { kind: "accent", text: `## ${talk.title}` },
      { kind: "muted", text: `${talkKinds[talk.kind]} · ${talk.event} · ${talk.dateLabel}` },
      ...(talk.thesis ? [{ kind: "out", text: `“${talk.thesis}”` }] : []),
      { kind: "blank", text: "" },
    ]),
  "publicacoes.md": () =>
    publications.flatMap((paper) => [
      { kind: "accent", text: `## ${paper.venue}` },
      { kind: "out", text: paper.title },
      { kind: "muted", text: `${paper.place} · ${paper.status}` },
      { kind: "blank", text: "" },
    ]),
  "stack.md": () =>
    about.stack.map((group) => ({
      kind: "out",
      text: `${group.area.padEnd(12)} ${group.items.join(" · ")}`,
    })),
  "projetos.md": () =>
    projects.map((project) => ({
      kind: "out",
      text: `${project.dateFormatted().padEnd(20)} ${project.title}`,
    })),
  "trajetoria.md": () => {
    const recent = [...timelineEntries].reverse().slice(0, 6)
    return [
      { kind: "muted", text: `${timelineEntries.length} marcos entre 2017 e 2026. Os últimos:` },
      ...recent.map((entry) => ({
        kind: "out",
        text: `${entry.date.padEnd(22)} ${entry.title}`,
      })),
      { kind: "muted", text: "veja a lista completa em #trajetoria" },
    ]
  },
}

const HELP = [
  ["help", "esta lista"],
  ["whoami", "quem sou e o que faço"],
  ["ls", "seções do site"],
  ["cat <arquivo>", `${Object.keys(FILES).join(", ")}`],
  ["open <seção>", "rola até a seção"],
  ["ia", "abre a régua de autonomia"],
  ["ia --run", "roda a régua aqui no terminal"],
  ["expand", "abre o terminal em tela cheia"],
  ["collapse", "volta ao tamanho normal (ou esc)"],
  ["theme", "alterna claro e escuro"],
  ["contato", "meu email"],
  ["clear", "limpa a tela"],
]

const pad = (value, size) => String(value).padEnd(size)

/**
 * Interpreta um comando e devolve as linhas de saída e, quando houver, um
 * efeito para o componente executar (navegar, trocar tema, limpar).
 * Toda a informação vem de src/data, então o terminal nunca desatualiza.
 */
export function runCommand(raw) {
  const input = raw.trim()
  if (!input) return { lines: [] }

  const [command, ...args] = input.split(/\s+/)
  const argument = args.join(" ")
  const name = command.toLowerCase()

  switch (name) {
    case "help":
    case "?":
      return {
        lines: [
          { kind: "muted", text: "comandos disponíveis:" },
          ...HELP.map(([cmd, description]) => ({
            kind: "out",
            text: `  ${pad(cmd, 16)}${description}`,
          })),
        ],
      }

    case "whoami":
      return {
        lines: [
          { kind: "out", text: site.name },
          { kind: "accent", text: `${site.role} · ${site.company}` },
          { kind: "muted", text: `${about.yearsAtCompany} anos na empresa, de estagiário a gerente.` },
          { kind: "muted", text: "Nuvem, automação, dados e IA, com governança por trás." },
        ],
      }

    case "ls":
      return {
        lines: SECTIONS.map(([id, description]) => ({
          kind: "out",
          text: `  ${pad(id, 14)}${description}`,
        })),
      }

    case "cat": {
      if (!argument) {
        return { lines: [{ kind: "error", text: "cat: falta o arquivo. tente: cat me.txt" }] }
      }
      const file = argument.replace(/^~\//, "").toLowerCase()
      const build = FILES[file]
      if (!build) {
        return {
          lines: [
            { kind: "error", text: `cat: ${argument}: arquivo não encontrado` },
            { kind: "muted", text: `disponíveis: ${Object.keys(FILES).join(", ")}` },
          ],
        }
      }
      return { lines: build() }
    }

    case "open": {
      const target = argument.toLowerCase().replace(/^#/, "")
      const match = SECTIONS.find(([id]) => id === target)
      if (!match) {
        return {
          lines: [
            { kind: "error", text: `open: ${argument || "(vazio)"}: seção desconhecida` },
            { kind: "muted", text: "rode ls para ver as seções" },
          ],
        }
      }
      return {
        lines: [{ kind: "muted", text: `abrindo #${target}...` }],
        effect: { type: "scroll", to: target },
      }
    }

    case "ia":
      if (argument === "--run" || argument === "-r") {
        return { effect: { type: "ruler" }, lines: [] }
      }
      if (argument) {
        return { lines: [{ kind: "error", text: `ia: opção desconhecida: ${argument}. tente ia --run` }] }
      }
      return {
        lines: [{ kind: "muted", text: "abrindo a régua de autonomia..." }],
        effect: { type: "navigate", to: "/ia" },
      }

    case "expand":
    case "fullscreen":
      return {
        lines: [{ kind: "muted", text: "expandindo. esc volta ao normal." }],
        effect: { type: "expand" },
      }

    case "collapse":
    case "exit":
    case "quit":
      return {
        lines: [{ kind: "muted", text: "voltando ao tamanho normal." }],
        effect: { type: "collapse" },
      }

    case "theme":
      return {
        lines: [{ kind: "muted", text: "trocando o tema..." }],
        effect: { type: "theme" },
      }

    case "contato":
    case "email":
      return {
        lines: [
          { kind: "accent", text: site.email },
          { kind: "muted", text: site.linkedin },
        ],
        effect: { type: "mail" },
      }

    case "clear":
      return { lines: [], effect: { type: "clear" } }

    case "sudo":
      return { lines: [{ kind: "error", text: "nice try. você não está no sudoers." }] }

    case "rm":
      return { lines: [{ kind: "error", text: "rm: permissão negada. quem responde pelo resultado antes de ele ter efeito?" }] }

    default:
      return {
        lines: [
          { kind: "error", text: `comando não encontrado: ${command}` },
          { kind: "muted", text: "tente help" },
        ],
      }
  }
}
