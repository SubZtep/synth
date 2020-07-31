/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ReactFlowProvider } from "react-flow-renderer"
import AudioGraph from "./components/graph/AudioGraph"
import MenuOpener from "./components/side/MenuOpener"
import Visual from "./components/side/AnalyserView"
import { Main, SideBar, DataStore } from "./styled"
import Piano from "./components/side/Piano"
import Brand from "./components/side/Brand"
import Load from "./components/side/Load"
import Save from "./components/side/Save"

export default function App() {
  return (
    <Main>
      <ReactFlowProvider>
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
      </ReactFlowProvider>
    </Main>
  )
}
