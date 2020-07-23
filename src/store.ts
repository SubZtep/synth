import { configureStore } from "@reduxjs/toolkit"
import soundsSlice from "./features/sounds/soundsSlice"
import uxSlice from "./features/ux/uxSlice"

export default configureStore({
  reducer: {
    sounds: soundsSlice,
    ux: uxSlice,
  },
})
