/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useDispatch } from "react-redux"
import { toggleMenu } from "../../features/ux/uxSlice"
import HiHat from "../../samples/HiHat.json"
import Kick from "../../samples/Kick.json"
import { MenuPopup } from "./styled"

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
