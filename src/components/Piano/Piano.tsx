import styled from "@emotion/styled"
import React, { useRef } from "react"
import { useDispatch } from "react-redux"
import { setPlayFrequency } from "../../features/activeSound/activeSoundSlice"
import Widget from "../misc/Widget"

const PianoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 3rem;
  justify-content: center;
  user-select: none;
  padding-bottom: 0.5rem;

  > div {
    flex: 1;
    position: relative;
    height: 150px;
    margin: 0 1px;
    border: 1px solid #999;
    border-radius: 1px 1px 5px 5px;
    box-shadow: 2px 2px 5px #0006;
    cursor: pointer;
    background-color: #aaa;
    &:hover {
      background-color: #999;
    }
    &:active {
      background-color: #888;
    }
    &::after {
      position: absolute;
      bottom: 0.3rem;
      width: 100%;
      text-align: center;
      content: attr(data-note);
      font: 500 1.6rem Candara;
      color: #121212;
    }
  }

  > div > div {
    position: absolute;
    top: -1px;
    left: 70%;
    height: 105px;
    width: calc(60% + 2px);
    border-radius: 1px 1px 5px 5px;
    box-shadow: 2px 2px 5px #0006;
    cursor: pointer;
    z-index: 10;
    background-color: #000;
    &:hover {
      background-color: #111;
    }
    &:active {
      background-color: #222;
    }
  }
`

const Piano = () => {
  const dispatch = useDispatch()
  const lastFrequency = useRef<number | null>(null)

  const play = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.buttons === 1) {
      const data = (event.target as HTMLElement).getAttribute("data-frequency")
      const frequency = data !== null ? +data : null
      if (lastFrequency.current !== frequency) {
        dispatch(setPlayFrequency(data !== null ? +data : null))
        lastFrequency.current = frequency
      }
    }
  }

  const stop = () => {
    if (lastFrequency.current !== null) {
      dispatch(setPlayFrequency(null))
      lastFrequency.current = null
    }
  }

  return (
    <Widget title="Current Sound Tones">
      <PianoWrapper onMouseDown={play} onMouseMove={play} onMouseUp={stop} onMouseOut={stop}>
        <div data-frequency="261.626" data-note="C">
          <div data-frequency="277.18" data-note="C#"></div>
        </div>
        <div data-frequency="293.665" data-note="D">
          <div data-frequency="311.127"></div>
        </div>
        <div data-frequency="329.628" data-note="E"></div>
        <div data-frequency="349.228" data-note="F">
          <div data-frequency="369.994"></div>
        </div>
        <div data-frequency="391.995" data-note="G">
          <div data-frequency="415.305"></div>
        </div>
        <div data-frequency="440.000" data-note="A">
          <div data-frequency="466.164"></div>
        </div>
        <div data-frequency="493.883" data-note="B"></div>
        <div data-frequency="523.251" data-note="C">
          <div data-frequency="554.365"></div>
        </div>
        <div data-frequency="587.330" data-note="D">
          <div data-frequency="622.254"></div>
        </div>
        <div data-frequency="659.255" data-note="E"></div>
        <div data-frequency="698.457" data-note="F">
          <div data-frequency="739.989"></div>
        </div>
        <div data-frequency="783.991" data-note="G">
          <div data-frequency="830.609"></div>
        </div>
        <div data-frequency="880.000" data-note="A">
          <div data-frequency="932.328"></div>
        </div>
        <div data-frequency="987.767" data-note="B"></div>
        <div data-frequency="1046.50" data-note="C"></div>
      </PianoWrapper>
    </Widget>
  )
}

export default Piano
