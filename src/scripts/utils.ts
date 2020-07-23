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
  const halfWidth = canvasWidth / 2
  const halfHeight = canvasHeight / 2
  return {
    x: randomBetween(-halfWidth, halfWidth),
    y: bottom ? randomBetween(0, halfHeight) : randomBetween(-halfHeight, 0),
  }
}
