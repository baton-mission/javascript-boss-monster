/**
 * 유저의 입력값을 가공하는 메서드입니다. 양측단 공백을 제거하고, 입력값이 숫자일 경우 숫자를 반환합니다.
 * @param {string} input
 * @returns {string | number}
 */
export const formatUserInput = (input) => {
  if (!input.length) return input;
  let result = input;
  result = result.trim();
  result = Number.isNaN(+result) ? result : +result;

  return result;
};
