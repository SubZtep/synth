/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Label } from "../components/elems/nodeform"
import { useState, useEffect, Fragment } from "react"

export default function useType(node: AudioNode, types: string[]) {
  const [type, setType] = useState(types[0])

  useEffect(() => {
    // @ts-ignore
    node.type = type
    // @ts-ignore
  }, [node.type, type])

  return (
    <Fragment>
      <Label>Type</Label>
      {types.map(typeVal => (
        <Label key={typeVal}>
          <input
            type="radio"
            value={typeVal}
            checked={type === typeVal}
            onChange={event => setType(event.currentTarget.value)}
          />
          {typeVal}
        </Label>
      ))}
    </Fragment>
  )
}
