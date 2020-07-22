/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ReactFlowProvider } from "react-flow-renderer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EditorWrapper from "./components/elems/EditorWrapper"
import AudioGraph from "./components/AudioGraph"
import Main from "./components/elems/Main"
import Visual from "./components/Visual"
import Piano from "./components/Piano"

export default function App() {
  return (
    <Main>
      <div css={{ backgroundColor: "#003333", color: "#eeffff", display: "flex" }}>
        <h1 css={{ margin: "0 0 0 3px" }}>WAAπsynth</h1>
        <FontAwesomeIcon icon={["fal", "coffee"]} />
      </div>
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
