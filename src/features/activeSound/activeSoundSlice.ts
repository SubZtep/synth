import { createSlice } from "@reduxjs/toolkit"

type ActiveSound = {
  name: string
}

const activeSoundSlice = createSlice({
  name: "activeSound",
  initialState: {
    name: "No Name",
  },
  reducers: {
    setName: (state: ActiveSound, { payload }) => {
      state.name = payload
    },
  },
})

export const selectName = (state: any) => state.activeSound.name
export const { setName } = activeSoundSlice.actions
export default activeSoundSlice.reducer
