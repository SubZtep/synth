/** @jsx jsx */
import "aframe"
// @ts-ignore
import { Entity, Scene } from "aframe-react"
import { jsx, css } from "@emotion/core"

export default () => {
  return (
    <div
      css={css`
        resize: horizontal;
        min-width: 80px;
        width: calc(100% - var(--side-default-width));
      `}
    >
      <Scene embedded>
        <Entity primitive="a-sky" color="#212d40" />
        <Entity primitive="a-plane" color="#364156" rotation="-90 0 0" height="10" width="10" />
        <Entity primitive="a-box" position="-1 0.5 -3" rotation="0 45 0" color="#11151C" />
      </Scene>
    </div>
  )
}
