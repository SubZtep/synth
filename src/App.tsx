/** @jsx jsx */
import { jsx } from "@emotion/core"
import { ReactFlowProvider } from "react-flow-renderer"
import { Main, EditorWrapper } from "./components/styled"
import AudioGraph from "./components/graph/AudioGraph"
import Visual from "./components/side/AnalyserView"
import Header from "./components/header/Header"
import Piano from "./components/side/Piano"
import ErrorBoundary from "./ErrorBoundary"

export default function App() {
  return (
    <Main>
      <ReactFlowProvider>
        <Header />
        <EditorWrapper>
          <ErrorBoundary>
            <AudioGraph />
            <Visual />
            <Piano />
          </ErrorBoundary>
        </EditorWrapper>
      </ReactFlowProvider>
    </Main>
  )
}
