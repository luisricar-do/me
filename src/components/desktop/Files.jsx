import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { ArrowUpRight, ChevronLeft, ChevronRight, FileText, Folder, Image, X } from "lucide-react"
import { projects } from "../../data/projects"
import { publications } from "../../data/publications"
import { talks } from "../../data/talks"

/*
 * O app Arquivos: o conteúdo do site arrumado como num Finder. Projetos são
 * pastas, artigos são PDFs e as fotos de palco são imagens. Espaço abre a
 * prévia rápida (como o Quick Look do Mac), Enter ou duplo clique abre.
 */

function projectLinks(project) {
  return [
    project.caseHref && { label: "Ver o case", href: project.caseHref, internal: true },
    project.href && { label: "Ver no ar", href: project.href },
    project.repo && { label: "Código", href: project.repo },
  ].filter(Boolean)
}

const FOLDERS = [
  {
    id: "projetos",
    label: "Projetos",
    icon: Folder,
    items: projects
      .filter((project) => !project.draft)
      .map((project) => ({
        id: project.id,
        kind: "folder",
        name: project.title,
        detail: `${project.kind} · ${project.year}`,
        summary: project.summary,
        tags: project.stack,
        links: projectLinks(project),
      })),
  },
  {
    id: "artigos",
    label: "Artigos",
    icon: FileText,
    items: publications.map((paper) => ({
      id: paper.id,
      kind: "pdf",
      name: `${paper.id}.pdf`,
      detail: paper.venue,
      paper,
      links: [
        paper.href && { label: "Abrir no IEEE Xplore", href: paper.href },
        paper.caseHref && { label: "Ver o case", href: paper.caseHref, internal: true },
      ].filter(Boolean),
    })),
  },
  {
    id: "fotos",
    label: "Fotos",
    icon: Image,
    items: talks
      .filter((talk) => talk.photo)
      .map((talk) => ({
        id: talk.id,
        kind: "image",
        name: `${talk.id}.jpg`,
        detail: talk.event,
        src: talk.photo,
        caption: talk.title,
        sub: `${talk.location} · ${talk.dateLabel}`,
        links: talk.toolHref ? [{ label: talk.toolLabel, href: talk.toolHref, internal: true }] : [],
      })),
  },
]

function useOpen() {
  const navigate = useNavigate()
  return (link) => {
    if (!link) return
    if (link.internal) navigate(link.href)
    else window.open(link.href, "_blank", "noopener")
  }
}

function Thumb({ item, size = "lg" }) {
  const box = size === "lg" ? "h-16 w-16" : "h-5 w-5"
  if (item.kind === "image") {
    return (
      <img
        src={item.src}
        alt=""
        loading="lazy"
        className={`${size === "lg" ? "h-16 w-20" : "h-5 w-6"} rounded-md border border-line object-cover`}
      />
    )
  }
  if (item.kind === "pdf") {
    return (
      <span className={`${box} relative grid place-items-center`}>
        <span className="absolute inset-y-0 left-1/2 w-[76%] -translate-x-1/2 rounded-[3px] border border-line bg-white shadow-sm" />
        {size === "lg" && (
          <span className="relative mt-5 rounded-[2px] bg-coral px-1 font-mono text-[9px] font-bold text-[#1a1917]">
            PDF
          </span>
        )}
      </span>
    )
  }
  return <Folder className={`${box} text-accent`} strokeWidth={1.4} fill="var(--accent-tint)" />
}

