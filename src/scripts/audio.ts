// @ts-ignore
export const audioContext = new (window.AudioContext || window.webkitAudioContext)()

export const ctime = audioContext.currentTime
export const destination = audioContext.destination

export const nodes = new Map<string, AudioNode>()
