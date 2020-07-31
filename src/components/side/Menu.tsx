/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { useDispatch } from "react-redux"
import { toggleMenu } from "../../features/ux/uxSlice"
import HiHat from "../../samples/HiHat.json"
import Kick from "../../samples/Kick.json"

export const MenuPopup = styled.div`
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
  h2 {
    text-align: center;
  }
  ul {
    line-height: 28px;
    font-size: 1.1rem;
    padding-left: 25px;
  }
`

export default () => {
  const dispatch = useDispatch()

  const loadDefaultSounds = () => {
    localStorage.setItem("Kick", JSON.stringify(Kick))
    localStorage.setItem("HiHat", JSON.stringify(HiHat))
  }

  return (
    <MenuPopup onMouseLeave={() => dispatch(toggleMenu())}>
      <h2>MENU</h2>
      <ul>
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
    </MenuPopup>
  )
}
