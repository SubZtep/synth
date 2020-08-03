/* eslint-disable jsx-a11y/accessible-emoji */
/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { toggleMenu } from "../../features/ux/uxSlice"
import { validateSound } from "../../scripts/helpers"

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

  const loadDefaultSounds = async (name: string) => {
    try {
      const res = await fetch(`${window.location.pathname}/samples/${name}.json`)
      if (res.ok) {
        const sample = await res.json()
        if (validateSound(sample)) {
          localStorage.setItem("Kick", JSON.stringify(sample))
          toast.success(`${name} Loaded`)
        }
      }
    } catch (e) {
      toast.error(`${name} failed to load. ${e}`)
    }
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
          Preload <button onClick={() => loadDefaultSounds("Kick")}>Kick</button> and{" "}
          <button onClick={() => loadDefaultSounds("HiHat")}>HiHat 🐛</button> sounds to its name in
          local storage.
        </li>
      </ul>
    </MenuPopup>
  )
}
