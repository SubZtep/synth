/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ReactFlowProvider } from "react-flow-renderer"
import EditorWrapper from "./components/elems/EditorWrapper"
import AudioGraph from "./components/AudioGraph"
import Main from "./components/elems/Main"
import Visual from "./components/Visual"
import Piano from "./components/Piano"
import Header from "./components/Header"

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
