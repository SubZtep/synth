/** @jsx jsx */
import { jsx } from "@emotion/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconButton } from "../../styled"

type Props = {
  playing: boolean
  setPlaying: (playing: boolean) => void
}

export default ({ playing, setPlaying }: Props) => {
  return (
    <div>
      <IconButton onClick={() => setPlaying(true)} disabled={playing}>
        <FontAwesomeIcon icon={["fad", "play"]} fixedWidth size="lg" />
      </IconButton>
      <IconButton onClick={() => setPlaying(false)} disabled={!playing}>
        <FontAwesomeIcon icon={["fad", "stop"]} fixedWidth size="lg" />
      </IconButton>
    </div>
  )
}
