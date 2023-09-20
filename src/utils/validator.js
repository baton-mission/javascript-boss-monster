export const isOutOfRange = (value, min, max) => value < min || value > max;

export const isDecimal = (value) => !Number.isInteger(value);
