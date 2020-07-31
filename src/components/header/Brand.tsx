/** @jsx jsx */
import { jsx } from "@emotion/core"

export default () => {
  return (
    <div css={{ display: "flex", alignItems: "flex-end" }}>
      <h1 css={{ margin: 0, color: "#f2f4f7" }}>WAAπSynth</h1>
      <div css={{ margin: 4, color: "#d9dbde" }}>v{process.env.REACT_APP_VERSION}</div>
    </div>
  )
}
