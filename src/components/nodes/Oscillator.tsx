import React, { memo } from "react"

import { Handle, Position, NodeComponentProps } from "react-flow-renderer"

export default memo(({ selected }: NodeComponentProps) => {
  return (
    <>
      <div>Oscillator jol {selected ? "Y" : "N"}</div>
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: "#B0BF1A" }}
        onConnect={params => console.log("handle onConnect", params)}
      />
    </>
  )
})
