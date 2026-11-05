import { lazy } from "react"

/*
 * As páginas mais pesadas (a régua, com o desenho do card para compartilhar,
 * e o case do EduFlow) ficam em chunks próprios: só baixam quando alguém abre.
 */
export const AiRuler = lazy(() => import("./AiRuler").then((module) => ({ default: module.AiRuler })))
export const Eduflow = lazy(() => import("./Eduflow").then((module) => ({ default: module.Eduflow })))
