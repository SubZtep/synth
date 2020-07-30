import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Analyser, { FFTSize } from "../../components/graph/nodes/Analyser"
import { RootState } from "../../store"

type Analyser = {
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
    addAnalyser: (state: ActiveSound, { payload }: PayloadAction<Analyser>) => {
      state.analysers.push(payload)
    },
    setAnalyser: (state: ActiveSound, { payload }: PayloadAction<Analyser>) => {
      state.analysers = state.analysers.map(analyser =>
        analyser.id === payload.id ? payload : analyser
      )
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
export const selectAnalysers = ({ activeSound }: RootState) => activeSound.analysers
export const selectPlayFrequency = ({ activeSound }: RootState) => activeSound.playFrequency
export const {
  setName,
  addAnalyser,
  setAnalyser,
  delAnalyser,
  setPlayFrequency,
} = activeSoundSlice.actions
export default activeSoundSlice.reducer
