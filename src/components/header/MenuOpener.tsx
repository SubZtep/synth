import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { selectMenu, toggleMenu } from "../../features/ux/uxSlice"
import { useSelector, useDispatch } from "react-redux"
import Menu from "./Menu"

const MenuOpener = () => {
  const menu = useSelector(selectMenu)
  const dispatch = useDispatch()

  return (
    <>
      <FontAwesomeIcon
        icon={["fas", "bars"]}
        size="lg"
        onMouseEnter={() => dispatch(toggleMenu())}
        onMouseLeave={() => dispatch(toggleMenu())}
      />
      {menu && <Menu />}
    </>
  )
}

export default MenuOpener
