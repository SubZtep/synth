import React, { useState, useEffect } from "react"
import { ctime } from "../../scripts/audio"
import useAudio from "../../scripts/useAudio"

type Props = {
  mykey: string
  gainNode: GainNode
}

export default function GainNode({ mykey, gainNode }: Props) {
  const [gain, setGain] = useState(1)
  const { delNodeType } = useAudio()

  useEffect(() => {
    gainNode.gain.setValueAtTime(gain, ctime)
  }, [gainNode.gain, gain])

  const close = () => {
    delNodeType(mykey)
  }
  return (
    <section className="component" id="gain">
      <h3>Gain</h3>
      <div>
        <blockquote>
          <div className="title-bar-controls" css={{ float: "right" }}>
            <button aria-label="Close" onClick={close}></button>
          </div>
          GainNode. Represents a periodic waveform, such as a sine wave.
        </blockquote>
        <p>Volume what what</p>
        <div className="example">
          <div className="field-row">
            <label>
              Gain:
              <br />
              {gain}
            </label>
            <div className="is-vertical">
              <input
                type="range"
                min="-3.4"
                max="3.4"
                step="0.01"
                value={gain}
                onChange={event => setGain(event.currentTarget.valueAsNumber)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
