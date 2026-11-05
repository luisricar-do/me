import { useState } from "react"
import { Trash2 } from "lucide-react"
import { emptyTrashReply, trash } from "../../data/trash"

/** Ícone da lixeira cheia, desenhado para ficar no mesmo traço dos ícones do lucide. */
export function TrashIcon({ size = 22 }) {
  return <Trash2 size={size} />
}

/** A lixeira: uma lista no formato do Finder, com um bilhete em cada arquivo. */
export function TrashView() {
  const [selected, setSelected] = useState(null)
  const [tried, setTried] = useState(false)
  const item = selected === null ? null : trash[selected]

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-line-soft px-4 py-2.5">
        <p className="flex-1 text-[12px] text-muted">{trash.length} itens</p>
        <button
          type="button"
          onClick={() => setTried(true)}
          className="rounded-md border border-line px-3 py-1 text-[12px] text-ink-soft transition-colors hover:border-coral hover:text-ink"
        >
          Esvaziar
        </button>
      </div>

      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-line-soft text-[11px] text-muted">
            <th className="px-4 py-1.5 font-normal">Nome</th>
            <th className="hidden px-2 py-1.5 font-normal @md:table-cell">Tipo</th>
            <th className="px-4 py-1.5 text-right font-normal">Tamanho</th>
          </tr>
        </thead>
        <tbody>
          {trash.map((entry, index) => (
            <tr
              key={entry.name}
              onClick={() => setSelected(index)}
              aria-selected={index === selected}
              className={`cursor-default ${
                index === selected ? "bg-accent text-accent-ink" : "odd:bg-surface-2/60 text-ink-soft"
              }`}
            >
              <td className="px-4 py-1.5 font-mono text-[12px]">{entry.name}</td>
              <td className="hidden px-2 py-1.5 @md:table-cell">{entry.kind}</td>
              <td className="px-4 py-1.5 text-right tabular-nums">{entry.size}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-auto border-t border-line-soft px-4 py-3 text-sm" role="status">
        {tried ? (
          <p className="text-ink">{emptyTrashReply}</p>
        ) : item ? (
          <p className="text-ink-soft">
            <span className="font-mono text-[12px] text-muted">{item.name}</span>
            <br />
            {item.note}
          </p>
        ) : (
          <p className="text-muted">Clique em um arquivo para ver o que ele faz aqui.</p>
        )}
      </div>
    </div>
  )
}
