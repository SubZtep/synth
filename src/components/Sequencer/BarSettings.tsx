/** @jsx jsx */
import { jsx, css } from "@emotion/core"

const selectStyle = css`
  font-size: 0.8rem !important;
  padding: 1px 2px !important;
  margin-left: 2px;
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
    <div
      css={css`
        font-size: 0.8rem !important;
        display: flex;
        justify-content: space-between;
        padding: 8px;
      `}
    >
      <div>
        BPM:
        <input
          title="BPM"
          css={[selectStyle, { width: 55 }]}
          type="number"
          defaultValue={BPM}
          onChange={event => setBPM(event.currentTarget.valueAsNumber)}
        />
      </div>
      <div>
        Beats:
        <input
          title="Beats"
          css={[selectStyle, { width: 45 }]}
          type="number"
          min={1}
          defaultValue={beatsPerBar}
          onChange={event => setBeatsPerBar(event.currentTarget.valueAsNumber)}
        />
      </div>
      <div>
        Notes/Beat:
        <input
          title="Notes/Beat"
          css={[selectStyle, { width: 45 }]}
          type="number"
          min={1}
          defaultValue={notesPerBeat}
          onChange={event => setNotesPerBeat(event.currentTarget.valueAsNumber)}
        />
      </div>
    </div>
  )
}
