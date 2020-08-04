/* eslint-disable jsx-a11y/accessible-emoji */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { toggleMenu, toggleSideLeft } from "../../features/ux/uxSlice"
import { validateSound } from "../../scripts/helpers"
import { MenuPopup } from "../../styled"

export default () => {
  const dispatch = useDispatch()

  const loadDefaultSounds = async (name: string) => {
    try {
      const res = await fetch(`${window.location.pathname}/samples/${name}.json`)
      if (res.ok) {
        const sample = await res.json()
        if (validateSound(sample)) {
          localStorage.setItem(name, JSON.stringify(sample))
          toast.success(`${name} Loaded`)
        }
      }
    } catch (e) {
      toast.error(`${name} failed to load. ${e}`)
    }
  }

  return (
    <MenuPopup className="menu" onMouseLeave={() => dispatch(toggleMenu())}>
      <h2>MENU</h2>
      <ul>
        <li>
          Refresh often because something is not right yet. Load samples below with the buttons and
          select from the dropdown to have a look. Crash and Refresh. =] (This version only deployed
          for testing purposes.)
        </li>
        <li>
          Open poorly managed{" "}
          <a href="https://github.com/SubZtep/synth/wiki" target="_blank" rel="noopener noreferrer">
            Wiki page
          </a>
          .
        </li>
        <li>
          Preload <button onClick={() => loadDefaultSounds("Kick")}>Kick</button> and{" "}
          <button onClick={() => loadDefaultSounds("HiHat")}>HiHat 🐛</button> sounds to its name in
          local storage.
        </li>
        <li>
          <button onClick={() => dispatch(toggleSideLeft())}>Switch</button> sidebar position
          between left and right.
        </li>
      </ul>
    </MenuPopup>
  )
}
