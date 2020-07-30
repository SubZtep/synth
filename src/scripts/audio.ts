import { ElementId } from "react-flow-renderer"
import { AudioParamSetting } from "../components/graph/nodes/AudioParamForm"

// @ts-ignore
export const audioContext = new (window.AudioContext || window.webkitAudioContext)()

export const destination = audioContext.destination

export const nodes = new Map<string, AudioNode>()

export const AUDIO_CONTEXT_DESTINATION = "destination"

export const connectNodes = (source: ElementId, target: ElementId) => {
  if (target === AUDIO_CONTEXT_DESTINATION) {
    nodes.get(source)?.connect(audioContext.destination)
  } else {
    const destination = nodes.get(target)
    if (destination) nodes.get(source)?.connect(destination)
  }
}

export const disconnectNodes = (source: string, target: string) => {
  if (target === AUDIO_CONTEXT_DESTINATION) {
    nodes.get(source)?.disconnect()
  } else {
    const destination = nodes.get(target)
    if (destination) nodes.get(source)?.disconnect(destination)
  }
}

export const addNode = (id: string, audioNode: AudioNode) => {
  nodes.set(id, audioNode)
}

export const delNode = (id: string) => {
  const node = nodes.get(id)
  node?.disconnect()
  nodes.delete(id)
}

export const applyParams = (node: AudioNode, params: AudioParamSetting[]) => {
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
      values[1] += audioContext.currentTime
    }
    if (["cancelScheduledValues", "cancelAndHoldAtTime"].includes(param.call)) {
      // @ts-ignore
      values[0] += audioContext.currentTime
    }

    // @ts-ignore
    node[param.name][param.call](...values)
  })
}
