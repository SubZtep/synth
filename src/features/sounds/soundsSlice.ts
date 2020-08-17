import { v4 as uuidv4 } from "uuid"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { validateSound } from "../../scripts/helpers"
import { RootState } from "../../store"

const retreiveSoundNames = () =>
  Object.keys(localStorage).filter(name => {
    let obj
    try {
      obj = JSON.parse(localStorage[name])
    } catch {
      return false
    }
    return validateSound(obj)
  })

export type StepValue = number | null

export type Bars = {
  [barId: string]: {
    soundName: string
    steps: StepValue[]
  }
}

export type Sounds = {
  BPM: number
  notesPerBeat: number
  beatsPerBar: number
  bars: Bars
  soundNames: string[]
}

const initialState: Sounds = {
  BPM: 140,
  notesPerBeat: 4,
  beatsPerBar: 4,
  bars: {},
  soundNames: retreiveSoundNames(),
}

const soundsSlice = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    setBPM: (state: Sounds, { payload }: PayloadAction<number>) => {
      state.BPM = payload
    },
    setNotesPerBeat: (state: Sounds, { payload }: PayloadAction<number>) => {
      state.notesPerBeat = payload
      // resize all the bars
      const barLength = state.notesPerBeat * state.beatsPerBar
      Object.values(state.bars).forEach(bar => {
        const oldLength = bar.steps.length
        bar.steps.length = barLength
        bar.steps.fill(null, oldLength)
      })
    },
    setBeatsPerBar: (state: Sounds, { payload }: PayloadAction<number>) => {
      state.beatsPerBar = payload
      // resize all the bars
      const barLength = state.notesPerBeat * state.beatsPerBar
      Object.values(state.bars).forEach(bar => {
        const oldLength = bar.steps.length
        bar.steps.length = barLength
        bar.steps.fill(null, oldLength)
      })
    },
    setBars: (state: Sounds, { payload }: PayloadAction<Bars>) => {
      state.bars = payload
    },
    addBar: (state: Sounds, { payload }: PayloadAction<string>) => {
      state.bars[uuidv4()] = {
        // soundName: payload,
        soundName: "",
        steps: new Array(state.notesPerBeat * state.beatsPerBar).fill(null),
      }
    },
    delBar: (state: Sounds, { payload }: PayloadAction<string>) => {
      delete state.bars[payload]
    },
    setStep: (
      state: Sounds,
      { payload }: PayloadAction<{ barId: string; stepNr: number; step: StepValue }>
    ) => {
      state.bars[payload.barId].steps[payload.stepNr] = payload.step
    },
    setSoundName: (
      state: Sounds,
      { payload }: PayloadAction<{ barId: string; soundName: string }>
    ) => {
      state.bars[payload.barId].soundName = payload.soundName
    },
    refreshSoundNames: state => {
      state.soundNames = retreiveSoundNames()
    },
    resetSoundsState: state => {
      Object.entries(initialState).forEach(([key, value]) => {
        // @ts-ignore
        state[key] = value
      })
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
  refreshSoundNames,
  resetSoundsState,
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
export const selectSoundNames = ({ sounds }: RootState) => sounds.soundNames

export default soundsSlice.reducer
