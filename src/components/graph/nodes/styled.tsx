import styled from "@emotion/styled"

export const FormWrapper = styled.div`
  padding: 4px;
  gap: 2px;
  background-color: #364156;
}
`

export const FormWrapperGrid = styled(FormWrapper)`
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  align-items: center;
}
`

export const Title = styled.div`
  font-family: Tomorrow, sans-serif;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  font-size: 1.2rem;
  margin: 1px 0 4px;
`

export const Hr = styled.hr`
  margin: 10px 0 6px 0;
  border: 0;
  border-bottom: 2px ridge #212d40;
`

export const DelButton = styled.button`
  border: 0;
  background: transparent;
  color: #f33;
  font-size: 0.7rem;
  padding: 0;
`
