import { AudioParamSetting } from "../components/graph/elems/AudioParamForm"
import { Analyser, Gain, BiquadFilter, Oscillator } from "../features/activeSound/activeSoundSlice"
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

export default class {
  audioContext: AudioContext | null = null
  nodes = new Map<string, SoundNode>()

  gains = []
  biquadFilters = []
  oscillators = []
  analysers = []

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
    let soundNode: SoundNode
    if (this.nodes.has(node.id)) {
      soundNode = this.nodes.get(node.id)!
      soundNode.connectIds = node.connectIds
      soundNode.params = node.params
    } else {
      soundNode = {
        id: node.id,
        audioNode: this.audioContext !== null ? this.audioContext.createGain() : undefined,
        connectIds: node.connectIds,
        type: "GainNode",
        attrs: {},
        params: node.params,
      }
      this.nodes.set(node.id, soundNode)
    }
  }

  setAnalyser(node: Analyser) {
    let soundNode: SoundNode
    if (this.nodes.has(node.id)) {
      soundNode = this.nodes.get(node.id)!
      soundNode.connectIds = node.connectIds
      soundNode.attrs.fftSize = node.fftSize
    } else {
      soundNode = {
        id: node.id,
        audioNode: this.audioContext !== null ? this.audioContext.createAnalyser() : undefined,
        connectIds: node.connectIds,
        type: "AnalyserNode",
        attrs: {
          fftSize: node.fftSize,
        },
        params: [],
      }
      this.nodes.set(node.id, soundNode)
    }
    if (soundNode.audioNode !== undefined) {
      ;(soundNode.audioNode as AnalyserNode).fftSize = soundNode.attrs.fftSize
    }
  }

  setBiquadFilter(node: BiquadFilter) {
    let soundNode: SoundNode
    if (this.nodes.has(node.id)) {
      soundNode = this.nodes.get(node.id)!
      soundNode.attrs.type = node.type
      soundNode.connectIds = node.connectIds
      soundNode.params = node.params
    } else {
      soundNode = {
        id: node.id,
        audioNode: this.audioContext !== null ? this.audioContext.createBiquadFilter() : undefined,
        connectIds: node.connectIds,
        type: "BiquadFilterNode",
        attrs: {
          type: node.type,
        },
        params: node.params,
      }
      this.nodes.set(node.id, soundNode)
    }
    if (soundNode.audioNode !== undefined) {
      ;(soundNode.audioNode as BiquadFilterNode).type = soundNode.attrs.type
    }
  }

  setOscillator(node: Oscillator) {
    let soundNode: SoundNode
    if (this.nodes.has(node.id)) {
      soundNode = this.nodes.get(node.id)!
      soundNode.attrs.type = node.type
      soundNode.connectIds = node.connectIds
      soundNode.params = node.params
    } else {
      soundNode = {
        id: node.id,
        type: "OscillatorNode",
        attrs: {
          type: node.type,
        },
        connectIds: node.connectIds,
        params: node.params,
      }
      this.nodes.set(node.id, soundNode)
    }
  }

  delNode(id: string) {
    this.nodes.delete(id)
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
