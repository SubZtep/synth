/* eslint-disable react-hooks/exhaustive-deps */
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { setPlayFrequency } from "../../features/activeSound/activeSoundSlice"
import { selectSteps, selectSoundName, setSoundName } from "../../features/sounds/soundsSlice"
import LocalSoundSelect from "../misc/LocalSoundSelect"
import { loadSound } from "../../scripts/audio"
import { IconButton } from "../../styled"
import Sound from "../../scripts/Sound"
import Step from "./Step"

const sequenceStyle = css`
  width: 100%;
  display: flex;
  justify-items: stretch;
  align-items: stretch;
  background-color: #000;
  flex-grow: 1;
`

const barStyle = css`
  display: flex;
  > select {
    padding: 0px !important;
    font-size: 0.9rem !important;
    width: 45px;
  }
`

type Props = {
  barId: string
  beatsPerBar: number
  cursor: number
  onRemove: () => void
}

export default ({ barId, beatsPerBar, cursor, onRemove }: Props) => {
  const dispatch = useDispatch()
  const steps = useSelector(selectSteps)(barId)
  const soundName = useSelector(selectSoundName)(barId)
  const sound = useRef<Sound | null>(null)

  useEffect(() => {
    if (soundName !== "") {
      setTimeout(() => {
        sound.current = loadSound(soundName)
      })
    }
  }, [soundName])

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
    <div css={barStyle}>
      <LocalSoundSelect
        selected={soundName}
        onChange={name => void dispatch(setSoundName({ barId, soundName: name }))}
        defaultText="Editor Sound"
        title="Bar's Instrument"
      />
      <div css={sequenceStyle}>
        {steps.map((step, index) => (
          <Step
            key={index.toString()}
            step={step}
            barId={barId}
            stepNr={index}
            secondary={Math.floor(index / beatsPerBar) % 2 !== 0}
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
