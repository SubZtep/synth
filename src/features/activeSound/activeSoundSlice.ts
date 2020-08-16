import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AudioParamSetting } from "../../components/AudioGraph/elems/AudioParamForm"
import Analyser, { FFTSize } from "../../components/AudioGraph/nodes/Analyser"
import { RootState } from "../../store"
import { XYPosition } from "react-flow-renderer"

type Connect = {
  source: string
  target: string
}

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

type ActiveSound = {
  name: string
  playFrequency: number | null
  analysers: Analyser[]
  gains: Gain[]
  biquadFilters: BiquadFilter[]
  oscillators: Oscillator[]
}

const initialState: ActiveSound = {
  name: "",
  playFrequency: null,
  analysers: [],
  gains: [],
  biquadFilters: [],
  oscillators: [],
}

const activeSoundSlice = createSlice({
  name: "activeSound",
  initialState,
  reducers: {
    setName: (state: ActiveSound, { payload }: PayloadAction<string>) => {
      state.name = payload
    },
    setPlayFrequency: (state: ActiveSound, { payload }: PayloadAction<number | null>) => {
      state.playFrequency = payload
    },
    addConnect: (state: ActiveSound, { payload }: PayloadAction<Connect>) => {
      ;[state.analysers, state.gains, state.biquadFilters, state.oscillators]
        .flat()
        .find(el => el.id === payload.source)
        ?.connectIds.push(payload.target)
    },
    delConnect: (state: ActiveSound, { payload }: PayloadAction<Connect>) => {
      const node = [state.analysers, state.gains, state.biquadFilters, state.oscillators]
        .flat()
        .find(el => el.id === payload.source)
      if (node !== undefined) {
        node.connectIds = node.connectIds.filter(id => id !== payload.target)
      }
    },
    emptyNodes: state => {
      state.analysers = []
      state.gains = []
      state.biquadFilters = []
      state.oscillators = []
    },

    setAnalyser: (state: ActiveSound, { payload }: PayloadAction<Analyser>) => {
      const index = state.analysers.findIndex(node => node.id === payload.id)
      if (index === -1) {
        state.analysers.push(payload)
      } else {
        state.analysers[index] = payload
      }
    },
    delAnalyser: (state: ActiveSound, { payload }: PayloadAction<string>) => {
      state.analysers = state.analysers.filter(node => node.id !== payload)
    },

    setGain: (state: ActiveSound, { payload }: PayloadAction<Gain>) => {
      const index = state.gains.findIndex(node => node.id === payload.id)
      if (index === -1) {
        state.gains.push(payload)
      } else {
        state.gains[index] = payload
      }
    },
    delGain: (state: ActiveSound, { payload }: PayloadAction<string>) => {
      state.gains = state.gains.filter(node => node.id !== payload)
    },

    setBiquadFilter: (state: ActiveSound, { payload }: PayloadAction<BiquadFilter>) => {
      const index = state.biquadFilters.findIndex(node => node.id === payload.id)
      if (index === -1) {
        state.biquadFilters.push(payload)
      } else {
        state.biquadFilters[index] = payload
      }
    },
    delBiquadFilter: (state: ActiveSound, { payload }: PayloadAction<string>) => {
      state.biquadFilters = state.biquadFilters.filter(node => node.id !== payload)
    },

    setOscillator: (state: ActiveSound, { payload }: PayloadAction<Oscillator>) => {
      const index = state.oscillators.findIndex(node => node.id === payload.id)
      if (index === -1) {
        state.oscillators.push(payload)
      } else {
        state.oscillators[index] = payload
      }
    },
    delOscillator: (state: ActiveSound, { payload }: PayloadAction<string>) => {
      state.oscillators = state.oscillators.filter(node => node.id !== payload)
    },
  },
})

export const selectName = ({ activeSound }: RootState) => activeSound.name
export const selectPlayFrequency = ({ activeSound }: RootState) => activeSound.playFrequency
export const selectAudioNodes = ({ activeSound }: RootState) => ({
  analysers: activeSound.analysers,
  gains: activeSound.gains,
  biquadFilters: activeSound.biquadFilters,
  oscillators: activeSound.oscillators,
})

export const selectAnalyser = ({ activeSound }: RootState) => (id: string) =>
  activeSound.analysers.find(node => node.id === id)
export const selectAnalysers = ({ activeSound }: RootState) => activeSound.analysers

export const selectGain = ({ activeSound }: RootState) => (id: string) =>
  activeSound.gains.find(node => node.id === id)
export const selectGains = ({ activeSound }: RootState) => activeSound.gains

export const selectBiquadFilter = ({ activeSound }: RootState) => (id: string) =>
  activeSound.biquadFilters.find(node => node.id === id)
export const selectBiquadFilters = ({ activeSound }: RootState) => activeSound.biquadFilters

export const selectOscillator = ({ activeSound }: RootState) => (id: string) =>
  activeSound.oscillators.find(node => node.id === id)
export const selectOscillators = ({ activeSound }: RootState) => activeSound.oscillators

export const {
  setName,
  setPlayFrequency,
  addConnect,
  delConnect,
  emptyNodes,
  setAnalyser,
  delAnalyser,
  setGain,
  delGain,
  setBiquadFilter,
  delBiquadFilter,
  setOscillator,
  delOscillator,
} = activeSoundSlice.actions
export default activeSoundSlice.reducer
