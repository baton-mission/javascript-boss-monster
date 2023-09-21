/**
 * 유저의 입력값을 가공하는 메서드입니다. 양측단 공백을 제거하고, formatToNumber가 true이면서 유효한 숫자값일 경우 숫자를 반환합니다.
 * @param {string} input
 * @param {string} formatToNumber
 * @returns {string | number}
 */
export const formatUserInput = (input, formatToNumber = false) => {
  if (!input || !input.length) return '';
  let result = input;
  result = result.trim();
  if (Number.isNaN(+result)) {
    return result;
  }

  return formatToNumber ? +result : result;
};
