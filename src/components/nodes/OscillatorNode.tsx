import React, { useState, useEffect } from "react"
import { ctime } from "../../scripts/audio"
import useAudio from "../../scripts/useAudio"

type OscillatorType = "sine" | "square" | "sawtooth" | "triangle"

type Props = {
  mykey: string
  oscillatorNode: OscillatorNode
}

export default function OscillatorNode({ mykey, oscillatorNode: oscillator }: Props) {
  const { destination, delNodeType } = useAudio()
  const [start, setStart] = useState(false)
  const [frequency, setFrequency] = useState(440)
  const [detune, setDetune] = useState(0)
  const [type, setType] = useState<OscillatorType>("sine")

  useEffect(() => {
    oscillator.start()
    oscillator.disconnect()
  }, [oscillator])

  useEffect(() => {
    if (start) {
      oscillator.connect(destination(mykey))
    } else {
      oscillator.disconnect()
    }
  }, [destination, mykey, oscillator, start])

  useEffect(() => {
    oscillator.frequency.setValueAtTime(frequency, ctime)
  }, [frequency, oscillator.frequency])

  useEffect(() => {
    oscillator.detune.setValueAtTime(detune, ctime)
  }, [detune, oscillator.detune])

  useEffect(() => {
    oscillator.type = type
  }, [oscillator.type, type])

  const close = () => {
    oscillator.disconnect()
    delNodeType(mykey)
  }

  return (
    <section className="component" id="oscillator">
      <h3>Oscillator</h3>
      <div>
        <blockquote>
          <div className="title-bar-controls" css={{ float: "right" }}>
            <button aria-label="Close" onClick={close}></button>
          </div>
          OscillatorNode. Represents a periodic waveform, such as a sine wave.
        </blockquote>
        <div className="example">
          <button className={start ? "active" : undefined} onClick={() => setStart(true)}>
            Start
          </button>
          <br />
          <button onClick={() => setStart(false)}>Stop</button>
        </div>
        <div className="example">
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
          <fieldset>
            <label>Detune: {detune}</label>
            <input
              className="detune"
              type="range"
              min="-3.4"
              max="1"
              step="0.01"
              value={detune}
              onChange={event => setDetune(event.currentTarget.valueAsNumber)}
            />
          </fieldset>
          <fieldset>
            <legend>Type</legend>
            <div className="field-row">
              <input
                id="sine"
                type="radio"
                value="sine"
                checked={type === "sine"}
                onChange={event => setType(event.currentTarget.value as OscillatorType)}
              />
              <label htmlFor="sine">Sine</label>
            </div>
            <div className="field-row">
              <input
                id="square"
                type="radio"
                value="square"
                checked={type === "square"}
                onChange={event => setType(event.currentTarget.value as OscillatorType)}
              />
              <label htmlFor="square">Square</label>
            </div>
            <div className="field-row">
              <input
                id="sawtooth"
                type="radio"
                value="sawtooth"
                checked={type === "sawtooth"}
                onChange={event => setType(event.currentTarget.value as OscillatorType)}
              />
              <label htmlFor="sawtooth">Sawtooth</label>
            </div>
            <div className="field-row">
              <input
                id="triangle"
                type="radio"
                value="triangle"
                checked={type === "triangle"}
                onChange={event => setType(event.currentTarget.value as OscillatorType)}
              />
              <label htmlFor="triangle">Triangle</label>
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  )
}
