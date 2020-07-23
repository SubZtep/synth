import styled from "@emotion/styled"

const EditorWrapper = styled.div`
  height: max-content;
  display: grid;
  grid-template-columns: auto 40%;
  grid-template-rows: auto;
  grid-template-areas:
    "audionodes visual"
    "audionodes piano";

  > :nth-of-type(1) {
    grid-area: audionodes;
  }
  > :nth-of-type(2) {
    grid-area: visual;
  }
  > :nth-of-type(3) {
    grid-area: piano;
  }
`

export default EditorWrapper
