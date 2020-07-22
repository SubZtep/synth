/**
 * Random number between
 * @param min (included)
 * @param max (not included)
 */
export const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min
