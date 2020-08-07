/** @jsx jsx */
import { jsx, css } from "@emotion/core"

const fontStyle = css`
  font-size: 0.8rem !important  ;
`

type Props = {
  BPM: number
  setBPM: (bpm: number) => void
  beatsPerBar: number
  setBeatsPerBar: (beatsPerBar: number) => void
  notesPerBeat: number
  setNotesPerBeat: (stepsPerBar: number) => void
}

export default ({
  BPM,
  setBPM,
  beatsPerBar,
  setBeatsPerBar,
  notesPerBeat,
  setNotesPerBeat,
}: Props) => {
  return (
    <div css={fontStyle}>
      <span>
        BPM:
        <input
          css={[fontStyle, { width: 60 }]}
          type="number"
          defaultValue={BPM}
          onChange={event => setBPM(event.currentTarget.valueAsNumber)}
        />
      </span>
      <span>
        Beats:
        <input
          css={[fontStyle, { width: 50 }]}
          type="number"
          min={1}
          defaultValue={beatsPerBar}
          onChange={event => setBeatsPerBar(event.currentTarget.valueAsNumber)}
        />
      </span>
      <span>
        Notes/Beat:
        <input
          css={[fontStyle, { width: 50 }]}
          type="number"
          min={1}
          defaultValue={notesPerBeat}
          onChange={event => setNotesPerBeat(event.currentTarget.valueAsNumber)}
        />
      </span>
    </div>
  )
}
