import styled from "@emotion/styled"

export const Main = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  > div:nth-of-type(1) {
    flex-grow: 0;
  }
  > div:nth-of-type(2) {
    flex-grow: 1;
  }
`

export const EditorWrapper = styled.div`
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
