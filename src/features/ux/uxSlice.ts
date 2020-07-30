import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Elements } from "react-flow-renderer"
import { RootState } from "../../store"

type UX = {
  menu: boolean
  /**
   * Load _**React-Flow** Elements_ from local storage,
   * `const setElements = useStoreActions(actions => actions.setElements)`
   * in Load component somehow doesn't work.
   */
  loadElements: Elements | null
}

const uxSlice = createSlice({
  name: "ux",
  initialState: {
    menu: false,
    loadElements: null,
  } as UX,
  reducers: {
    toggleMenu: state => {
      state.menu = !state.menu
    },
    setLoadElements: (state: UX, { payload }: PayloadAction<Elements | null>) => {
      state.loadElements = payload
    },
  },
})

export const selectMenu = ({ ux }: RootState) => ux.menu
export const selectLoadElements = ({ ux }: RootState) => ux.loadElements
export const { toggleMenu, setLoadElements } = uxSlice.actions
export default uxSlice.reducer
