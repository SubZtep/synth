/** @jsx jsx */
import { jsx } from "@emotion/core"
import { HotKeys } from "react-hotkeys"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast, Slide } from "react-toastify"
import { ReactFlowProvider } from "react-flow-renderer"
import { toggleEditMode, toggleDelSelected, selectSideLeft } from "./features/ux/uxSlice"
import AudioGraph from "./components/graph/AudioGraph"
import MenuOpener from "./components/side/MenuOpener"
import Analysers2D from "./components/side/Analysers2D"
import { Main, SideBar, WidgetRows } from "./styled"
import Audio from "./components/side/Audio"
import Piano from "./components/side/Piano"
import Brand from "./components/side/Brand"
import Load from "./components/side/Load"
import Save from "./components/side/Save"

const keyMap = {
  TOGGLE_EDIT_MODE: "m",
  DEL_SELECTED: "del",
}

export default function App() {
  const dispatch = useDispatch()
  const sideLeft = useSelector(selectSideLeft)
  const handlers = {
    TOGGLE_EDIT_MODE: (event?: KeyboardEvent) => dispatch(toggleEditMode()),
    DEL_SELECTED: (event?: KeyboardEvent) => dispatch(toggleDelSelected()),
  }

  return (
    <ReactFlowProvider>
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <Main className={sideLeft ? "rev" : ""}>
          <AudioGraph />
          <SideBar>
            <Brand />
            <MenuOpener />
            <WidgetRows>
              <Load />
              <Save />
            </WidgetRows>
            <Audio />
            <Analysers2D />
            <Piano />
          </SideBar>
        </Main>
        <ToastContainer
          position={sideLeft ? toast.POSITION.BOTTOM_LEFT : toast.POSITION.BOTTOM_RIGHT}
          transition={Slide}
          limit={2}
          autoClose={2200}
        />
      </HotKeys>
    </ReactFlowProvider>
  )
}
