# LinkedIn: governança e IA que rodam em produção

O LinkedIn, o site e o GitHub contam a mesma história com a mesma frase:
**"Governança e IA que rodam em produção, não só no PDF."** Ela está na capa,
no título e no topo do site. Em inglês: "Governance and AI that run in
production, not just on paper."

A lógica é a mesma do site (PR #11): o resultado vem primeiro, o engenheiro é
a base ("sou engenheiro antes de ser gestor"), os problemas aparecem do jeito
que a empresa fala e a prova vem em número.

"Rodar" continua sendo a palavra da marca. A frase anterior, "Do código ao
processo, eu faço rodar", ficou de 13/11 a 16/11/2026, e antes dela era
"Transformo burocracia em sistema que roda".

A meta de longo prazo é liderança técnica (CTO). Por isso o LinkedIn não copia
o tom de venda do site: mostra escopo de liderança e decisões, e termina em
"me chama para conversar", sem oferecer serviço avulso.

Situação: proposta de 17/11/2026, ainda não aplicada no LinkedIn.

---

## 1. Capa

`brand/linkedin/cover.png` (3168×792, ou seja, 1584×396 em 2x). O código-fonte
está em `brand/linkedin/src/cover.html`. Para regerar: `npm run brand -- linkedin`.

Rótulo "Arquitetura · Governança · IA" e o título em três linhas, a 64px
(fica ~15px no app do celular).

## 2. Título (headline)

> Gerente de Governança de TI e IA e DPO na Tech for Humans | Governança e IA que rodam em produção, não só no PDF | Arquitetura de aplicações | Mestrando em IA na UNIFEI

Em inglês:

> IT & AI Governance Manager and DPO at Tech for Humans | Governance and AI that run in production, not just on paper | Application architecture | AI Master's student at UNIFEI

O cargo vem primeiro porque é o que recrutador e busca leem. "Arquitetura de
aplicações" entra no título para o lado técnico aparecer na busca.

## 3. Sobre

> Governança e IA que rodam em produção, não só no PDF.
>
> Sou engenheiro antes de ser gestor. Desenho a arquitetura, entro no código e coloco LGPD, ISO 27001 e IA dentro da esteira de desenvolvimento. A conformidade vira rotina do time, e a IA só entra onde alguém responde pelo resultado.
>
> Os problemas que eu mais resolvo:
> • Sistema que cresceu sem desenho e cada mudança quebra outra coisa. Mapeio o que existe e desenho a arquitetura do próximo passo: integrações, serviços, filas e dados.
> • Auditoria chegando e as evidências espalhadas em planilha. LGPD, ISO 27001 e ISO 27701 viram processo e ferramenta dentro da esteira.
> • Todo mundo quer IA, mas ninguém sabe onde ela pode decidir sozinha. Decido tarefa por tarefa até onde ela vai, com um controle amarrado em cada saída.
> • Conta da nuvem subindo e deploy dependendo de uma pessoa. Fundei a área de DevOps da empresa e hoje respondo também pelo FinOps.
>
> Cheguei aqui meio por acidente. Em 2021 ganhei um hackathon que pedia praticamente o meu TCC do técnico, e o prêmio era um estágio na Tech for Humans. Fui dev fullstack, topei DevOps sem saber DevOps, montei a área do zero e virei DPO no caminho. Hoje lidero um time de 8 pessoas em cloud, segurança e processos.
>
> O que dá para conferir: o Streamline, que nasceu do meu TCC, virou a plataforma oficial da empresa, roda mais de 50 processos e é open source. A Régua de autonomia, que levei pro HackTown 2026, diz em seis perguntas quanta autonomia a IA pode ter numa tarefa. E no mestrado em IA na UNIFEI já são dois artigos no IEEE IISA, pesquisando quando a IA ensina e quando ela só responde.
>
> Escrevo a Big Rick no Substack, explicando IA sem jargão. O resto está em luisr.com.br.
>
> Se você quer conversar sobre arquitetura, governança ou IA, me chama.

## 4. Experiência: Gerente de Governança de TI e IA (atual)

> Lidero a governança de tecnologia e IA da empresa e sou o DPO. São quatro frentes, com um time de 8 pessoas: DevOps e cloud, segurança e compliance, processos e inovação.
>
> Na prática:
> • Desenho e valido a arquitetura das aplicações novas antes de irem pro ar.
> • Coloco IA em produção com limite de autonomia e alguém respondendo por cada saída. A Régua de autonomia nasceu daqui.
> • LGPD, ISO 27001 e ISO 27701 entram na esteira como processo e ferramenta.
> • Respondo pelo custo de nuvem e tecnologia da empresa (FinOps).

**Falta você completar:** um ou dois números deixam isso muito mais forte para
quem contrata liderança. Por exemplo: quanto o FinOps economizou, quais
auditorias ou certificações passaram e quantos agentes de IA estão em
produção. Não coloquei nenhum número que não esteja publicado no site.

## 5. Competências principais

**Arquitetura de software • Governança de TI • IA generativa • LGPD • Liderança de equipe**

"Arquitetura de software" entra no lugar de "DevOps" para o lado técnico
aparecer entre as cinco primeiras. DevOps e Azure continuam nas experiências e
na lista completa de competências.

## 6. Em destaque

O card do site continua. Se o LinkedIn mostrar a prévia antiga em cache,
remova o link e adicione de novo. Vale pôr a Régua de autonomia
(`https://luisr.com.br/ia`) ao lado, porque ela prova o "IA com limite" e dá
para testar.

## 7. Contato

- Site: `https://luisr.com.br`
- Segundo link: `https://obigrick.substack.com` (Big Rick)
