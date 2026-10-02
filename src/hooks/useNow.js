import { useEffect, useState } from "react"

/** Data atual que se atualiza sozinha: relógio e contadores do desktop. */
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}
