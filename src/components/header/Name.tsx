/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { selectName, setName } from "../../features/activeSound/activeSoundSlice"
import { useSelector, useDispatch } from "react-redux"

const Name = () => {
  const name = useSelector(selectName)
  const dispatch = useDispatch()

  return (
    <div>
      <FontAwesomeIcon icon={["fal", "file-signature"]} size="lg" />
      <input
        type="text"
        defaultValue={name}
        onChange={event => dispatch(setName(event.target.value))}
        css={css`
          background-color: transparent;
          border: 1px solid #323333;
          font-family: Tomorrow;
          padding: 2px 4px;
          margin-left: 8px;
          color: #fff;
        `}
        onFocus={event => event.target.select()}
      />
    </div>
  )
}

export default Name
