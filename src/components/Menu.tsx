/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import useAudio, { AudioNodeType } from "../scripts/useAudio"

const add = css({
  cursor: "cell",
})

export default function Menu() {
  const { addNodeType } = useAudio()

  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    const nodeType = event.currentTarget.getAttribute("href")?.substring(1) as AudioNodeType
    if (nodeType) {
      try {
        addNodeType(nodeType)
      } catch (err) {
        alert(err)
      }
    }
  }

  return (
    <aside>
      <ul className="tree-view">
        <li>
          <a href="#intro">Intro</a>
        </li>
        <li>
          <a href="#components">Audio Nodes</a>
          <ul>
            <li>
              <a href="#button">Audio Source</a>
              <ul>
                <li>
                  <a href="#OscillatorNode" onClick={clickHandler} css={add}>
                    Oscillator
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#button">Effect Filters</a>
              <ul>
                <li>
                  <a href="#BiquadFilterNode" onClick={clickHandler} css={add}>
                    Biquad
                  </a>
                </li>
                <li>
                  <a href="#GainNode" onClick={clickHandler} css={add}>
                    Gain
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="#issues-contributing-etc">Issues, Contributing, etc.</a>
        </li>
      </ul>
    </aside>
  )
}
