import React, { Fragment, memo } from "react"
import { Handle, Position } from "react-flow-renderer"

type Props = {
  numberOfInputs: number
}

export default memo(({ numberOfInputs }: Props) => (
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
))
