/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { v4 as uuidv4 } from "uuid"
import { useState, useEffect, useMemo } from "react"
import PlaybackControls from "./PlaybackControls"
import { sound } from "../../scripts/audio"
import useTimer from "../../hooks/useTimer"
import BarSettings from "./BarSettings"
import Bar from "./Bar"
import { IconButton } from "../../styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
  const [showSettings, setShowSettings] = useState(false)
  const [bars, setBars] = useState<string[]>([uuidv4()])

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
        <div>
          <IconButton onClick={() => {}} title="Render To Audio File">
            <FontAwesomeIcon icon={["fad", "file-audio"]} fixedWidth size="lg" />
          </IconButton>
          <IconButton
            onClick={() => setShowSettings(!showSettings)}
            title="Open/Close Bar Settings"
          >
            <FontAwesomeIcon icon={["fad", "cogs"]} />
          </IconButton>
          <IconButton onClick={() => setBars([...bars, uuidv4()])} title="Add Bar">
            <FontAwesomeIcon icon={["fad", "layer-plus"]} />
          </IconButton>
        </div>
      </div>
      {showSettings && (
        <BarSettings
          {...{
            BPM,
            setBPM,
            notesPerBeat,
            setNotesPerBeat,
            beatsPerBar,
            setBeatsPerBar,
          }}
        />
      )}
      <div>
        {bars.map(barId => (
          <Bar
            key={barId}
            {...{ cursor, beatsPerBar, stepsPerBar }}
            onRemove={() => {
              const index = bars.indexOf(barId)
              if (index !== -1) {
                const tmp = [...bars]
                tmp.splice(index, 1)
                setBars(tmp)
              }
            }}
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
      ></div>
    </div>
  )
}
