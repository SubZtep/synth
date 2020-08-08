import { AudioParamSetting } from "../components/graph/elems/AudioParamForm"
import {
  Analyser,
  Gain,
  BiquadFilter,
  Oscillator,
  BaseNode,
} from "../features/activeSound/activeSoundSlice"
import { AUDIO_CONTEXT_DESTINATION } from "./audio"

export type AudioNodeType = "AnalyserNode" | "BiquadFilterNode" | "GainNode" | "OscillatorNode"

type SoundNode = {
  id: string
  audioNode?: AudioNode
  connectIds: string[]
  type: AudioNodeType
  attrs: { [key: string]: any }
  params: AudioParamSetting[]
}

const soundNodeFactory = (node: BaseNode, type: AudioNodeType): SoundNode => {
  return {
    id: node.id,
    // connectIds: node.connectIds,
    connectIds: [],
    type,
    attrs: {},
    params: [],
  }
}

export default class {
  audioContext: AudioContext | null = null
  nodes = new Map<string, SoundNode>()

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext
  }

  destroyAudioNodes() {
    this.nodes.forEach(node => {
      node.audioNode = undefined
    })
    this.nodes.clear()
    this.nodes = new Map<string, SoundNode>()
  }

  applyParams(node: AudioNode, params: AudioParamSetting[], time?: number) {
    if (this.audioContext === null) return
    if (time === undefined) {
      time = this.audioContext.currentTime
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

  setGain(node: Gain) {
    let soundNode = this.nodes.get(node.id) || soundNodeFactory(node, "GainNode")
    soundNode.connectIds = node.connectIds
    soundNode.params = node.params
    if (!this.nodes.has(node.id)) {
      this.nodes.set(node.id, soundNode)
    }
  }

  setAnalyser(node: Analyser) {
    let soundNode = this.nodes.get(node.id) || soundNodeFactory(node, "AnalyserNode")
    soundNode.connectIds = node.connectIds
    soundNode.attrs.fftSize = node.fftSize
    if (soundNode.audioNode !== undefined) {
      ;(soundNode.audioNode as AnalyserNode).fftSize = soundNode.attrs.fftSize
    }
    if (!this.nodes.has(node.id)) {
      this.nodes.set(node.id, soundNode)
    }
  }

  setBiquadFilter(node: BiquadFilter) {
    let soundNode = this.nodes.get(node.id) || soundNodeFactory(node, "BiquadFilterNode")
    soundNode.connectIds = node.connectIds
    soundNode.attrs.type = node.type
    soundNode.params = node.params
    if (soundNode.audioNode !== undefined) {
      ;(soundNode.audioNode as BiquadFilterNode).type = soundNode.attrs.type
    }
    if (!this.nodes.has(node.id)) {
      this.nodes.set(node.id, soundNode)
    }
  }

  setOscillator(node: Oscillator) {
    let soundNode = this.nodes.get(node.id) || soundNodeFactory(node, "OscillatorNode")
    soundNode.connectIds = node.connectIds
    soundNode.attrs.type = node.type
    soundNode.params = node.params
    if (!this.nodes.has(node.id)) {
      this.nodes.set(node.id, soundNode)
    }
  }

  delNode(id: string) {
    this.nodes.delete(id)
  }

  addConnect(id: string, target: string) {
    const node = this.nodes.get(id)
    if (node) {
      node.connectIds.push(target)
    }
  }

  delConnect(id: string, target: string) {
    const node = this.nodes.get(id)
    if (node) {
      node.connectIds = node.connectIds.filter(toId => toId !== target)
    }
  }

  play(frequency: number, playDelay = 0.01) {
    if (this.audioContext === null) return
    const t = this.audioContext.currentTime + playDelay

    this.nodes.forEach(node => {
      if (node.type === "OscillatorNode") {
        node.audioNode = this.audioContext!.createOscillator()
        ;(node.audioNode as OscillatorNode).type = node.attrs.type
        ;(node.audioNode as OscillatorNode).frequency.setValueAtTime(frequency, 0)
        ;(node.audioNode as OscillatorNode).start(t)
      } else {
        if (node.audioNode === undefined) {
          switch (node.type) {
            case "AnalyserNode":
              node.audioNode = this.audioContext!.createAnalyser()
              ;(node.audioNode as AnalyserNode).fftSize = node.attrs.fftSize
              break
            case "BiquadFilterNode":
              node.audioNode = this.audioContext!.createBiquadFilter()
              ;(node.audioNode as BiquadFilterNode).type = node.attrs.type
              break
            case "GainNode":
              node.audioNode = this.audioContext!.createGain()
              break
          }
        }
      }
      if (node.params.length > 0) {
        this.applyParams(node.audioNode!, node.params, t)
      }
    })

    this.nodes.forEach(node => {
      node.connectIds.forEach(toId => {
        node.audioNode!.connect(
          toId === AUDIO_CONTEXT_DESTINATION
            ? this.audioContext!.destination
            : this.nodes.get(toId)!.audioNode!
        )
      })
    })
  }

  stop() {
    if (this.audioContext === null) return
    this.nodes.forEach(node => {
      if (node.audioNode === undefined) return

      if (node.type === "OscillatorNode") {
        //FIXME: Stop without click noise https://webaudiotech.com/2017/02/27/stopping-a-web-audio-oscillator-at-cycle-completion/
        ;(node.audioNode as OscillatorNode).stop()
      }
      node.connectIds.forEach(toId => {
        if (toId === AUDIO_CONTEXT_DESTINATION) {
          node.audioNode?.disconnect()
        } else {
          node.audioNode?.disconnect(this.nodes.get(toId)!.audioNode!)
        }
      })
      if (node.type !== undefined && node.audioNode !== undefined) {
        node.audioNode = undefined
      }
    })
  }
}
