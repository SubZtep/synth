import React, { memo, Fragment } from "react"
import { Handle, Position } from "react-flow-renderer"

type Props = {
  numberOfOutputs: number
}

export default memo(({ numberOfOutputs }: Props) => (
  <Fragment>
    {new Array(numberOfOutputs).fill(0).map((_value, index) => (
      <Handle
        key={`output${index}`}
        type="source"
        position={Position.Bottom}
        style={{ left: `${(100 / (numberOfOutputs + 1)) * (index + 1)}%` }}
      />
    ))}
  </Fragment>
))
