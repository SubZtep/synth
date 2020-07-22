/** @jsx jsx */
import { jsx, css } from "@emotion/core"

const Piano = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        font-size: 3rem;
        justify-content: center;
        background-color: #11151c;
        color: #fff;
      `}
    >
      PIANO
    </div>
  )
}

export default Piano
