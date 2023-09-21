export const ERROR_MESSAGE = Object.freeze({
  INVALID_TOTAL_HP_MP: 'HP와 MP의 총합이 200이 아닙니다!',

  IS_OUT_OF_RANGE: ({ target, min, max }, unit = '') =>
    `${min}~${max}${unit} 사이의 ${target}을 입력해주세요!`,
  IS_NOT_NUMBER: (target) => `${target}에 숫자를 입력해주세요!`,
  IS_DECIMAL: (target) => `${target}에 소수가 아닌 숫자를 입력해주세요!`,
  IS_BELOW_ZERO: (target) => `${target}에 0을 초과하는 숫자를 입력해주세요!`,

  EXISTING_SKILL: '이미 배운 스킬입니다!',
  MISSING_SKILL: '보유하지 않은 스킬입니다!',

  INSUFFICIENT_MP: '시전하는데 필요한 MP가 부족합니다!',

  UNKNOWN_CONDITION_CODE: '존재하지 않는 상태 코드입니다!',
});
