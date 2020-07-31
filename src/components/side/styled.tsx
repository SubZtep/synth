import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const InputName = styled.input`
  flex-grow: 1;
  border-radius: 3px;
  background-color: transparent;
  border: 2px solid #434444;
  font-family: Tomorrow;
  padding: 2px 4px;
  color: #fff;
  &:focus {
    border-color: #e8a99c;
  }
`

export const btnIconStyle = css`
  cursor: pointer;
  transition: 50ms;
  &:hover {
    transition: 50ms;
    transform: scale(1.05);
  }
`

export const SelectNames = styled(InputName)`
  option {
    background-color: #212d40;
  }
`

export const DataStoreItem = styled.div`
  display: flex;
  gap: 8px;
`
