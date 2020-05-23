/** @jsx jsx */
import { jsx } from "@emotion/core"
import CloseButton from "./CloseButton"

type Props = {
  children?: React.ReactNode
  /** Close button click */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  link?: string
}

export default function NodeOverview({ children, onClick, link }: Props) {
  return (
    <blockquote>
      {onClick && <CloseButton onClick={onClick} />}
      {children}
      {link && (
        <a href={link} css={{ textDecoration: "none" }} title="Specification">
          <span role="img" aria-label="Link to Specification">
            🔗
          </span>
        </a>
      )}
    </blockquote>
  )
}
