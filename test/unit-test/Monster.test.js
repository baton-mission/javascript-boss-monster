import { Player } from '../../src/domain/units';
import { RandomAttack } from '../../src/domain/skills';
import { Random } from '../../src/utils/random';
import ERROR_MESSAGE from '../../src/constants/error';
import { BossMonster } from '../../src/domain/units/monsters/BossMonster';

jest.spyOn(Random, 'calculateBossDMG').mockReturnValue(13);

describe('보스몬스터 테스트', () => {
  let monster;
  let player;

  beforeEach(() => {
    monster = new BossMonster({ name: '보스 몬스터', hp: 100 });
    player = new Player({ name: '용사', hp: 120, mp: 80 });
  });

  it('보스 몬스터는 이름, hp를 보유한다.', () => {
    expect(monster.status.name).toBe('보스 몬스터');
    expect(monster.status.hp).toBe(100);
  });

  it(`보스 몬스터의 초기 상태는 ${BossMonster.CONDITIONS.NORMAL.CODE}이다.`, () => {
    expect(monster.status.condition).toBe(BossMonster.CONDITIONS.NORMAL.CODE);
    expect(monster.status.appearance).toBe(BossMonster.CONDITIONS.NORMAL.APPEARANCE);
  });

  it.each([
    { code: BossMonster.CONDITIONS.TAKEN_DAMAGE.CODE },
    { code: BossMonster.CONDITIONS.RAID_FAILED.CODE },
  ])('보스 몬스터의 상태를 변경하면 외형도 변화한다.', ({ code }) => {
    monster.condition = code;
    expect(monster.status.condition).toBe(BossMonster.CONDITIONS[code].CODE);
    expect(monster.status.appearance).toBe(BossMonster.CONDITIONS[code].APPEARANCE);
  });

  it('보스 몬스터는 피격시 외형이 피격 상태로 변화한다.', () => {
    monster.decreaseHp(10);
    expect(monster.status.condition).toBe(BossMonster.CONDITIONS.TAKEN_DAMAGE.CODE);
    expect(monster.status.appearance).toBe(BossMonster.CONDITIONS.TAKEN_DAMAGE.APPEARANCE);
  });

  it('존재하지 않는 상태코드를 입력시 에러가 발생하며 변화하지 않는다.', () => {
    expect(() => {
      monster.condition = '가짜_코드';
    }).toThrow(ERROR_MESSAGE.UNKNOWN_CONDITION_CODE);
    expect(monster.status.condition).toBe(BossMonster.CONDITIONS.NORMAL.CODE);
    expect(monster.status.appearance).toBe(BossMonster.CONDITIONS.NORMAL.APPEARANCE);
  });

  it('보스 몬스터는 기본 스킬로 랜덤 데미지 공격을 가진다.', () => {
    expect(monster.skills.size).toBe(1);
    expect(monster.skills.get(RandomAttack.SKILL_NAME)).toBeDefined();
  });

  it('보스 몬스터는 유닛을 랜덤한 값으로 공격한다.', () => {
    monster.useSkill(RandomAttack.SKILL_NAME, player);

    expect(player.status.hp).toBe(107);
  });
});

describe('몬스터 생성 예외 테스트', () => {
  it.each([{ hp: 99 }, { hp: 201 }])(
    'hp가 유효한 범위가 아닌 $hp인 경우 에러가 발생한다.',
    ({ hp }) => {
      const { MIN_INITIAL_HP: min, MAX_INITIAL_HP: max } = BossMonster.CREATION_CONDITION;

      expect(() => {
        new BossMonster({ name: '플레이어', hp });
      }).toThrow(ERROR_MESSAGE.IS_OUT_OF_RANGE({ target: 'hp', min, max }));
    }
  );
});
