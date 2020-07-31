import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Analyser, { FFTSize } from "../../components/graph/nodes/Analyser"
import { RootState } from "../../store"
import { AudioParamSetting } from "../../components/graph/nodes/AudioParamForm"

export type Analyser = {
  id: string
  fftSize: FFTSize
  color: string
  lineWidth: number
}

export type Gain = {
  id: string
  params: AudioParamSetting[]
}

export type BiquadFilter = {
  id: string
  type: BiquadFilterType
  params: AudioParamSetting[]
}

export type Oscillator = {
  id: string
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
  name: "No Name",
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

    setAnalysers: (state: ActiveSound, { payload }: PayloadAction<Analyser[]>) => {
      state.analysers = payload
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

    setGains: (state: ActiveSound, { payload }: PayloadAction<Gain[]>) => {
      state.gains = payload
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

    setBiquadFilters: (state: ActiveSound, { payload }: PayloadAction<BiquadFilter[]>) => {
      state.biquadFilters = payload
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

    setOscillators: (state: ActiveSound, { payload }: PayloadAction<Oscillator[]>) => {
      state.oscillators = payload
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
  setAnalysers,
  setAnalyser,
  delAnalyser,
  setGains,
  setGain,
  delGain,
  setBiquadFilters,
  setBiquadFilter,
  delBiquadFilter,
  setOscillators,
  setOscillator,
  delOscillator,
} = activeSoundSlice.actions
export default activeSoundSlice.reducer
