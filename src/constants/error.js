import { Player } from '../domain/units';

const ERROR_MESSAGE = Object.freeze({
  OUT_OF_RANGE_PLAYER_NAME: `${Player.CREATION_CONDITION.MIN_PLAYER_NAME}~${Player.CREATION_CONDITION.MAX_PLAYER_NAME}자의 이름을 입력해주세요!`,
  INVALID_TOTAL_HP_MP: `HP와 MP의 총합이 ${Player.CREATION_CONDITION.TOTAL_HP_MP}이 아닙니다!`,

  IS_NOT_NUMBER: (target) => `${target}에 숫자를 입력해주세요!`,
  IS_DECIMAL: (target) => `${target}에 소수가 아닌 입력해주세요!`,

  EXISTING_SKILL: '이미 배운 스킬입니다!',
});

export default ERROR_MESSAGE;
