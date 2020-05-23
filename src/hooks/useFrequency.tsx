import React from "react"
import { useState, useEffect } from "react"
import { ctime } from "../scripts/audio"

export default function useFrequency(node: AudioNode) {
  const [frequency, setFrequency] = useState(440)

  useEffect(() => {
    // @ts-ignore
    node.frequency.setValueAtTime(frequency, ctime)
    // @ts-ignore
  }, [node.frequency, frequency])

  return (
    <fieldset>
      <label>Frequency: {frequency}</label>
      <input
        className="frequency"
        type="range"
        min="-24000"
        max="24000"
        value={frequency}
        onChange={event => setFrequency(event.currentTarget.valueAsNumber)}
      />
    </fieldset>
  )
}
