import { configureStore } from "@reduxjs/toolkit"
import activeSoundSlice from "./features/activeSound/activeSoundSlice"
import soundsSlice from "./features/sounds/soundsSlice"
import uxSlice from "./features/ux/uxSlice"

export default configureStore({
  reducer: {
    activeSound: activeSoundSlice,
    sounds: soundsSlice,
    ux: uxSlice,
  },
})
