/** @jsx jsx */
import { jsx } from "@emotion/core"
import NodeOverview from "../elems/NodeOverview"
import useAudio from "../../hooks/useAudio"
import { useRef, useEffect, useState } from "react"

export default function MediaElementAudioSourceNode({ id }: { id: string }) {
  const { audioContext, setNode } = useAudio()
  const node = useRef<MediaElementAudioSourceNode>()
  const audio = useRef<HTMLMediaElement>(null)
  const [source, setSource] = useState("http://ccmixter.org/content/doxent/doxent_-_Haze.mp3")
  const [audioSource, setAudioSource] = useState(source)
  const [playable, setPlayable] = useState(false)

  useEffect(() => {
    if (playable && audio.current) {
      console.log("AAA")
      node.current = audioContext.createMediaElementSource(audio.current)
      setNode(id, node.current)
    }
  }, [playable])

  return (
    <section className="component">
      <h3>Media</h3>
      <div>
        <NodeOverview
          id={id}
          link="https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode"
        >
          The <code>MediaElementAudioSourceNode</code> interface represents an audio source
          consisting of an HTML5 element.
        </NodeOverview>

        <p>Use any public audio file with anonymys access enabled. Press ENTER to load.</p>
        <div className="example">
          <form
            onSubmit={event => {
              event.preventDefault()
              setAudioSource(source)
            }}
          >
            <div className="field-row-stacked">
              <label>Source</label>
              <input type="text" value={source} onChange={value => setSource(value.target.value)} />
            </div>
          </form>
        </div>
        <p>Use the player below.</p>
        <div className="example">
          <audio
            crossOrigin="anonymus"
            onError={event => {
              if (
                // @ts-ignore
                window.confirm((event.target.error as MediaError).message + `\n\nClear Source?`)
              ) {
                setSource("")
              }
            }}
            ref={audio}
            controls
            src={audioSource}
            onCanPlayThrough={event => {
              setPlayable(true)
              console.log("BBB", event)
            }}
            onEmptied={event => console.log("EEEE", event)}
          />
        </div>
      </div>
    </section>
  )
}
