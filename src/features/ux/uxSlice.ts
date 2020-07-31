import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Elements } from "react-flow-renderer"
import { RootState } from "../../store"

type UX = {
  menu: boolean
  editMode: boolean
  /**
   * Load _**React-Flow** Elements_ from local storage,
   * `const setElements = useStoreActions(actions => actions.setElements)`
   * in Load component somehow doesn't work.
   */
  loadElements: Elements | null
}

const initialState: UX = {
  menu: false,
  editMode: true,
  loadElements: null,
}

const uxSlice = createSlice({
  name: "ux",
  initialState,
  reducers: {
    toggleMenu: state => {
      state.menu = !state.menu
    },
    toggleEditMode: state => {
      state.editMode = !state.editMode
    },
    setLoadElements: (state: UX, { payload }: PayloadAction<Elements | null>) => {
      state.loadElements = payload
    },
  },
})

export const selectMenu = ({ ux }: RootState) => ux.menu
export const selectEditMode = ({ ux }: RootState) => ux.editMode
export const selectLoadElements = ({ ux }: RootState) => ux.loadElements
export const { toggleMenu, toggleEditMode, setLoadElements } = uxSlice.actions
export default uxSlice.reducer
