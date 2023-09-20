export const isOutOfRange = (target, min, max) => target >= min && target <= max;

export const isDecimal = (target) => !Number.isInteger(target);
