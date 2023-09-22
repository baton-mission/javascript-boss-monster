import { ERROR_MESSAGE } from '../../src/constants/error';
import Attack from '../../src/domain/core/skills/Attack';
import { Unit } from '../../src/domain/core/units/Unit';

describe('공격 스킬 테스트', () => {
  let skill;
  let unit;

  beforeEach(() => {
    unit = new Unit({ name: '유닛', hp: 100, mp: 100 });
    skill = new Attack(unit, { damage: 10, requireMp: 20 });
  });

  it('공격 스킬은 스킬 이름, 시전자, 필요 MP, 데미지를 가진다.', () => {
    expect(skill.skillName).toBe('공격 스킬');
    expect(skill.damage).toBe(10);
    expect(skill.caster).toEqual(unit);
    expect(skill.requireMp).toEqual(20);
  });

  it('공격 스킬 사용시 적의 hp가 소모된다.', () => {
    const enemy = new Unit({ name: '적', hp: 100 });
    skill.use(enemy);

    expect(enemy.status.hp).toBe(90);
  });
});

describe('공격 스킬 생성 유효성 테스트', () => {
  it.each([{ damage: undefined }, { damage: '123' }, { damage: true }])(
    '데미지가 숫자가 아닐시 에러가 발생한다.',
    ({ damage }) => {
      expect(() => {
        const caster = new Unit({ name: '유닛', hp: 100, mp: 100 });
        new Attack(caster, { requireMp: 10, damage });
      }).toThrow(ERROR_MESSAGE.IS_NOT_NUMBER('데미지'));
    }
  );

  it.each([{ enemy: undefined }, { enemy: '123' }, { enemy: true }])(
    '시전 대상이 유닛이 아닐시 에러가 발생한다.',
    ({ enemy }) => {
      expect(() => {
        const caster = new Unit({ name: '유닛', hp: 100, mp: 100 });
        const attack = new Attack(caster, { requireMp: 10, damage: 10 });
        attack.use(enemy);
      }).toThrow(ERROR_MESSAGE.INVALID_SKILL_TARGET);
    }
  );
});
