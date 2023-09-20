const ERROR_MESSAGE = Object.freeze({
  INVALID_TOTAL_HP_MP: 'HP와 MP의 총합이 200이 아닙니다!',

  IS_OUT_OF_RANGE: ({ target, min, max }, isLength = false) =>
    `${min}~${max}${isLength ? '자' : ''}의 ${target}을 입력해주세요!`,
  IS_NOT_NUMBER: (value) => `${value}에 숫자를 입력해주세요!`,
  IS_DECIMAL: (value) => `${value}에 소수가 아닌 숫자를 입력해주세요!`,
  IS_BELOW_ZERO: (value) => `${value}에 0을 초과하는 숫자를 입력해주세요!`,

  EXISTING_SKILL: '이미 배운 스킬입니다!',
});

export default ERROR_MESSAGE;
