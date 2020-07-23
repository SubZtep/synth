import React, { useState, useEffect } from "react"
import { Label } from "../components/elems/nodeform"
import { ctime } from "../scripts/audio"

export default function useFrequency(node: AudioNode) {
  const [frequency, setFrequency] = useState(440)

  useEffect(() => {
    // @ts-ignore
    node.frequency.setValueAtTime(frequency, ctime)
    // @ts-ignore
  }, [node.frequency, frequency])

  return (
    <Label>
      Frequency (-24k — 24k)
      <input
        className="frequency"
        type="number"
        min="-24000"
        max="24000"
        value={frequency}
        onChange={event => setFrequency(event.currentTarget.valueAsNumber)}
      />
    </Label>
  )
}
