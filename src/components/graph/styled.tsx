/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { audioNodeTypes } from "./AudioGraph"
import { PropsWithChildren } from "react"

const GraphButtonBase = styled.button`
  cursor: pointer;
  height: 28px;
  border-radius: 4px;
  background-color: #212d40;
  border-color: #212d40;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    color: #ccc;
  }
  :hover svg {
    color: #fff;
  }
`

const GraphButtonMode = styled(GraphButtonBase)`
  background-color: #455e87;
  border-color: #455e87;
`

const GraphButtonDel = styled(GraphButtonBase)`
  background-color: #742a1b;
  border-color: #742a1b;
`

type GraphBtnProps = {
  icon: IconProp
  onClick: (type: keyof typeof audioNodeTypes) => void
  mode?: "default" | "mode" | "del"
}

export const GraphButton = ({
  icon,
  onClick,
  mode = "default",
  children,
}: PropsWithChildren<GraphBtnProps>) => {
  switch (mode) {
    case "mode":
      return (
        // @ts-ignore
        <GraphButtonMode onClick={onClick}>
          <div className="text">{children}</div>
          <FontAwesomeIcon fixedWidth icon={icon} />
        </GraphButtonMode>
      )
    case "del":
      return (
        // @ts-ignore
        <GraphButtonDel onClick={onClick}>
          <div className="text">{children}</div>
          <FontAwesomeIcon fixedWidth icon={icon} />
        </GraphButtonDel>
      )
    default:
      return (
        // @ts-ignore
        <GraphButtonBase onClick={onClick}>
          <div className="text">{children}</div>
          <FontAwesomeIcon fixedWidth icon={icon} />
        </GraphButtonBase>
      )
  }
}

export const GraphButtons = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 2px;
  .text {
    overflow: hidden;
    white-space: nowrap;
    width: 0;
    transition: 100ms;
  }
  &:hover .text {
    width: 150px;
    transition: 150ms;
  }
`

export const globalGraph = css`
  .react-flow {
    background-color: var(--graph-bg);
    resize: horizontal;
    min-width: 80px;
    width: calc(100% - var(--side-default-width));
  }
  .react-flow__node.audioNode {
    min-width: 165px;
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
    width: 0.92rem;
    height: 0.92rem;
    &.react-flow__handle-top {
      top: -0.64rem;
    }
    &.react-flow__handle-bottom {
      bottom: -0.64rem;
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

export const globalGraphEditMode = css`
  .react-flow__node.audioNode {
    cursor: default;
  }
`

export const globalGraphDraggableMode = css`
  .react-flow__node.audioNode {
    box-shadow: 1px 1px 4px 1px #333;
  }
`
