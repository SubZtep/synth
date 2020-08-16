/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useState, Fragment, PropsWithChildren } from "react"

const titleStyle = css`
  border-top: 2px solid #000;
  // background-color: #11151c !important;
  background: linear-gradient(0deg, #000 0%, #11151c 100%);
  color: #d66853 !important;
  font-family: Tomorrow;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  padding: 2px 0 4px;
  cursor: pointer;
`

type Props = {
  title: string
}

export default ({ title, children }: PropsWithChildren<Props>) => {
  const [show, setShow] = useState(true)
  return (
    <Fragment>
      <div css={titleStyle} onClick={() => setShow(!show)}>
        {title}
      </div>
      {show && children}
    </Fragment>
  )
}
