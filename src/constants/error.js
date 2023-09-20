const ERROR_MESSAGE = Object.freeze({
  INVALID_TOTAL_HP_MP: 'HP와 MP의 총합이 200이 아닙니다!',

  IS_OUT_OF_RANGE: ({ target, min, max }, unit = '') => `${min}~${max}${unit} 사이의 ${target}을 입력해주세요!`,
  IS_NOT_NUMBER: (target) => `${target}에 숫자를 입력해주세요!`,
  IS_DECIMAL: (target) => `${target}에 소수가 아닌 숫자를 입력해주세요!`,
  IS_BELOW_ZERO: (target) => `${target}에 0을 초과하는 숫자를 입력해주세요!`,

  EXISTING_SKILL: '이미 배운 스킬입니다!',

  UNKNOWN_CONDITION_CODE: '존재하지 않는 상태 코드입니다!',
});

export default ERROR_MESSAGE;
