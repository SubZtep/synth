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

export const GraphMutateButton = styled.button<any>`
  position: absolute;
  top: ${props => (props.fourth ? "104px" : props.third ? "72px" : props.second ? "40px" : "8px")};
  right: 10px;
  width: 160px;
  height: 28px;
  z-index: 4;
  border-radius: 4px;
  background-color: #212d40;
  border-color: #212d40;
  color: #fff;
  svg {
    float: left;
    color: #ccc;
  }
`

export const NodeButton = styled.button<any>`
  width: 100%;
  height: 28px;
  border-radius: 4px;
  background-color: #212d40;
  border-color: #212d40;
  color: #fff;
  svg {
    float: left;
    color: #ccc;
  }
`
