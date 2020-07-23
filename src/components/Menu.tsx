/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useDispatch } from "react-redux"
import { toggleMenu } from "../features/ux/uxSlice"

const menuWrapper = css`
  top: 0;
  right: 0;
  width: 300px;
  position: fixed;
  z-index: 200;
  background-color: #000;
`

const Menu = () => {
  const dispatch = useDispatch()

  return (
    <div
      css={menuWrapper}
      onMouseEnter={() => dispatch(toggleMenu())}
      onMouseLeave={() => dispatch(toggleMenu())}
    >
      <h2 css={{ textAlign: "center" }}>MENU</h2>
      <ul css={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </ul>
    </div>
  )
}

export default Menu
