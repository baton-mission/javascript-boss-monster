import { ERROR_MESSAGE } from '../../src/constants/error';
import { Skill } from '../../src/domain/core/skills/Skill';
import { Unit } from '../../src/domain/core/units/Unit';

describe('스킬 테스트', () => {
  let skill;
  let unit;

  beforeEach(() => {
    unit = new Unit({ name: '유닛', hp: 100, mp: 100 });
    skill = new Skill(unit, { requireMp: 20 });
  });

  it('스킬은 스킬 이름, 시전자, 필요 MP를 가진다', () => {
    expect(skill.skillName).toBe('기본 스킬');
    expect(skill.caster).toEqual(unit);
    expect(skill.requireMp).toEqual(20);
  });

  it('스킬을 사용할 시 시전자의 MP가 소모된다.', () => {
    skill.use();
    expect(unit.status.mp).toBe(80);
  });
});

describe('스킬 생성 유효성 테스트', () => {
  it.each([
    { caster: null },
    { caster: undefined },
    { caster: '용사' },
    { caster: 123 },
    { caster: true },
  ])('시전자가 Unit이 아닐시 에러가 발생한다.', ({ caster }) => {
    expect(() => {
      new Skill(caster, { requireMp: 10 });
    }).toThrow(ERROR_MESSAGE.INVALID_SKILL_CASTER);
  });

  it.each([{ requireMp: '용사' }, { requireMp: '123' }, { requireMp: true }])(
    '필요 MP가 숫자가 아닐시 에러가 발생한다.',
    ({ requireMp }) => {
      expect(() => {
        const caster = new Unit({ name: '유닛', hp: 10 });
        new Skill(caster, { requireMp });
      }).toThrow(ERROR_MESSAGE.IS_NOT_NUMBER('필요 MP'));
    }
  );

  it.each([
    { caster: new Unit({ name: '유닛', hp: 10 }) },
    { caster: new Unit({ name: '유닛', hp: 10, mp: 10 }) },
  ])('시전자의 최대 MP가 필요 MP보다 적을시 에러가 발생한다.', ({ caster }) => {
    expect(() => {
      new Skill(caster, { requireMp: 11 });
    }).toThrow(ERROR_MESSAGE.IS_SUFFICIENT_MP);
  });
});
