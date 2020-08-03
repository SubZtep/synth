/** @jsx jsx */
import { jsx, css } from "@emotion/core"

export default () => {
  return (
    <div
      className="brand"
      css={css`
        text-align: center;
        font-family: Tomorrow;
        padding: 2px;
        opacity: 0.25;
        transition: 100ms;
        &:hover {
          opacity: 1;
          transition: 3s;
          transition-timing-function: steps(6, end);
        }
      `}
    >
      <h1 css={{ fontSize: "2rem", margin: 0, color: "#f2f4f7" }}>
        WAA
        <span
          css={{ fontFamily: "Roboto", fontSize: "2.2rem", position: "relative", lineHeight: 0 }}
        >
          π
        </span>
        Synth
        <span css={{ marginLeft: 4, fontSize: "0.8rem", color: "#d9dbde" }}>
          v{process.env.REACT_APP_VERSION}
        </span>
      </h1>
    </div>
  )
}
