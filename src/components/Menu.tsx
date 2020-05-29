/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import useAudio from "../hooks/useAudio"

const add = css({
  cursor: "cell",
})

export default function Menu() {
  const { createAudioNodeBundle } = useAudio()

  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    const nodeType = event.currentTarget.getAttribute("href")?.substring(1)
    if (nodeType) {
      createAudioNodeBundle(nodeType)
    }
  }

  return (
    <aside>
      <ul className="tree-view">
        <li>
          <a href="#intro">Intro</a>
        </li>
        <li>
          <a href="#nodes">Audio Nodes</a>
          <ul>
            <li>
              Audio Source
              <ul>
                <li>
                  <a href="#OscillatorNode" onClick={clickHandler} css={add}>
                    Oscillator
                  </a>
                </li>
                <li>
                  <a href="#MediaElementAudioSourceNode" onClick={clickHandler} css={add}>
                    Media
                  </a>
                </li>
              </ul>
            </li>
            <li>
              Effect Filters
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
                <li>
                  <a href="#ConvolverNode" onClick={clickHandler} css={add}>
                    Convolver
                  </a>
                </li>
              </ul>
            </li>
            <li>
              Visualization
              <ul>
                <li>
                  <a href="#AnalyserNode" onClick={clickHandler} css={add}>
                    Analyser
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="#outro">Outro</a>
        </li>
      </ul>
    </aside>
  )
}
