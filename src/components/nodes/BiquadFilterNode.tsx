/** @jsx jsx */
import { jsx } from "@emotion/core"
import useAudio from "../../scripts/useAudio"

type Props = {
  mykey: string
  biquadFilterNode: BiquadFilterNode
}

export default function BiquadFilterNode({ mykey, biquadFilterNode }: Props) {
  const { delNodeType } = useAudio()

  biquadFilterNode.type = "allpass"

  const close = () => {
    delNodeType(mykey)
  }

  return (
    <section className="component" id="gain">
      <h3>Biquad</h3>

      <div>
        <blockquote>
          <div className="title-bar-controls" css={{ float: "right" }}>
            <button aria-label="Close" onClick={close}></button>
          </div>
          BiquadFilterNode. It is an <code>AudioNode</code> that can represent different kinds of
          filters, tone control devices, and graphic equalizers.
        </blockquote>
      </div>
    </section>
  )
}
