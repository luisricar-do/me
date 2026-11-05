import {
  BookOpen,
  FolderOpen,
  FolderGit2,
  GraduationCap,
  History,
  Mail,
  Mic,
  SquareTerminal,
  UserRound,
} from "lucide-react"
import {
  AboutView,
  ContactView,
  EduflowView,
  HighlightsView,
  ProjectsView,
  RulerIcon,
  RulerView,
  TalksView,
  TimelineView,
} from "./AppViews"
import { FilesView } from "./Files"
import { TrashIcon, TrashView } from "./Trash"

/**
 * Cada parte do site vira um app: janela no computador, tela no celular.
 * `hint` é a frase que explica o app para quem nunca viu o site; aparece
 * no celular, embaixo do ícone, e no balão do dock.
 * `listed: false` abre por link, mas não ganha ícone próprio.
 * `size` é o tamanho preferido da janela, [largura, altura].
 * `desktopOnly: true` não aparece na tela inicial do celular.
 */
export const APPS = [
  {
    id: "sobre",
    path: "/sobre",
    title: "Sobre mim",
    hint: "Quem sou e como posso ajudar",
    icon: UserRound,
    size: [660, 660],
    View: AboutView,
  },
  {
    id: "projetos",
    path: "/projetos",
    title: "Projetos",
    hint: "Sites, sistemas e IA que eu construí",
    icon: FolderGit2,
    size: [720, 680],
    View: ProjectsView,
  },
  {
    id: "palestras",
    path: "/palestras",
    title: "Palestras",
    hint: "Onde já falei e sobre o quê",
    icon: Mic,
    size: [620, 640],
    View: TalksView,
  },
  {
    id: "regua",
    path: "/ia",
    title: "Régua de IA",
    hint: "Teste até onde a IA pode ir numa tarefa",
    icon: RulerIcon,
    size: [1000, 780],
    View: RulerView,
    meta: {
      title: "Onde a IA não deve entrar · Régua de autonomia",
      description:
        "A régua de autonomia que apresentei no HackTown 2026: responda seis perguntas sobre uma tarefa e descubra que nível de autonomia ela aceita.",
    },
  },
  {
    id: "trajetoria",
    path: "/trajetoria",
    title: "Trajetória",
    hint: "Minha carreira, ano a ano",
    icon: History,
    size: [580, 640],
    View: TimelineView,
  },
  {
    id: "publicacoes",
    path: "/publicacoes",
    title: "Publicações",
    hint: "Artigos científicos no IEEE",
    icon: BookOpen,
    size: [580, 600],
    View: HighlightsView,
  },
  {
    id: "contato",
    path: "/contato",
    title: "Contato",
    hint: "Convites, mentorias e conversas",
    icon: Mail,
    size: [500, 560],
    View: ContactView,
  },
  {
    id: "eduflow",
    path: "/eduflow",
    title: "EduFlow",
    hint: "Case: sistema para gestão de TCCs",
    icon: GraduationCap,
    size: [1000, 780],
    View: EduflowView,
    listed: false,
    meta: {
      title: "EduFlow · Case",
      description:
        "Sistema low-code configurável para gestão de TCCs, avaliado com usuários e publicado no IEEE IISA 2025.",
    },
  },
  {
    id: "arquivos",
    path: "/arquivos",
    title: "Arquivos",
    hint: "Projetos, artigos e fotos como pastas",
    icon: FolderOpen,
    size: [860, 560],
    View: FilesView,
    desktopOnly: true,
  },
  {
    id: "lixeira",
    path: "/lixeira",
    title: "Lixeira",
    hint: "O que ficou pelo caminho",
    icon: TrashIcon,
    size: [560, 420],
    View: TrashView,
    desktopOnly: true,
  },
  {
    id: "terminal",
    path: "/terminal",
    title: "Terminal",
    hint: "Para quem gosta de digitar comandos",
    icon: SquareTerminal,
    size: [620, 400],
  },
]

export const APP = Object.fromEntries(APPS.map((app) => [app.id, app]))

export function appForPath(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/"
  return APPS.find((app) => app.path === clean)?.id ?? null
}
