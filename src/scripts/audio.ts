import Sound from "./Sound"
import { validateSound } from "./helpers"
import { SynthStore } from "../audio"

// @ts-ignore
// eslint-disable-next-line no-native-reassign
AudioContext = window.AudioContext || window.webkitAudioContext
export let audioContext = new AudioContext()

export const sound = new Sound(audioContext)

export const restartAudioContext = async () => {
  await audioContext.close()
  audioContext = new AudioContext()
  return audioContext
}

export const loadSound = (name: string, ctx?: BaseAudioContext) => {
  const data = localStorage.getItem(name)
  if (!data) return null
  const obj: SynthStore = JSON.parse(data)
  if (!validateSound(obj)) return null

  const s = new Sound(ctx ?? audioContext)

  obj.analysers.forEach(node => s.setAnalyser(node))
  obj.gains.forEach(node => s.setGain(node))
  obj.biquadFilters.forEach(node => s.setBiquadFilter(node))
  obj.oscillators.forEach(node => s.setOscillator(node))

  return s
}
