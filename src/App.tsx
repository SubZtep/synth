/** @jsx jsx */
import { jsx } from "@emotion/core"
import { HotKeys } from "react-hotkeys"
import { useDispatch } from "react-redux"
import { ReactFlowProvider } from "react-flow-renderer"
import { toggleEditMode } from "./features/ux/uxSlice"
import AudioGraph from "./components/graph/AudioGraph"
import MenuOpener from "./components/side/MenuOpener"
import Visual from "./components/side/AnalyserView"
import { Main, SideBar, DataStore } from "./styled"
import Piano from "./components/side/Piano"
import Brand from "./components/side/Brand"
import Load from "./components/side/Load"
import Save from "./components/side/Save"

const keyMap = {
  TOGGLE_EDIT_MODE: "m",
}

export default function App() {
  const dispatch = useDispatch()
  const handlers = {
    TOGGLE_EDIT_MODE: (event?: KeyboardEvent) => dispatch(toggleEditMode()),
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
            <Visual />
            <Piano />
          </SideBar>
        </Main>
      </HotKeys>
    </ReactFlowProvider>
  )
}
