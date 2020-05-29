/** @jsx jsx */
import { jsx } from "@emotion/core"
import CloseButton from "./CloseButton"
import useAudio from "../../hooks/useAudio"

type Props = {
  children?: React.ReactNode
  /** AudioNodeBundle ID for remove node */
  id?: string
  link?: string
}

export default function NodeOverview({ children, id, link }: Props) {
  const { removeAudioNodeBundle } = useAudio()

  return (
    <blockquote style={{ position: "relative" }}>
      {id && <CloseButton onClick={() => removeAudioNodeBundle(id)} />}
      {children}
      {link && (
        <a
          href={link}
          css={{
            textDecoration: "none",
            position: "absolute",
            fontSize: 13,
            marginLeft: 3,
            marginTop: -2,
          }}
          title="Specification"
        >
          <span role="img" aria-label="Link to Specification">
            🔗
          </span>
        </a>
      )}
    </blockquote>
  )
}
