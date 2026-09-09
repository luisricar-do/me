/**
 * Régua de autonomia apresentada no HackTown 2026 (#CorporateAI).
 * Os três níveis, a regra de ouro e os princípios são da palestra;
 * o questionário abaixo é a régua transformada em ferramenta.
 */

export const goldenRule = "Quanto mais perto de produção ou do cliente, mais baixo o nível."

export const coreQuestion = "Quem responde pelo resultado antes de ele ter efeito?"

export const levels = {
  1: {
    code: "01",
    name: "Copiloto",
    motto: "Rascunha e aprova",
    description: "A IA propõe. A pessoa aprova antes de qualquer efeito.",
    action:
      "Nada sai daqui sem alguém assinar embaixo. Se isso parecer lento, o gargalo é o processo, não o nível.",
  },
  2: {
    code: "02",
    name: "Agente",
    motto: "Executa e excepciona",
    description: "A IA roda a rotina. A pessoa trata exceção e revisa por amostragem.",
    action:
      "Defina o tamanho da amostra e quem revisa antes de ligar, não depois do primeiro incidente.",
  },
  3: {
    code: "03",
    name: "Autônomo",
    motto: "Age e audita",
    description: "A IA age sozinha. O registro é a única defesa que sobra.",
    action:
      "O log deixa de ser observabilidade e passa a ser defesa. Se o registro falhar, o nível cai na hora.",
  },
}

export const questions = [
  {
    id: "proximidade",
    label: "Proximidade",
    question: "Onde o resultado dessa tarefa aterra?",
    note: goldenRule,
    options: [
      {
        label: "Em produção ou na frente do cliente",
        value: 0,
        flag: "Aterra em produção ou no cliente, então o teto é copiloto.",
      },
      { label: "Num processo interno, com gente dependendo", value: 1 },
      { label: "Num rascunho ou numa exploração minha", value: 2 },
    ],
  },
  {
    id: "efeito",
    label: "Efeito",
    question: "O resultado tem efeito antes de alguém olhar?",
    options: [
      {
        label: "Sim, o efeito é imediato",
        value: 0,
        flag: "O efeito acontece antes da revisão, e não depois.",
      },
      { label: "Às vezes, depende do caminho", value: 1 },
      { label: "Não, nada tem efeito sem aprovação", value: 2 },
    ],
  },
  {
    id: "reversibilidade",
    label: "Reversibilidade",
    question: "Se estiver errado, quanto custa desfazer?",
    options: [
      {
        label: "Não tem volta: dinheiro, dado ou reputação",
        value: 0,
        flag: "Erro sem volta: o custo do erro é maior que o custo da revisão.",
      },
      { label: "Dá para desfazer, com retrabalho", value: 1 },
      { label: "Desfaz em minutos, sem sequela", value: 2 },
    ],
  },
  {
    id: "registro",
    label: "Registro",
    question: "Dá para reconstruir depois o que a IA fez e por quê?",
    options: [
      {
        label: "Não fica registro nenhum",
        value: 0,
        flag: "Sem registro não existe autonomia: o log é a única defesa que sobra.",
      },
      { label: "Em parte: sei o resultado, não o caminho", value: 1 },
      { label: "Sim: entrada, saída e versão ficam logadas", value: 2 },
    ],
  },
  {
    id: "dono",
    label: "Dono",
    question: coreQuestion,
    note: "A primeira pergunta, o que a IA consegue fazer, muda a cada seis meses. Esta é a que decide se você dorme tranquilo.",
    options: [
      { label: "Ninguém definido", value: 0, gate: "dono" },
      { label: "O time, de forma difusa", value: 1 },
      { label: "Uma pessoa, com nome", value: 2 },
    ],
  },
  {
    id: "escrito",
    label: "Processo",
    question: "O processo está escrito ou mora na cabeça de alguém?",
    note: "Só é AI-first o que está escrito.",
    options: [
      { label: "Mora na cabeça de alguém", value: 0, gate: "escrito" },
      { label: "Parcialmente escrito", value: 1 },
      { label: "Escrito e versionado", value: 2 },
    ],
  },
]

export const gates = {
  dono: {
    title: "Isso ainda não é uma decisão de nível.",
    body: "A pergunta não é o que a IA consegue fazer, é quem responde pelo resultado antes de ele ter efeito. Enquanto não houver um nome, não existe nível seguro para escolher.",
  },
  escrito: {
    title: "Só é AI-first o que está escrito.",
    body: "O que mora na cabeça de alguém nenhuma IA consegue executar. A IA não conserta um time: ela amplifica o que já existe, inclusive o caos. Escreva e versione o processo antes de escolher o nível.",
  },
}

export const principles = [
  { code: "01", text: "O processo virou repositório, escrito e versionado" },
  { code: "02", text: "O texto virou instrução que a IA aciona sozinha" },
  { code: "03", text: "O dado ganhou uma porta só: autentica, limita, audita" },
]

export const story = {
  date: "31 de janeiro de 2017",
  lead: "Um engenheiro do GitLab, de madrugada, cansado, rodou um comando na máquina errada.",
  punch: "Cinco backups. Nenhum funcionava.",
  moral: "Não faltou ferramenta. Faltou saber quem respondia pelo resultado antes dele acontecer.",
}

/** Números levados ao palco. `source` fica null até a referência ser anexada. */
export const evidence = [
  {
    value: "45%",
    label: "das amostras de código gerado por IA falharam em verificação de segurança",
    source: null,
  },
  {
    value: "30%",
    label: "dos líderes relatam que a produtividade caiu depois da IA",
    source: null,
  },
  {
    value: "40%",
    label:
      "dos projetos agênticos devem ser cancelados até 2027: custo, valor incerto e controle de risco",
    source: null,
  },
  {
    value: "39",
    label:
      "pontos entre o cronômetro e a percepção: devs experientes achavam que estavam 20% mais rápidos com IA, e estavam 19% mais lentos",
    source: null,
  },
]
