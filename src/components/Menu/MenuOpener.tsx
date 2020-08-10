/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Fragment, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { selectMenu, toggleMenu } from "../../features/ux/uxSlice"
import { useSelector, useDispatch } from "react-redux"
import Menu from "./Menu"

const MenuOpener = () => {
  const menu = useSelector(selectMenu)
  const dispatch = useDispatch()
  const timer = useRef<NodeJS.Timeout | null>(null)

  return (
    <Fragment>
      <FontAwesomeIcon
        className="menuOpener"
        fixedWidth
        icon={["fad", "bars"]}
        size="2x"
        onMouseEnter={() => {
          if (timer.current === null) {
            timer.current = setTimeout(() => {
              dispatch(toggleMenu())
              timer.current = null
            }, 500)
          }
        }}
        onMouseLeave={() => {
          if (timer.current !== null) {
            clearTimeout(timer.current)
            timer.current = null
          }
        }}
      />
      {menu && <Menu />}
    </Fragment>
  )
}

export default MenuOpener
