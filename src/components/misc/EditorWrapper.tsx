import styled from "@emotion/styled"

const EditorWrapper = styled.div`
  height: max-content;
  display: grid;
  grid-template-columns: auto 450px;
  grid-template-rows: 300px 200px auto;
  grid-template-areas:
    "audionodes visual"
    "audionodes piano"
    "audionodes .";

  > :first-of-type {
    grid-area: audionodes;
  }
  > canvas {
    grid-area: visual !important;
  }
  > :last-of-type {
    grid-area: piano;
  }
`

export default EditorWrapper
