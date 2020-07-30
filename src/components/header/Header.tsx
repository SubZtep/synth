/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import HeaderWrapper from "./HeaderWrapper"
import MenuOpener from "./MenuOpener"
import Brand from "./Brand"
import Name from "./Name"
import Save from "./Save"
import Load from "./Load"

const Header = () => {
  return (
    <HeaderWrapper>
      <Brand />
      <div
        css={css`
          display: flex;
          gap: 18px;
          opacity: 0.75;
          transition: 100ms;
          &:hover {
            opacity: 1;
            transition: 100ms;
          }
        `}
      >
        <Load />
        <Name />
        <Save />
        <MenuOpener />
      </div>
    </HeaderWrapper>
  )
}

export default Header