export function FilesView() {
  const [folderId, setFolderId] = useState("projetos")
  const [selected, setSelected] = useState(0)
  const [peek, setPeek] = useState(null)
  const gridRef = useRef(null)
  const open = useOpen()

  const folder = FOLDERS.find((item) => item.id === folderId)
  const items = folder.items
  const current = items[selected] ?? null

  function choose(id) {
    setFolderId(id)
    setSelected(0)
  }

  function activate(item) {
    if (item.kind === "folder") open(item.links[0])
    else setPeek(items.indexOf(item))
  }

  function onKeyDown(event) {
    if (peek !== null) return
    const columns = Math.max(1, Math.floor((gridRef.current?.clientWidth ?? 400) / 112))
    const moves = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns, ArrowUp: -columns }
    if (moves[event.key] !== undefined) {
      event.preventDefault()
      setSelected((index) => Math.min(items.length - 1, Math.max(0, index + moves[event.key])))
    } else if (event.key === " " && current) {
      event.preventDefault()
      setPeek(selected)
    } else if (event.key === "Enter" && current) {
      event.preventDefault()
      activate(current)
    }
  }

  return (
    <div className="flex h-full min-h-[420px] flex-col @2xl:flex-row">
      {/* Barra lateral */}
      <nav
        aria-label="Locais"
        className="flex shrink-0 gap-1 border-b border-line-soft bg-surface-2/60 p-2 @2xl:w-44 @2xl:flex-col @2xl:border-b-0 @2xl:border-r @2xl:p-3"
      >
        <p className="label hidden px-2 pb-1 text-muted @2xl:block">Favoritos</p>
        {FOLDERS.map(({ id, label, icon: Icon, items: list }) => (
          <button
            key={id}
            type="button"
            onClick={() => choose(id)}
            aria-current={id === folderId ? "page" : undefined}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors ${
              id === folderId ? "bg-accent-tint text-accent" : "text-ink-soft hover:bg-line-soft"
            }`}
          >
            <Icon size={15} />
            <span className="flex-1">{label}</span>
            <span className="hidden font-mono text-[10px] text-muted @2xl:inline">{list.length}</span>
          </button>
        ))}
      </nav>

      {/* Itens */}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="flex items-center gap-1.5 border-b border-line-soft px-4 py-2 font-mono text-[11px] text-muted">
          luisr.com.br <ChevronRight size={11} /> <span className="text-ink-soft">{folder.label}</span>
          <span className="ml-auto hidden @lg:inline">espaço: prévia · enter: abrir</span>
        </p>
        <ul
          ref={gridRef}
          role="listbox"
          aria-label={folder.label}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="grid flex-1 auto-rows-min grid-cols-[repeat(auto-fill,minmax(104px,1fr))] content-start gap-2 p-4 outline-none"
        >
          {items.map((item, index) => (
            <li key={item.id} role="option" aria-selected={index === selected}>
              <button
                type="button"
                onClick={() => {
                  setSelected(index)
                  gridRef.current?.focus()
                }}
                onDoubleClick={() => activate(item)}
                className="flex w-full flex-col items-center gap-2 rounded-lg p-2 text-center"
              >
                <span
                  className={`grid h-20 w-full place-items-center rounded-lg transition-colors ${
                    index === selected ? "bg-line-soft" : ""
                  }`}
                >
                  <Thumb item={item} />
                </span>
                <span
                  className={`line-clamp-2 break-words rounded px-1.5 text-[12px] leading-tight ${
                    index === selected ? "bg-accent text-accent-ink" : "text-ink-soft"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Informações do item selecionado */}
      {current && (
        <aside className="hidden w-60 shrink-0 flex-col gap-3 overflow-y-auto border-l border-line-soft p-4 @3xl:flex">
          <div className="grid h-28 place-items-center rounded-lg bg-surface-2">
            <Thumb item={current} />
          </div>
          <div>
            <p className="break-words font-medium text-ink">{current.name}</p>
            <p className="mt-0.5 text-xs text-muted">{current.detail}</p>
          </div>
          {current.summary && <p className="text-sm leading-relaxed text-ink-soft">{current.summary}</p>}
          {current.paper && <p className="text-sm leading-relaxed text-ink-soft">{current.paper.title}</p>}
          {current.caption && <p className="text-sm text-ink-soft">{current.caption}</p>}
          {current.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {current.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex flex-col gap-1.5">
            {current.kind !== "folder" && (
              <button
                type="button"
                onClick={() => setPeek(selected)}
                className="rounded-md border border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Prévia rápida
              </button>
            )}
            {current.links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => open(link)}
                className="inline-flex items-center justify-between rounded-md px-3 py-1.5 text-sm text-accent transition-colors hover:bg-accent-tint"
              >
                {link.label} <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
        </aside>
      )}

      {peek !== null && items[peek] && (
        <QuickLook
          items={items}
          index={peek}
          onIndex={(index) => {
            setPeek(index)
            setSelected(index)
          }}
          onOpen={open}
          onClose={() => {
            setPeek(null)
            gridRef.current?.focus()
          }}
        />
      )}
    </div>
  )
}

/** A prévia rápida: foto em tamanho grande ou a página do artigo, com ← e → entre os itens. */
function QuickLook({ items, index, onIndex, onOpen, onClose }) {
  const item = items[index]
  const previewable = useMemo(() => items.map((entry, i) => (entry.kind === "folder" ? -1 : i)).filter((i) => i >= 0), [items])
  const position = previewable.indexOf(index)

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" || event.key === " ") {
        event.preventDefault()
        event.stopPropagation()
        onClose()
      } else if (event.key === "ArrowRight" && position < previewable.length - 1) {
        onIndex(previewable[position + 1])
      } else if (event.key === "ArrowLeft" && position > 0) {
        onIndex(previewable[position - 1])
      }
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [onClose, onIndex, position, previewable])

  return createPortal(
    <div className="desk-enter fixed inset-0 z-[3000] grid place-items-center bg-black/55 p-6 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Prévia de ${item.name}`}
        onClick={(event) => event.stopPropagation()}
        className="desk-pop flex max-h-full w-[min(56rem,100%)] flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]"
      >
        <header className="flex items-center gap-2 border-b border-line-soft bg-surface-2 px-3 py-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar prévia"
            className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-line-soft hover:text-ink"
          >
            <X size={15} />
          </button>
          <p className="flex-1 truncate text-center text-[13px] font-medium text-ink-soft">{item.name}</p>
          <button
            type="button"
            disabled={position <= 0}
            onClick={() => onIndex(previewable[position - 1])}
            aria-label="Anterior"
            className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-line-soft disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            disabled={position >= previewable.length - 1}
            onClick={() => onIndex(previewable[position + 1])}
            aria-label="Próximo"
            className="grid h-7 w-7 place-items-center rounded-md text-muted transition-colors hover:bg-line-soft disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </header>

        <div className="min-h-0 overflow-y-auto">
          {item.kind === "image" ? (
            <figure>
              <img src={item.src} alt={item.caption} className="max-h-[70vh] w-full bg-black object-contain" />
              <figcaption className="px-5 py-4">
                <p className="font-medium text-ink">{item.caption}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {item.detail} · {item.sub}
                </p>
              </figcaption>
            </figure>
          ) : (
            <Paper paper={item.paper} />
          )}
        </div>

        {item.links.length > 0 && (
          <footer className="flex flex-wrap justify-end gap-2 border-t border-line-soft px-4 py-3">
            {item.links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => onOpen(link)}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
              >
                {link.label} <ArrowUpRight size={14} />
              </button>
            ))}
          </footer>
        )}
      </div>
    </div>,
    document.body
  )
}

