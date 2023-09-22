export const ERROR_MESSAGE = Object.freeze({
  INVALID_TOTAL_HP_MP: '플레이어의 HP와 MP의 총합이 200이 아닙니다!',

  IS_OUT_OF_RANGE: ({ target, min, max }, unit = '') =>
    `${min}~${max}${unit} 사이의 ${target}을 입력해주세요!`,
  IS_NOT_NUMBER: (target) => `${target}에 숫자를 입력해주세요!`,
  IS_DECIMAL: (target) => `${target}에 소수가 아닌 숫자를 입력해주세요!`,
  IS_BELOW_ZERO: (target) => `${target}에 0을 초과하는 숫자를 입력해주세요!`,

  EXISTING_SKILL: '이미 배운 스킬입니다!',
  MISSING_SKILL: '보유하지 않은 스킬입니다!',

  INSUFFICIENT_MP: '시전하는데 필요한 MP가 부족합니다!',

  UNKNOWN_CONDITION_CODE: '존재하지 않는 상태 코드입니다!',

  IS_ENDED_GAME: '종료된 전투입니다! 게임을 재시작해주세요!',

  INVALID_PLAYER: '올바른 플레이어를 설정해주세요!',
  INVALID_ENEMY: '올바른 적을 설정해주세요!',

  INVALID_SKILL_CASTER: '올바르지 않은 스킬 시전자입니다!',
  INVALID_SKILL_TARGET: '올바르지 않은 스킬 사용 대상입니다!',
  IS_SUFFICIENT_MP: '스킬을 배우는데 필요한 마나가 부족합니다!',
});
