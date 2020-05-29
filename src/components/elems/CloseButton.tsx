/** @jsx jsx */
import { jsx } from "@emotion/core"

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export default function CloseButton({ onClick }: Props) {
  const attrs = onClick ? { onClick } : {}
  return (
    <div
      className="title-bar-controls"
      css={{ position: "absolute", top: 8, right: 8 }}
      title="Remove Node"
    >
      <button aria-label="Close" {...attrs}></button>
    </div>
  )
}
