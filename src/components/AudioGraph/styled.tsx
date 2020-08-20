/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { audioNodeTypes } from "./AudioGraph"
import { PropsWithChildren } from "react"

export const globalGraph = css`
  .react-flow {
    background-color: var(--graph-bg);
    resize: horizontal;
    min-width: 80px;
    width: calc(100% - var(--side-default-width));
  }

  .react-flow__node.audioNode {
    min-width: 165px;
    border-radius: 4px;
    background-color: var(--node-bg);
    color: #fff;
    padding: 3px;

    &.selected {
      border: 2px solid var(--node-selected-border);
      padding: 1px;
    }

    &.output {
      font-family: Tomorrow;
      font-size: 1rem;
      padding: 8px;
    }
  }

  .react-flow__handle {
    width: 0.92rem;
    height: 0.92rem;
    &.react-flow__handle-top {
      top: -0.64rem;
      background-color: #e62020;
    }
    &.react-flow__handle-bottom {
      bottom: -0.64rem;
      background-color: #74c365;
    }
  }
  .react-flow__edge {
    .react-flow__edge-path {
      stroke-width: 2;
      stroke: #7d4e57;
    }
    &.selected .react-flow__edge-path {
      stroke-width: 3;
      stroke: #d66853;
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

const GraphButtonBase = styled.button`
  background-color: #364156;
  border-color: #7d4e57;
  color: #fff;
  font-family: Tomorrow;
  font-size: 0.85rem;
  border-radius: 3px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    transition: 50ms;
  }
  &:hover svg {
    transition: 50ms;
    transform: scale(1.25);
  }
`

export const GraphButtons = styled.div`
  position: absolute;
  gap: 2px;
  top: 8px;
  right: 10px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  .text {
    overflow: hidden;
    white-space: nowrap;
    width: 0;
    transition: 60ms;
  }
  &:hover .text {
    width: 165px;
    transition: 120ms;
  }
`

const GraphButtonMode = styled(GraphButtonBase)`
  background-color: #455e87;
`

const GraphButtonDel = styled(GraphButtonBase)`
  background-color: #742a1b;
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
          <FontAwesomeIcon fixedWidth icon={icon} size="lg" />
        </GraphButtonMode>
      )
    case "del":
      return (
        // @ts-ignore
        <GraphButtonDel onClick={onClick}>
          <div className="text">{children}</div>
          <FontAwesomeIcon fixedWidth icon={icon} size="lg" />
        </GraphButtonDel>
      )
    default:
      return (
        // @ts-ignore
        <GraphButtonBase onClick={onClick}>
          <div className="text">{children}</div>
          <FontAwesomeIcon fixedWidth icon={icon} size="lg" />
        </GraphButtonBase>
      )
  }
}
