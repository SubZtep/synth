/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { useDispatch } from "react-redux"
import { toggleMenu } from "../../features/ux/uxSlice"
import Kick from "../../samples/Kick.json"
import HiHat from "../../samples/HiHat.json"

const menuWrapper = css`
  top: 0;
  right: 0;
  width: 280px;
  position: fixed;
  z-index: 200;
  background-color: #000;
  padding: 25px;
  box-shadow: 5px 5px 15px 5px #000000;
  a {
    color: #66f;
  }
`

const Menu = () => {
  const dispatch = useDispatch()

  const loadDefaultSounds = () => {
    localStorage.setItem("Kick", JSON.stringify(Kick))
    localStorage.setItem("HiHat", JSON.stringify(HiHat))
  }

  return (
    <div css={menuWrapper} onMouseLeave={() => dispatch(toggleMenu())}>
      <h2 css={{ textAlign: "center" }}>MENU</h2>
      <ul css={{ lineHeight: 1.6, fontSize: "1.1rem", paddingLeft: 25 }}>
        <li>
          Open poorly managed{" "}
          <a href="https://github.com/SubZtep/synth/wiki" target="_blank" rel="noopener noreferrer">
            Wiki page
          </a>
          .
        </li>
        <li>
          <button onClick={loadDefaultSounds}>Load default sounds</button>, will overwrite{" "}
          <em>Kick</em> and <em>HiHat</em> names in local storage.
        </li>
      </ul>
    </div>
  )
}

export default Menu
