/** @jsx jsx */
import { jsx } from "@emotion/core"

export default () => {
  return (
    <div css={{ textAlign: "center", fontFamily: "Tomorrow", padding: 2 }}>
      <h1 css={{ fontSize: "1.6rem", margin: 0, color: "#f2f4f7" }}>
        WAA
        <span
          css={{ fontFamily: "Roboto", fontSize: "2.2rem", position: "relative", lineHeight: 0 }}
        >
          π
        </span>
        Synth
        <span css={{ marginLeft: 4, fontSize: "0.65rem", color: "#d9dbde" }}>
          v{process.env.REACT_APP_VERSION}
        </span>
      </h1>
    </div>
  )
}
