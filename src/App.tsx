/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ReactFlowProvider } from "react-flow-renderer"
import EditorWrapper from "./components/misc/EditorWrapper"
import AudioGraph from "./components/graph/AudioGraph"
import Main from "./components/misc/Main"
import Visual from "./components/visual/Visual"
import Piano from "./components/piano/Piano"
import Header from "./components/header/Header"

export default function App() {
  return (
    <Main>
      <Header />
      <EditorWrapper>
        <ReactFlowProvider>
          <AudioGraph />
        </ReactFlowProvider>
        <Visual />
        <Piano />
      </EditorWrapper>
    </Main>
  )
}
