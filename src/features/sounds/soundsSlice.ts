import { v4 as uuidv4 } from "uuid"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"

type Sounds = {
  BPM: number
  notesPerBeat: number
  beatsPerBar: number
  bars: string[]
}

const initialState: Sounds = {
  BPM: 140,
  notesPerBeat: 4,
  beatsPerBar: 4,
  bars: [uuidv4()],
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
    },
    setBeatsPerBar: (state: Sounds, { payload }: PayloadAction<number>) => {
      state.beatsPerBar = payload
    },
    addBar: state => {
      state.bars = [...state.bars, uuidv4()]
    },
    delBar: (state: Sounds, { payload }: PayloadAction<string>) => {
      const index = state.bars.indexOf(payload)
      if (index !== -1) {
        state.bars.splice(index, 1)
      }
      // const tmp = [...state.bars]
      // tmp.splice(index, 1)
      // setBars(tmp)
      // //
    },
  },
})

export const { setBPM, setNotesPerBeat, setBeatsPerBar, addBar, delBar } = soundsSlice.actions

export const selectBPM = ({ sounds }: RootState) => sounds.BPM
export const selectNotesPerBeat = ({ sounds }: RootState) => sounds.notesPerBeat
export const selectBeatsPerBar = ({ sounds }: RootState) => sounds.beatsPerBar
export const selectBars = ({ sounds }: RootState) => sounds.bars

export default soundsSlice.reducer
