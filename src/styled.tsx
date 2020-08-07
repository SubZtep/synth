import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const globalStyles = css`
  :root {
    --graph-bg: #212d40;
    --graph-bg-lines: #364156;
    --side-bg: #11151c;
    --side-default-width: 350px;
    --widget-bg: #364156;
    --input-border: #7d4e57;
    --input-border-focus: #d66853;
    --button-bg: #4f5f7d;
    --node-bg: #11151c;
    --node-selected-border: #d66853;
  }

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
    overflow: hidden;
  }
`

export const Main = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;

  &.rev {
    flex-direction: row-reverse;

    > div:last-of-type {
      border-left-width: 0;
      border-right-width: 2px;
    }

    .menuOpener {
      left: 6px;
      right: auto;
    }

    .menu {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      right: auto;
      left: 0;
    }
  }
`

export const SideBar = styled.div`
  flex-grow: 1;
  background-color: var(--side-bg);
  color: #fff;
  border: 0 solid #000;
  border-left-width: 2px;

  .menuOpener {
    position: fixed;
    top: 6px;
    right: 6px;
    &:hover {
      transform: rotate(90deg);
      transition: 500ms;
    }
  }

  > *:not(.brand):not(.menuOpener):not(.menu) {
    border-top: 2px solid #000;
    background-color: var(--widget-bg);
    color: #fff;

    input,
    select,
    button {
      font-size: 0.95rem;
      flex-grow: 1;
      border-radius: 3px;
      background-color: transparent;
      border: 1px solid var(--input-border);
      font-family: Roboto;
      padding: 6px;
      color: #fff;
      &:focus {
        border-color: var(--input-border-focus);
        border-width: 2px;
        padding: 5px;
      }
    }

    select option {
      background-color: var(--widget-bg);
    }

    button {
      width: 100%;
      background-color: var(--button-bg);
      border-width: 2px;
      border-style: outset;
      cursor: pointer;
      &:focus {
        padding: 6px;
      }
    }
  }
`

export const MenuPopup = styled.div`
  top: 0;
  right: 0;
  width: 380px;
  position: fixed;
  z-index: 200;
  background-color: #000;
  padding: 25px;
  border-bottom-left-radius: 4px;
  box-shadow: 5px 5px 15px 5px #000000;

  a {
    color: #66f;
  }

  h2 {
    text-align: center;
  }

  ul {
    line-height: 28px;
    font-size: 1.1rem;
    padding-left: 25px;
  }
  li {
    margin-top: 12px;
  }
`

export const WidgetRows = styled.div`
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  > div {
    align-items: center;
    display: flex;
    gap: 8px;
  }
`

export const IconButton = styled.button`
  background-color: transparent !important;
  width: auto !important;
  flex-shrink: 1 !important;
  flex-grow: 0 !important;
  border-width: 1px !important;
  opacity: 0.5;
  cursor: not-allowed !important;

  &:not([disabled]) {
    cursor: pointer !important;
    opacity: 1;
    svg {
      transition: 50ms;
      &:hover {
        transition: 50ms;
        transform: scale(1.25);
      }
    }
  }
`
