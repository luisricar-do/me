import { Star, Zap } from "lucide-react"

export const highlights = [
  {
    id: "eduflow",
    title: "EduFlow",
    badge: "IEEE · IISA 2025",
    badgeIcon: Star,
    badgeColor: "amber",
    href: "https://ieeexplore.ieee.org/document/11311235/",
    context: "TCC — UNIFEI · Publicado na IEEE IISA 2025, Atenas",
    description:
      "Sistema low-code configurável para gestão de TCCs — submissão, avaliação em múltiplas etapas e acompanhamento de projetos finais. Desenvolvido como Trabalho de Conclusão de Curso, foi aprovado na International Symposium on INnovations in Intelligent SysTems and Applications (IISA) e publicado no IEEE, com alcance internacional.",
    metrics: [
      { label: "Facilidade de uso", value: "92,4%" },
      { label: "Utilidade percebida", value: "94%" },
      { label: "Reconhecimento", value: "Internacional" },
    ],
    tags: ["Low-code", "Education", "IEEE", "TCC", "React", "Node.js"],
  },
  {
    id: "streamline",
    title: "Streamline",
    badge: "Em produção · Tech4Humans",
    badgeIcon: Zap,
    badgeColor: "green",
    href: "https://github.com/tech4humans-brasil/streamline",
    videoHref: "https://www.youtube.com/watch?v=P6d1OfvwTRE",
    context: "Tech4Humans · Em uso ativo",
    description:
      "Plataforma configurável via low-code para gestão e acompanhamento de atividades internas. Criado para resolver necessidades reais da Tech4Humans, o Streamline é utilizado ativamente pela equipe no dia a dia, otimizando fluxos operacionais e reduzindo overhead de gerenciamento de tarefas.",
    metrics: [
      { label: "Status", value: "Produção" },
      { label: "Uso", value: "Diário" },
      { label: "Impacto", value: "Operacional" },
    ],
    tags: ["TypeScript", "Low-code", "Interno", "Gestão"],
  },
]
