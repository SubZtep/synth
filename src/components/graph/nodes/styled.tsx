import styled from "@emotion/styled"

export const NodeBody = styled.div`
  padding: 4px;
  border-radius: 3px;
  background-color: #364156;
  // font-weight: 300;
`

export const FormGrid = styled.div`
  display: grid;
  gap: 3px;
  grid-template-columns: 0.8fr 1fr;
  align-items: center;
  font-size: 0.95rem;
  input[type="text"],
  input[type="number"],
  input[type="color"],
  select {
    width: 120px;
    background-color: transparent;
    border: 1px solid #d66853;
    border-radius: 2px;
    color: #f7e2de;
    font-family: Roboto;
    font-size: 0.85rem;
    padding: 2px 4px;
    &:focus {
      border-color: #e8a99c;
    }
  }
  option {
    background-color: #212d40;
  }
`

export const FormWrapper = styled.div`
  // padding: 4px;
  // background-color: #364156;
  // font-weight: 300;
}
`

export const FormWrapperGrid = styled(FormWrapper)`
  display: grid;
  gap: 2px;
  grid-template-columns: 0.8fr 1fr;
  align-items: center;
}
`

export const H1 = styled.div`
  font-family: Tomorrow, sans-serif;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  font-size: 1.2rem;
  margin: 1px 0 4px;
`

export const H2 = styled.div`
  font-family: Tomorrow, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.1rem;
  margin: 12px 0;
  &:first-of-type {
    margin-top: 0;
  }
`

export const Hr = styled.hr`
  margin: 10px 0 6px 0;
  border: 0;
  border-bottom: 2px ridge #374c6c;
`

export const DelButton = styled.button`
  border: 0;
  background: transparent;
  color: #f33;
  font-size: 0.7rem;
  padding: 0;
`

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
  // margin: 0 6px;
  line-height: 1.35rem;
`

export const DataKey = styled.span`
  font-weight: 100;
`

export const DataNote = styled.div`
  font-size: 0.8rem;
  color: #999;
  word-spacing: -1px;
`
