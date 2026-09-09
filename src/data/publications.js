/**
 * Artigos em conferência. `href` fica null enquanto o DOI não sai nos anais —
 * o componente renderiza o item sem link nesse caso.
 */
export const publications = [
  {
    id: "iisa-2026-llm-bots",
    title:
      "LLM-Based Conversational Bots for Support and Question Answering in Higher Education: A Systematic Literature Review",
    venue: "IEEE · IISA 2026",
    venueFull:
      "17th International Conference on Information, Intelligence, Systems and Applications",
    place: "University of the Aegean, Rodos, Grécia",
    date: "2026-07-06",
    dateLabel: "6 a 9 de julho de 2026",
    status: "Aceito para apresentação e publicação nos anais do IEEE",
    href: null,
  },
  {
    id: "iisa-2025-eduflow",
    title: "EduFlow",
    subtitle: "Sistema low-code configurável para gestão de trabalhos de conclusão de curso",
    venue: "IEEE · IISA 2025",
    venueFull:
      "International Symposium on INnovations in Intelligent SysTems and Applications",
    place: "Atenas, Grécia",
    date: "2025-07-10",
    dateLabel: "julho de 2025",
    status: "Publicado no IEEE Xplore",
    href: "https://ieeexplore.ieee.org/document/11311235/",
    caseHref: "/eduflow",
  },
]
