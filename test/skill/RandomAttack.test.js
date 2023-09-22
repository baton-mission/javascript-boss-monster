import { Unit } from '../../src/domain/core/units/Unit';
import { RandomAttack } from '../../src/domain/skills';
import { Random } from '../../src/utils/random';

describe('랜덤 공격 테스트', () => {
  let unit;
  let enemy;

  beforeEach(() => {
    unit = new Unit({ name: '유닛', hp: 100, mp: 100 });
    enemy = new Unit({ name: '적', hp: 100, mp: 100 });
    unit.learnSkill(RandomAttack.of(unit));
  });

  it('랜덤 공격의 이름은 "랜덤 공격"이다', () => {
    expect(unit.skills.get(RandomAttack.SKILL_NAME).skillName).toBe('랜덤 공격');
  });

  it.each([{ damage: 13 }, { damage: 20 }, { damage: 4 }, { damage: 9 }])(
    '랜덤 공격의 데미지는 랜덤한 값인 $damage이다.',
    ({ damage }) => {
      jest.spyOn(Random, 'calculateBossDMG').mockReturnValue(damage);
      unit.useSkill('랜덤 공격', enemy);
      expect(enemy.status.hp).toBe(100 - damage);

      jest.clearAllMocks();
    }
  );

  it('랜덤 공격의 마나 소모량은 0이다.', () => {
    unit.useSkill('랜덤 공격', enemy);
    expect(unit.status.mp).toBe(100);
  });
});
