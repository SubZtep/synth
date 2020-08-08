/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useState, useEffect, useMemo, useRef } from "react"
import PlaybackControls from "./PlaybackControls"
import { sound } from "../../scripts/audio"
import useTimer from "../../hooks/useTimer"
import BarSettings from "./BarSettings"
import Bar from "./Bar"
import { IconButton } from "../../styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LocalSoundSelect from "../misc/LocalSoundSelect"

export type StepValue = number | null

export default () => {
  const baseBPMPerOneSecond = 60
  const barsPerSequence = 1
  const [notesPerBeat, setNotesPerBeat] = useState(4)
  const [beatsPerBar, setBeatsPerBar] = useState(4)
  const stepsPerBar = useMemo(() => notesPerBeat * beatsPerBar, [notesPerBeat, beatsPerBar])
  const totalSteps = stepsPerBar * barsPerSequence
  const totalBeats = beatsPerBar * barsPerSequence
  const [BPM, setBPM] = useState(140)
  const timePerSequence = useMemo(() => (baseBPMPerOneSecond / BPM) * 1000 * totalBeats, [
    baseBPMPerOneSecond,
    BPM,
    totalBeats,
  ])
  const timePerStep = useMemo(() => timePerSequence / totalSteps, [timePerSequence, totalSteps])
  const [cursor, setCursor] = useState(0)
  const [playing, setPlaying] = useState(false)
  const addBarSound = useRef("")
  const [barSounds, setBarSounds] = useState<string[]>([""])

  useTimer(
    () => {
      setCursor(cursor < totalSteps - 1 ? cursor + 1 : 0)
    },
    playing ? timePerStep : null
  )

  useEffect(() => {
    if (cursor > stepsPerBar) {
      setCursor(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepsPerBar])

  useEffect(() => {
    if (!playing) {
      sound.stop()
    }
  }, [playing])

  return (
    <div>
      <div css={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PlaybackControls {...{ playing, setPlaying }} />
        <BarSettings
          {...{ BPM, setBPM, notesPerBeat, setNotesPerBeat, beatsPerBar, setBeatsPerBar }}
        />
      </div>
      <div>
        {barSounds.map((barSound, index) => (
          <Bar
            key={`${index}-${barSound}`}
            {...{ cursor, beatsPerBar, stepsPerBar }}
            main={index === 0}
            barSound={barSound}
          />
        ))}
      </div>
      <div
        css={css`
          > select {
            padding: 2px !important;
            font-size: 0.8rem !important;
          }
        `}
      >
        <IconButton
          onClick={() => {
            setBarSounds([...barSounds, addBarSound.current])
          }}
        >
          <FontAwesomeIcon icon={["fad", "layer-plus"]} />
          <div>Add Bar with pre-selected sound</div>
        </IconButton>
        <LocalSoundSelect
          defaultText="--- Current ---"
          onChange={name => {
            addBarSound.current = name
          }}
        />
      </div>
    </div>
  )
}
