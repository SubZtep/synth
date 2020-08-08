import Sound from "./Sound"

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
