import styled from "@emotion/styled"

const EditorWrapper = styled.div`
  height: max-content;
  display: grid;
  grid-template-columns: auto 40%;
  grid-template-rows: auto;
  grid-template-areas:
    "audionodes visual"
    "audionodes piano";

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
