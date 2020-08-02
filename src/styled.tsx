import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const Main = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
`

export const DataStore = styled.div`
  padding: 8px 6px;
  background-color: #212d40;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const SideBar = styled.div`
  flex-grow: 1;
`

export const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&family=Tomorrow:wght@400;500&display=swap");
  * {
    box-sizing: border-box;
  }
  html,
  body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    background-color: #11151c;
    color: #fff;
  }
  button {
    font-family: Tomorrow, sans-serif;
  }
`
