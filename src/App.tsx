/** @jsx jsx */
import { jsx } from "@emotion/core"
import { HotKeys } from "react-hotkeys"
import { useDispatch } from "react-redux"
import { ReactFlowProvider } from "react-flow-renderer"
import { toggleEditMode, toggleDelSelected } from "./features/ux/uxSlice"
import AudioGraph from "./components/graph/AudioGraph"
import MenuOpener from "./components/side/MenuOpener"
import Analysers2D from "./components/side/Analysers2D"
import { Main, SideBar, DataStore } from "./styled"
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
  const handlers = {
    TOGGLE_EDIT_MODE: (event?: KeyboardEvent) => dispatch(toggleEditMode()),
    DEL_SELECTED: (event?: KeyboardEvent) => dispatch(toggleDelSelected()),
  }

  return (
    <ReactFlowProvider>
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <Main>
          <AudioGraph />
          <SideBar>
            <Brand />
            <MenuOpener />
            <DataStore>
              <Load />
              <Save />
            </DataStore>
            <Audio />
            <Analysers2D />
            <Piano />
          </SideBar>
        </Main>
      </HotKeys>
    </ReactFlowProvider>
  )
}
