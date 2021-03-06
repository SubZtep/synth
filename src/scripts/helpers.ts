import { Elements, isNode } from "react-flow-renderer"
import { AUDIO_CONTEXT_DESTINATION } from "../audio.d"

export const checkSize = (prev: number, next: number) => prev === next

export const getNextId = (elems: Elements) =>
  +elems
    .filter(el => isNode(el))
    .filter(el => el.id !== AUDIO_CONTEXT_DESTINATION)
    .sort((a, b) => +b.id - +a.id)[0]?.id + 1 || 1

export const validateSound = (obj: any) => Object.keys(obj).some(key => key === "destination")
