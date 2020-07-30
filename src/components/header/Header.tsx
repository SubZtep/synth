/** @jsx jsx */
import { jsx } from "@emotion/core"
import HeaderWrapper from "./HeaderWrapper"
import MenuOpener from "./MenuOpener"
import Brand from "./Brand"
import Name from "./Name"
import Save from "./Save"

const Header = () => {
  return (
    <HeaderWrapper>
      <Brand />
      <div css={{ display: "flex", gap: 18, opacity: 0.4 }}>
        <Name />
        <Save />
        <MenuOpener />
      </div>
    </HeaderWrapper>
  )
}

export default Header
