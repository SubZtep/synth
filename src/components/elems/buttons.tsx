import styled from "@emotion/styled"

export const GraphMutateButton = styled.button<any>`
  position: absolute;
  top: ${props => (props.second ? "40px" : "8px")};
  right: 10px;
  width: 160px;
  height: 28px;
  z-index: 4;
  border-radius: 4px;
  background-color: #212d40;
  border-color: #212d40;
  color: #fff;
  svg {
    float: left;
    color: #ccc;
  }
`
export const NodeButton = styled.button<any>`
  width: 100%;
  height: 28px;
  border-radius: 4px;
  background-color: #212d40;
  border-color: #212d40;
  color: #fff;
  svg {
    float: left;
    color: #ccc;
  }
`
