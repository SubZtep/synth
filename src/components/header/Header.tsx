import React from "react"
import { HeaderWrapper, MenuWrapper } from "./styled"
import MenuOpener from "./MenuOpener"
import Brand from "./Brand"
import Name from "./Name"
import Save from "./Save"
import Load from "./Load"

const Header = () => {
  return (
    <HeaderWrapper>
      <Brand />
      <MenuWrapper>
        <Load />
        <Name />
        <Save />
        <MenuOpener />
      </MenuWrapper>
    </HeaderWrapper>
  )
}

export default Header
