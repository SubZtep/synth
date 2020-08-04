import { Middleware, PayloadAction, Dispatch, AnyAction } from "@reduxjs/toolkit"
import { toggleReloadAudio } from "../features/ux/uxSlice"

const setupAudioMiddleware: Middleware = ({ dispatch }) => (next: Dispatch<AnyAction>) => (
  action: PayloadAction
) => {
  if (
    action.type.startsWith("activeSound/") &&
    !action.type.endsWith("setName") &&
    !action.type.endsWith("setPlayFrequency")
  ) {
    dispatch(toggleReloadAudio())
  }
  next(action)
}

export default setupAudioMiddleware
