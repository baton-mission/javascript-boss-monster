import { Unit } from '../../src/domain/core/units/Unit';
import { MagicAttack } from '../../src/domain/skills';

describe('마법 공격 테스트', () => {
  let unit;
  let enemy;

  beforeEach(() => {
    unit = new Unit({ name: '유닛', hp: 100, mp: 100 });
    enemy = new Unit({ name: '적', hp: 100, mp: 100 });
    unit.learnSkill(MagicAttack.of(unit));
  });

  it('마법 공격의 이름은 "🪄 마법 공격"이다', () => {
    expect(unit.skills.get(MagicAttack.SKILL_NAME).skillName).toBe('🪄 마법 공격');
  });

  it('마법 공격의 데미지는 20이다.', () => {
    unit.useSkill('🪄 마법 공격', enemy);
    expect(enemy.status.hp).toBe(80);
  });

  it('마법 공격의 마나 소모량은 30이다.', () => {
    unit.useSkill('🪄 마법 공격', enemy);
    expect(unit.status.mp).toBe(70);
  });
});
