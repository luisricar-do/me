import {
  BookOpen,
  GraduationCap,
  History,
  Mail,
  Mic,
  PenLine,
  SquareTerminal,
  UserRound,
} from "lucide-react"
import {
  AboutView,
  ContactView,
  EduflowView,
  HighlightsView,
  RulerIcon,
  RulerView,
  TalksView,
  TimelineView,
  WritingView,
} from "./AppViews"

/**
 * Cada parte do site vira um app: janela no computador, tela no celular.
 * `hint` é a frase que explica o app para quem nunca viu o site; aparece
 * no celular, embaixo do ícone, e no balão do dock.
 * `listed: false` abre por link, mas não ganha ícone próprio.
 * `size` é o tamanho preferido da janela, [largura, altura].
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
    id: "escrita",
    path: "/escrita",
    title: "Escrita",
    hint: "O que escrevo no Substack",
    icon: PenLine,
    size: [580, 560],
    View: WritingView,
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
    id: "publicacoes",
    path: "/publicacoes",
    title: "Publicações",
    hint: "Artigos científicos e projetos",
    icon: BookOpen,
    size: [580, 600],
    View: HighlightsView,
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
    id: "trajetoria",
    path: "/trajetoria",
    title: "Trajetória",
    hint: "Minha carreira, ano a ano",
    icon: History,
    size: [580, 640],
    View: TimelineView,
  },
  {
    id: "contato",
    path: "/contato",
    title: "Contato",
    hint: "Projetos, oportunidades e convites",
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
