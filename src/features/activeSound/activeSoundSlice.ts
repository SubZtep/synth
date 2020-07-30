import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Analyser, { FFTSize } from "../../components/graph/nodes/Analyser"
import { RootState } from "../../store"

export type Analyser = {
  id: string
  fftSize: FFTSize
  color: string
  lineWidth: number
}

type ActiveSound = {
  name: string
  analysers: Analyser[]
  playFrequency: number | null
}

const initialState: ActiveSound = {
  name: "No Name",
  analysers: [],
  playFrequency: null,
}

const activeSoundSlice = createSlice({
  name: "activeSound",
  initialState,
  reducers: {
    setName: (state: ActiveSound, { payload }: PayloadAction<string>) => {
      state.name = payload
    },
    setAnalysers: (state: ActiveSound, { payload }: PayloadAction<Analyser[]>) => {
      state.analysers = payload
    },
    setAnalyser: (state: ActiveSound, { payload }: PayloadAction<Analyser>) => {
      const index = state.analysers.findIndex(analyser => analyser.id === payload.id)
      if (index === -1) {
        state.analysers.push(payload)
      } else {
        state.analysers[index] = payload
      }
    },
    delAnalyser: (state: ActiveSound, { payload }: PayloadAction<string>) => {
      state.analysers = state.analysers.filter(ananyser => ananyser.id !== payload)
    },
    setPlayFrequency: (state: ActiveSound, { payload }: PayloadAction<number | null>) => {
      state.playFrequency = payload
    },
  },
})

export const selectName = ({ activeSound }: RootState) => activeSound.name
export const selectAnalyser = ({ activeSound }: RootState) => (id: string) =>
  activeSound.analysers.find(analyser => analyser.id === id)
export const selectAnalysers = ({ activeSound }: RootState) => activeSound.analysers
export const selectAudioNodes = ({ activeSound }: RootState) => ({
  analysers: activeSound.analysers,
})
export const selectPlayFrequency = ({ activeSound }: RootState) => activeSound.playFrequency
export const {
  setName,
  setAnalysers,
  setAnalyser,
  delAnalyser,
  setPlayFrequency,
} = activeSoundSlice.actions
export default activeSoundSlice.reducer
