import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import Analyser from "../../components/graph/nodes/Analyser"
import { FFTSize } from "../../hooks/useAnalyser"

type Analyser = {
  id: string
  fftSize: FFTSize
  color: string
  lineWidth: number
}

type ActiveSound = {
  name: string
  analysers: Analyser[]
}

const initialState: ActiveSound = {
  name: "No Name",
  analysers: [],
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
  },
})

export const selectName = (state: RootState) => state.activeSound.name
export const selectAnalysers = (state: RootState) => state.activeSound.analysers
export const { setName, addAnalyser, setAnalyser, delAnalyser } = activeSoundSlice.actions
export default activeSoundSlice.reducer
