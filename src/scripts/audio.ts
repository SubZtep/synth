import Sound from "./Sound"
import { validateSound } from "./helpers"
import { SynthLocalStore } from "../components/SelectSound/SelectSound"

export const AUDIO_CONTEXT_DESTINATION = "destination"

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

export const loadSound = (name: string) => {
  const data = localStorage.getItem(name)
  if (!data) return null
  const obj: SynthLocalStore = JSON.parse(data)
  if (!validateSound(obj)) return null

  const s = new Sound(audioContext)

  obj.analysers.forEach(node => s.setAnalyser(node))
  obj.gains.forEach(node => s.setGain(node))
  obj.biquadFilters.forEach(node => s.setBiquadFilter(node))
  obj.oscillators.forEach(node => s.setOscillator(node))

  return s
}
