/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import useAudio from "../hooks/useAudio"
import useMicrophone from "../hooks/useMicrophone"

const add = css({
  cursor: "cell",
})

export default function Menu() {
  const { createAudioNodeBundle } = useAudio()
  const { requestAudio } = useMicrophone()

  requestAudio(() => document.getElementById("micmenu")?.remove())

  const clickHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    const nodeType = event.currentTarget.getAttribute("href")?.substring(1)
    if (nodeType) {
      const node = createAudioNodeBundle(nodeType)
      if (node) {
        window.requestAnimationFrame(() => {
          const elem = document.getElementById(node.id)
          if (elem?.offsetTop) {
            window.scrollTo({ top: elem.offsetTop, left: 0, behavior: "smooth" })
          }
        })
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
                    Audio File
                  </a>
                </li>
                <li id="micmenu">
                  <a href="#MediaStreamAudioSourceNode" onClick={clickHandler} css={add}>
                    Microphone
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
