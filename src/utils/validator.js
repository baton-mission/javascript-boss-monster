/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export const isOutOfRange = (value, min, max) => value < min || value > max;
/**
 * @param {number} value
 */
export const isDecimal = (value) => !Number.isInteger(value);
