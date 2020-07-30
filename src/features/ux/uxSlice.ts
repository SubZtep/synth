import { createSlice } from "@reduxjs/toolkit"

const uxSlice = createSlice({
  name: "ux",
  initialState: {
    menu: false,
  },
  reducers: {
    toggleMenu: state => {
      state.menu = !state.menu
    },
  },
})

export const selectMenu = (state: any) => state.ux.menu
export const { toggleMenu } = uxSlice.actions
export default uxSlice.reducer
