import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Elements } from "react-flow-renderer"
import { RootState } from "../../store"

type UX = {
  /**
   * Tells if popup menu visible
   */
  menu: boolean

  /**
   * All audio node on graph become editable
   */
  editMode: boolean

  /**
   * Load _**React-Flow** Elements_ from local storage,
   * `const setElements = useStoreActions(actions => actions.setElements)`
   * in Load component somehow doesn't work.
   */
  loadElements: Elements | null

  /**
   * Set to true to del selected in AudioGraph component
   * */
  delSelected: boolean

  /**
   * Sidebar on the left
   */
  sideLeft: boolean
}

const initialState: UX = {
  menu: false,
  editMode: true,
  loadElements: null,
  delSelected: false,
  sideLeft: false,
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
    toggleDelSelected: state => {
      state.delSelected = !state.delSelected
    },
    toggleSideLeft: state => {
      state.sideLeft = !state.sideLeft
    },
    setLoadElements: (state: UX, { payload }: PayloadAction<Elements | null>) => {
      state.loadElements = payload
    },
  },
})

export const selectMenu = ({ ux }: RootState) => ux.menu
export const selectEditMode = ({ ux }: RootState) => ux.editMode
export const selectDelSelected = ({ ux }: RootState) => ux.delSelected
export const selectSideLeft = ({ ux }: RootState) => ux.sideLeft
export const selectLoadElements = ({ ux }: RootState) => ux.loadElements
export const {
  toggleMenu,
  toggleEditMode,
  toggleDelSelected,
  toggleSideLeft,
  setLoadElements,
} = uxSlice.actions
export default uxSlice.reducer
