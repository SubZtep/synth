import React from "react"
import styled from "@emotion/styled"

export const Main = styled.div({ width: "100%" })

type Props = {
  children: React.ReactNode
  id?: string
}

export const Section = (props: Props) => {
  const attrs = {} as { [key: string]: any }
  if (props.id) {
    attrs.id = props.id
  }
  return (
    <section className="component" {...attrs}>
      {props.children}
    </section>
  )
}

export const Example = ({ children }: Props) => <div className="example">{children}</div>
