import styled from "@emotion/styled"

export const NodeBody = styled.div`
  padding: 4px 6px;
  border-radius: 3px 3px 2px 2px;
  background-color: #364156;
  // font-weight: 300;

  input,
  select,
  button {
    font-size: 0.95rem;
    flex-grow: 1;
    border-radius: 3px;
    background-color: transparent;
    border: 1px solid var(--input-border);
    font-family: Roboto;
    padding: 6px;
    color: #fff;
    &:focus {
      border-color: var(--input-border-focus);
      border-width: 2px;
      padding: 5px;
    }
  }

  select option {
    background-color: var(--widget-bg);
  }

  button {
    width: 100%;
    background-color: var(--button-bg);
    border-width: 2px;
    border-style: outset;
    cursor: pointer;
    &:focus {
      padding: 6px;
    }
  }
`

export const FormWrapper = styled.div`
  table {
    select, input {
      padding: 2px;
      width: 60px;
      &:focus {
        padding: 1px;
      }
    }
  }
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
  margin: 2px 0 5px;
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
  margin: 15px 0 10px 0;
  border: 0;
  border-bottom: 1px dashed var(--node-bg);
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
  line-height: 1.35rem;
`

export const DataKey = styled.span`
  font-weight: 100;
`

export const DataNote = styled.div`
  font-size: 0.8rem;
  color: #999;
  word-spacing: -1px;

  button {
    margin-left: 6px;
  }
`
