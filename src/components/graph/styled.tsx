/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { audioNodeTypes } from "./AudioGraph"
import { PropsWithChildren } from "react"

type GraphBtnProps = {
  icon: IconProp
  onClick: (type: keyof typeof audioNodeTypes) => void
}

export const GraphButton = ({ icon, onClick, children }: PropsWithChildren<GraphBtnProps>) => (
  <button
    css={css`
      height: 28px;
      border-radius: 4px;
      background-color: #212d40;
      border-color: #212d40;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      svg {
        color: #ccc;
      }
      :hover svg {
        color: #fff;
      }
    `}
    // @ts-ignore
    onClick={onClick}
  >
    <div className="text">{children}</div>
    <FontAwesomeIcon fixedWidth icon={icon} />
  </button>
)

export const GraphButtons = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 2px;
  .text {
    display: none;
  }
  &:hover .text {
    display: block;
  }
`

export const globalGraph = css`
  .react-flow__node.audioNode {
    border: 2px solid #212d40;
    border-radius: 4px;
    background-color: #212d40;
    color: #fff;
    padding: 2px;
    &.selected {
      border-color: #aebdd5;
    }
  }
  .react-flow__handle {
    width: 1rem;
    height: 1rem;
    &.react-flow__handle-top {
      top: -0.5rem;
    }
    &.react-flow__handle-bottom {
      bottom: -0.5rem;
    }
  }
  .react-flow__edge {
    .react-flow__edge-path {
      stroke: #33c;
    }
    &.selected .react-flow__edge-path {
      stroke-width: 2.5;
      stroke: #aebdd5;
    }
  }
  .react-flow__controls-button {
    width: 25px;
    height: 25px;
    opacity: 0.5;
  }
`
