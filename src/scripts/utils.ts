import { XYPosition } from "react-flow-renderer"

/**
 * Random number between:
 * @param min (included)
 * @param max (not included)
 */
export const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min

/**
 * Find appropriate position for the coming node.
 * @param canvasWidth Audio graph canvas width
 * @param canvasHeight Audio graph canvas height
 * @param bottom Place should be on the top or on the bottom
 */
export const newNodePosition = (
  canvasWidth: number,
  canvasHeight: number,
  bottom = false
): XYPosition => {
  const halfHeight = canvasHeight / 2
  return {
    x: randomBetween(0, canvasWidth - 200),
    y: bottom ? randomBetween(halfHeight, canvasHeight) : randomBetween(0, halfHeight),
  }
}

/**
 * Fix canvas blur problem
 * @param canvas Canvas DOM element
 * @returns Dimensions array
 */
export const dpiFix = (canvas: HTMLCanvasElement) => {
  const width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
  const height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
  const dpi = window.devicePixelRatio
  canvas.setAttribute("width", (width * dpi).toString())
  canvas.setAttribute("height", (height * dpi).toString())
  return { width, height }
}

/**
 * Format large number with spaces
 * @param num Float or integer number
 * @return Formatted number
 */
export const formatNumber = (num: number) => {
  var parts = num.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  return parts.join(".")
}
