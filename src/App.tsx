/** @jsx jsx */
import { jsx } from "@emotion/core"
import EditorWrapper from "./components/elems/EditorWrapper"
import AudioGraph from "./components/AudioGraph"
import Main from "./components/elems/Main"
import Visual from "./components/Visual"
import Piano from "./components/Piano"

export default function App() {
  return (
    <Main>
      <div css={{ backgroundColor: "#003333", color: "#eeffff", display: "flex" }}>
        <h1 css={{ margin: "0 0 0 4px", fontFamily: "Candara" }}>Audio Nodes</h1>
      </div>
      <EditorWrapper>
        <AudioGraph />
        <Visual />
        <Piano />
      </EditorWrapper>
    </Main>
  )
}
