/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ReactFlowProvider } from "react-flow-renderer"
import EditorWrapper from "./components/misc/EditorWrapper"
import AudioGraph from "./components/graph/AudioGraph"
import Main from "./components/misc/Main"
import Visual from "./components/visual/AnalyserView"
import Piano from "./components/piano/Piano"
import Header from "./components/header/Header"
import ErrorBoundary from "./ErrorBoundary"

export default function App() {
  return (
    <Main>
      <Header />
      <EditorWrapper>
        <ErrorBoundary>
          <ReactFlowProvider>
            <AudioGraph />
          </ReactFlowProvider>
          <Visual />
          <Piano />
        </ErrorBoundary>
      </EditorWrapper>
    </Main>
  )
}
