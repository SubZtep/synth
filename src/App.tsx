/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ReactFlowProvider } from "react-flow-renderer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EditorWrapper from "./components/elems/EditorWrapper"
import AudioGraph from "./components/AudioGraph"
import Main from "./components/elems/Main"
import Visual from "./components/Visual"
import Piano from "./components/Piano"
import Header from "./components/elems/Header"

export default function App() {
  return (
    <Main>
      <Header>
        <h1 css={{ margin: 0, color: "#f2f4f7" }}>WAAπSynth</h1>
        <FontAwesomeIcon
          icon={["fas", "bars"]}
          size="lg"
          css={{ cursor: "pointer" }}
          onClick={() => alert("YO")}
        />
      </Header>
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
