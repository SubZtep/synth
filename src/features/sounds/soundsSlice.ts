import { v4 as uuidv4 } from "uuid"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"

export type StepValue = number | null

export type Bars = {
  [barId: string]: {
    soundName: string
    steps: StepValue[]
  }
}

export type Sequencer = {
  BPM: number
  notesPerBeat: number
  beatsPerBar: number
  bars: Bars
}

const initialState: Sequencer = {
  BPM: 140,
  notesPerBeat: 4,
  beatsPerBar: 4,
  bars: {},
}

const soundsSlice = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    setBPM: (state: Sequencer, { payload }: PayloadAction<number>) => {
      state.BPM = payload
    },
    setNotesPerBeat: (state: Sequencer, { payload }: PayloadAction<number>) => {
      state.notesPerBeat = payload
      // resize all the bars
      const barLength = state.notesPerBeat * state.beatsPerBar
      Object.values(state.bars).forEach(bar => {
        const oldLength = bar.steps.length
        bar.steps.length = barLength
        bar.steps.fill(null, oldLength)
      })
    },
    setBeatsPerBar: (state: Sequencer, { payload }: PayloadAction<number>) => {
      state.beatsPerBar = payload
      // resize all the bars
      const barLength = state.notesPerBeat * state.beatsPerBar
      Object.values(state.bars).forEach(bar => {
        const oldLength = bar.steps.length
        bar.steps.length = barLength
        bar.steps.fill(null, oldLength)
      })
    },
    setBars: (state: Sequencer, { payload }: PayloadAction<Bars>) => {
      state.bars = payload
    },
    addBar: (state: Sequencer, { payload }: PayloadAction<string>) => {
      state.bars[uuidv4()] = {
        // soundName: payload,
        soundName: "",
        steps: new Array(state.notesPerBeat * state.beatsPerBar).fill(null),
      }
    },
    delBar: (state: Sequencer, { payload }: PayloadAction<string>) => {
      delete state.bars[payload]
    },
    setStep: (
      state: Sequencer,
      { payload }: PayloadAction<{ barId: string; stepNr: number; step: StepValue }>
    ) => {
      state.bars[payload.barId].steps[payload.stepNr] = payload.step
    },
    setSoundName: (
      state: Sequencer,
      { payload }: PayloadAction<{ barId: string; soundName: string }>
    ) => {
      state.bars[payload.barId].soundName = payload.soundName
    },
  },
})

export const {
  setBPM,
  setNotesPerBeat,
  setBeatsPerBar,
  setBars,
  addBar,
  delBar,
  setStep,
  setSoundName,
} = soundsSlice.actions

export const selectBPM = ({ sounds }: RootState) => sounds.BPM
export const selectNotesPerBeat = ({ sounds }: RootState) => sounds.notesPerBeat
export const selectBeatsPerBar = ({ sounds }: RootState) => sounds.beatsPerBar
export const selectBarKeys = ({ sounds }: RootState) => Object.keys(sounds.bars)
export const selectBars = ({ sounds }: RootState) => sounds.bars
export const selectStepsPerBar = ({ sounds }: RootState) => sounds.notesPerBeat * sounds.beatsPerBar
export const selectSteps = ({ sounds }: RootState) => (barId: string) => sounds.bars[barId].steps
export const selectStep = ({ sounds }: RootState) => (barId: string, stepNr: number) =>
  sounds.bars[barId].steps[stepNr]
export const selectSoundName = ({ sounds }: RootState) => (barId: string) =>
  sounds.bars[barId].soundName

export default soundsSlice.reducer
