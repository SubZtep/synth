/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useState, useEffect } from "react"

export default function useType(node: AudioNode, types: string[]) {
  const [type, setType] = useState(types[0])

  useEffect(() => {
    // @ts-ignore
    node.type = type
    // @ts-ignore
  }, [node.type, type])

  return (
    <fieldset>
      <legend>Type</legend>
      {types.map(typeVal => (
        <div key={typeVal} className="field-row">
          <input
            id={typeVal}
            type="radio"
            value={typeVal}
            checked={type === typeVal}
            onChange={event => setType(event.currentTarget.value)}
          />
          <label htmlFor={typeVal} css={{ textTransform: "capitalize" }}>
            {typeVal}
          </label>
        </div>
      ))}
    </fieldset>
  )
}
