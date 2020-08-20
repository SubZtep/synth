// import { XYPosition } from "react-flow-renderer"
interface XYPosition {
  x: number
  y: number
}
export const AUDIO_CONTEXT_DESTINATION = "destination"
export const fftSizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768] as const
export type FFTSize = typeof fftSizes[number]

export type BaseNode = {
  id: string
  connectIds: string[]
  position?: XYPosition
}

export interface Analyser extends BaseNode {
  fftSize: FFTSize
  color: string
  lineWidth: number
}

export interface Gain extends BaseNode {
  params: AudioParamSetting[]
}

export interface BiquadFilter extends BaseNode {
  type: BiquadFilterType
  params: AudioParamSetting[]
}

export interface Oscillator extends BaseNode {
  type: OscillatorType
  params: AudioParamSetting[]
}

export const audioParamCalls = [
  "setValueAtTime",
  "linearRampToValueAtTime",
  "exponentialRampToValueAtTime",
  "setTargetAtTime",
  "setValueCurveAtTime",
] as const

export type Call = typeof audioParamCalls[number]
export type CallParams = (number | number[])[]

export type AudioParamSetting = {
  name: string
  call: Call
  /** `call` values in order */
  values: CallParams
}

export type AudioNodeType = "AnalyserNode" | "BiquadFilterNode" | "GainNode" | "OscillatorNode"

export type Sounds = {
  BPM: number
  notesPerBeat: number
  beatsPerBar: number
  bars: Bars
  soundNames: string[]
}

export type SynthStore = {
  name: string
  destination: {
    position: XYPosition
  }
  analysers: Analyser[]
  gains: Gain[]
  biquadFilters: BiquadFilter[]
  oscillators: Oscillator[]
  sequencer?: Sounds
}

//
// SEQUENCER
//

export type StepValue = number | null

export type Bar = {
  soundName: string
  steps: StepValue[]
}

export type Bars = {
  [barId: string]: Bar
}
