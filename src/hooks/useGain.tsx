import React from "react"
import { useState, useEffect } from "react"
import { ctime } from "../scripts/audio"

export default function useGain(node: AudioNode, min = -40, max = 40, step = 1) {
  const [gain, setGain] = useState(1)

  useEffect(() => {
    // @ts-ignore
    node.gain.setValueAtTime(gain, ctime)
    // @ts-ignore
  }, [node.gain, gain])

  return (
    <div className="field-row">
      <label>
        Gain:
        <br />
        {gain}
      </label>
      <div className="is-vertical">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={gain}
          onChange={event => setGain(event.currentTarget.valueAsNumber)}
        />
      </div>
    </div>
  )
}
