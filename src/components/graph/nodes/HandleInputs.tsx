/** @jsx jsx */
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import { Handle, Position } from "react-flow-renderer"

type Props = {
  numberOfInputs: number
}

export default ({ numberOfInputs }: Props) => (
  <Fragment>
    {new Array(numberOfInputs).fill(0).map((_value, index) => (
      <Handle
        key={`input${index}`}
        type="target"
        position={Position.Top}
        style={{ left: `${(100 / (numberOfInputs + 1)) * (index + 1)}%`, background: "#fff6" }}
      />
    ))}
  </Fragment>
)
