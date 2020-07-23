/** @jsx jsx */
import { Fragment } from "react"
import { jsx } from "@emotion/core"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { selectMenu, toggleMenu } from "../features/ux/uxSlice"
import HeaderWrapper from "./elems/HeaderWrapper"
import Menu from "./Menu"

const Header = () => {
  const menu = useSelector(selectMenu)
  const dispatch = useDispatch()

  return (
    <Fragment>
      <HeaderWrapper>
        <h1 css={{ margin: 0, color: "#f2f4f7" }}>WAAπSynth</h1>
        <FontAwesomeIcon
          icon={["fas", "bars"]}
          size="lg"
          onMouseEnter={() => dispatch(toggleMenu())}
          onMouseLeave={() => dispatch(toggleMenu())}
        />
        {menu && <Menu />}
      </HeaderWrapper>
    </Fragment>
  )
}

export default Header
