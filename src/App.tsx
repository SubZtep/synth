/** @jsx jsx */
import { jsx } from "@emotion/core"
import { HotKeys } from "react-hotkeys"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast, Slide } from "react-toastify"
import { ReactFlowProvider } from "react-flow-renderer"
import { toggleEditMode, toggleDelSelected, selectSideLeft } from "./features/ux/uxSlice"
import AudioGraph from "./components/AudioGraph"
import MenuOpener from "./components/Menu/MenuOpener"
import Analysers2D from "./components/Analyser2D"
import { Main, SideBar } from "./styled"
import Sequencer from "./components/Sequencer"
import Piano from "./components/Piano"
import Brand from "./components/misc/Brand"
import SelectSound from "./components/SelectSound"
import FileSys from "./components/FileSys"

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
            <FileSys />
            <MenuOpener />
            <SelectSound />
            <Analysers2D />
            <Piano />
            <Sequencer />
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
