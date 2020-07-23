import styled from "@emotion/styled"

export const Title = styled.div`
  text-align: center;
`

export const FormWrapper = styled.div`
  padding: 8px;
  margin: 8px 0;
  background-color: #364156;
  cursor: default;
`

export const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  text-transform: capitalize;
  input[type="number"] {
    display: block;
    margin-top: 2px;
    background-color: rgba(255, 255, 255, 0.7);
    border-width: 1px;
    padding: 1px 0 1px 4px;
  }
  > :not(:last-child) {
    margin-bottom: 12px;
  }
`

export const Hr = styled.hr`
  margin: 10px 0 6px 0;
  border: 0;
  border-bottom: 2px ridge #212d40;
`
