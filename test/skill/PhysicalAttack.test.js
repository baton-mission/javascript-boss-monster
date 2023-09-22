import { Unit } from '../../src/domain/core/units/Unit';
import { PhysicalAttack } from '../../src/domain/skills';

describe('물리 공격 테스트', () => {
  let unit;
  let enemy;

  beforeEach(() => {
    unit = new Unit({ name: '유닛', hp: 100, mp: 100 });
    enemy = new Unit({ name: '적', hp: 100, mp: 100 });
    unit.learnSkill(PhysicalAttack.of(unit));
  });

  it('물리 공격의 이름은 "⚔️ 물리 공격"이다', () => {
    expect(unit.skills.get(PhysicalAttack.SKILL_NAME).skillName).toBe('⚔️ 물리 공격');
  });

  it('물리 공격의 데미지는 10이다.', () => {
    unit.useSkill('⚔️ 물리 공격', enemy);
    expect(enemy.status.hp).toBe(90);
  });

  it('물리 공격의 마나 소모량은 0이다.', () => {
    unit.useSkill('⚔️ 물리 공격', enemy);
    expect(unit.status.mp).toBe(100);
  });

  it('물리 공격 시 마나가 10 회복된다.', () => {
    unit.decreaseMp(20);
    unit.useSkill('⚔️ 물리 공격', enemy);
    expect(unit.status.mp).toBe(90);
  });
});
