# LinkedIn: o técnico que faz a governança rodar

O LinkedIn, o site e o GitHub contam a mesma história com a mesma frase:
**"Transformo burocracia em sistema que roda."** Ela está na capa, no
título, no começo do "Sobre" e no topo do site.

A meta de longo prazo é liderança técnica (CTO). Por isso o perfil mostra
escopo de liderança e decisões, e não vende serviço avulso.

Situação: aplicado no LinkedIn em 09/11/2026 (capa, título, Sobre, cargo
atual e competências), só no perfil em português. O perfil em inglês ainda
tem a versão de 06/11/2026, com "Construo os sistemas que preciso governar".

---

## 1. Capa

`brand/linkedin/cover.png` (3168×792, ou seja, 1584×396 em 2x). O código-fonte
está em `brand/linkedin/src/cover.html`. Para regerar: `npm run brand -- linkedin`.

## 2. Título (headline)

> Gerente de Governança de TI e IA e DPO na Tech for Humans | Transformo burocracia em sistema que roda, com IA quando ajuda e sem quando não | Mestrando em IA na UNIFEI

O cargo vem primeiro porque é o que recrutador e busca leem. A frase vem logo
depois.

## 3. Sobre

> Sou o técnico que gosta da parte que ninguém quer.
>
> LGPD, ISO, auditoria, política de acesso. Onde muita gente vê papelada, eu vejo um processo que dá pra automatizar. Então eu construo a ferramenta e o processo junto. Às vezes com IA, às vezes sem. Antes eu pergunto onde ela ajuda e quem responde se der errado.
>
> Cheguei aqui meio por acidente. Em 2021 ganhei um hackathon que pedia praticamente o meu TCC do técnico, e o prêmio era um estágio na Tech for Humans. Fui dev fullstack, topei DevOps sem saber DevOps, montei a área do zero e virei DPO no caminho. Hoje sou Gerente de Governança de TI e IA, com um time de 8 pessoas.
>
> O que saiu disso até agora:
> • Streamline: a plataforma de automação de processos que nasceu do meu TCC, virou a plataforma oficial da empresa e já roda mais de 50 processos. É open source.
> • A área de DevOps da empresa, do CI/CD à observabilidade.
> • LGPD, ISO 27001 e ISO 27701 rodando dentro do ciclo de desenvolvimento.
> • A Régua de autonomia, que levei pro HackTown 2026: seis perguntas que dizem quanta autonomia a IA pode ter numa tarefa.
>
> No mestrado em IA na UNIFEI, pesquiso chatbots com LLM no ensino superior: quando a IA ensina e quando ela só responde. Já são dois artigos no IEEE IISA.
>
> Escrevo a Big Rick no Substack, explicando IA sem jargão. O resto está em luisr.com.br.
>
> Se você quer conversar sobre governança, IA ou liderança técnica, me chama.

## 4. Experiência: Gerente de Governança de TI e IA (atual)

A descrição atual usa jargão ("liderança executiva", "orquestrador", "AI
TRiSM", "validação macro") e não tem nenhum resultado concreto. Proposta:

> Lidero a governança de tecnologia e IA da empresa e sou o DPO. São quatro frentes, com um time de 8 pessoas: DevOps e cloud, segurança e compliance, processos e inovação.
>
> Na prática:
> • Coloco IA em produção com limite de autonomia e alguém respondendo por cada saída. A Régua de autonomia nasceu daqui.
> • LGPD, ISO 27001 e ISO 27701 entram na esteira como processo e ferramenta.
> • Respondo pelo custo de nuvem e tecnologia da empresa (FinOps).
> • Valido as arquiteturas novas antes de irem pro ar.

**Falta você completar:** um ou dois números deixam isso muito mais forte para
quem contrata liderança. Por exemplo: quanto o FinOps economizou, quais
auditorias ou certificações passaram, quantos agentes de IA estão em produção
e quantos processos o Streamline roda hoje. Não coloquei nenhum número que eu
não tenha visto em algum lugar.

## 5. Competências principais

**Governança de TI • Liderança de equipe • IA generativa • LGPD • DevOps**

"Liderança de equipe" entra no lugar de "Azure", porque é a competência que um
caminho para CTO precisa mostrar. Azure continua nas experiências.

## 6. Em destaque

Fica como está. O card do site passa a mostrar o título novo ("Governança de
TI e IA que roda") assim que o site for publicado. Se o LinkedIn mantiver o
card antigo em cache, remova o link e adicione de novo.

## 7. Contato

- Site: `https://luisr.com.br`
- Segundo link: `https://obigrick.substack.com` (Big Rick)
