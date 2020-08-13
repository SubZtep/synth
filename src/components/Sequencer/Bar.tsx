/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useDispatch } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { setPlayFrequency } from "../../features/activeSound/activeSoundSlice"
import { StepValue } from "./Sequencer"
import Step from "./Step"
import { IconButton } from "../../styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LocalSoundSelect from "../misc/LocalSoundSelect"
import Sound from "../../scripts/Sound"
import { loadSound } from "../../scripts/audio"

const sequenceStyle = css`
  width: 100%;
  display: flex;
  justify-items: stretch;
  align-items: stretch;
  background-color: #000;
  flex-grow: 1;
`

type Props = {
  beatsPerBar: number
  stepsPerBar: number
  cursor: number
  onRemove: () => void
}

export default ({ beatsPerBar, stepsPerBar, cursor, onRemove }: Props) => {
  const [steps, setSteps] = useState<StepValue[]>(new Array(stepsPerBar).fill(null))
  const dispatch = useDispatch()
  const [soundName, setSoundName] = useState("")
  const sound = useRef<Sound | null>(null)

  useEffect(() => {
    if (soundName !== "") {
      sound.current = loadSound(soundName)
    }
  }, [soundName])

  useEffect(() => {
    const s = [...steps]
    const oldLength = s.length
    s.length = stepsPerBar
    if (stepsPerBar > oldLength) {
      s.fill(null, oldLength)
    }
    setSteps(s)
  }, [stepsPerBar])

  useEffect(() => {
    const freq = steps[cursor]
    if (freq !== null) {
      if (sound.current === null) {
        //FIXME: Use proper timing
        dispatch(setPlayFrequency(null))
        setTimeout(() => void dispatch(setPlayFrequency(freq)))
      } else {
        sound.current.stop()
        sound.current.play(freq, 0.01)
      }
    }
  }, [cursor])

  return (
    <div
      css={css`
        display: flex;
        > select {
          padding: 0px !important;
          font-size: 0.9rem !important;
          width: 45px;
        }
      `}
    >
      <LocalSoundSelect
        selected={soundName}
        onChange={setSoundName}
        defaultText="Editor Sound"
        title="Bar's Instrument"
      />
      <div css={sequenceStyle}>
        {steps.map((step, index) => (
          <Step
            key={index.toString()}
            step={step}
            secondary={Math.floor(index / beatsPerBar) % 2 !== 0}
            setStep={s => {
              const ss = [...steps]
              ss[index] = s
              setSteps(ss)
            }}
            active={cursor === index}
          />
        ))}
      </div>
      <IconButton onClick={onRemove} title="Remove Bar">
        <FontAwesomeIcon icon={["fad", "layer-minus"]} />
      </IconButton>
    </div>
  )
}
