import styled from "@emotion/styled"

const Main = styled.div`
  background-color: #ccffd4;
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

export default Main
