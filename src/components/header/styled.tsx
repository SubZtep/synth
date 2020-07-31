import styled from "@emotion/styled"

export const HeaderWrapper = styled.div`
  background-color: #11151c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 3px;
`

export const MenuWrapper = styled.div`
  display: flex;
  gap: 18px;
  opacity: 0.75;
  transition: 100ms;
  &:hover {
    opacity: 1;
    transition: 100ms;
  }
`

export const LoadWrapper = styled.div`
  transition: 50ms;
  display: flex;
  select {
    display: none;
    margin-right: 8px;
  }
  &:hover {
    select {
      display: block;
    }
    svg {
      transition: 50ms;
      transform: scale(1.05);
    }
  }
`

export const menuWrapper = styled.div`
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
    line-height: 1.6px;
    font-size: 1.1rem;
    padding-left: 25px;
  }
`