/** A primeira página do artigo, desenhada: papel branco nos dois temas, como num leitor de PDF. */
function Paper({ paper }) {
  return (
    <div className="bg-surface-2 p-6 md:p-10">
      <article className="mx-auto aspect-[1/1.3] max-h-[64vh] w-full max-w-md overflow-hidden rounded-[3px] bg-white px-8 py-10 text-[#1a1917] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0e359d]">{paper.venue}</p>
        <h3 className="display mt-4 text-balance text-2xl leading-tight">{paper.title}</h3>
        {paper.subtitle && <p className="mt-2 text-sm italic text-[#403e3a]">{paper.subtitle}</p>}
        <div className="mt-6 h-px bg-[#1a1917]/15" />
        <dl className="mt-5 space-y-3 text-[13px] leading-snug">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-[#78756e]">Conferência</dt>
            <dd>{paper.venueFull}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-[#78756e]">Local e data</dt>
            <dd>
              {paper.place} · {paper.dateLabel}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-[#78756e]">Status</dt>
            <dd>{paper.status}</dd>
          </div>
        </dl>
        <div className="mt-8 space-y-2" aria-hidden>
          {[92, 100, 84, 96, 70].map((width) => (
            <span key={width} className="block h-1.5 rounded-full bg-[#1a1917]/8" style={{ width: `${width}%` }} />
          ))}
        </div>
      </article>
    </div>
  )
}
