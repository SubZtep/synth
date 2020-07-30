import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type Sound = {
  name: string
  description: string
}

const soundsSlice = createSlice({
  name: "sounds",
  initialState: [],
  reducers: {
    addSound(state: Sound[], action: PayloadAction<Sound>) {
      const { name, description } = action.payload
      state.push({ name, description })
    },
  },
})

export const { addSound } = soundsSlice.actions

export default soundsSlice.reducer
