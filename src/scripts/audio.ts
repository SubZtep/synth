import { ElementId } from "react-flow-renderer"
import { AudioParamSetting } from "../components/graph/elems/AudioParamForm"

export const AUDIO_CONTEXT_DESTINATION = "destination"

// @ts-ignore
// eslint-disable-next-line no-native-reassign
AudioContext = window.AudioContext || window.webkitAudioContext
export let audioContext = new AudioContext()

/**
 * AudioNodes holder
 */
export const audioNodes = new Map<string, AudioNode>()

export const restartAudioContext = async () => {
  await audioContext.close()
  audioNodes.clear()
  audioContext = new AudioContext()
  return audioContext
}

export const connectNodes = (source: ElementId, target: ElementId) => {
  if (target === AUDIO_CONTEXT_DESTINATION) {
    audioNodes.get(source)?.connect(audioContext.destination)
  } else {
    const destination = audioNodes.get(target)
    if (destination) audioNodes.get(source)?.connect(destination)
  }
}

export const applyParams = (node: AudioNode, params: AudioParamSetting[], time?: number) => {
  if (time === undefined) {
    time = audioContext.currentTime
  }
  params.forEach(param => {
    const values = [...param.values]
    if (
      [
        "setValueAtTime",
        "linearRampToValueAtTime",
        "exponentialRampToValueAtTime",
        "setTargetAtTime",
        "setValueCurveAtTime",
      ].includes(param.call)
    ) {
      // @ts-ignore
      values[1] += time
    }
    if (["cancelScheduledValues", "cancelAndHoldAtTime"].includes(param.call)) {
      // @ts-ignore
      values[0] += time
    }

    // @ts-ignore
    node[param.name][param.call](...values)
  })
}
