import ERROR_MESSAGE from '../../src/constants/error';
import Skill from '../../src/domain/core/skills/Skill';
import Unit from '../../src/domain/core/Unit';

describe('유닛 테스트', () => {
  let unit;
  let skill;

  beforeEach(() => {
    unit = new Unit({ name: '유닛', hp: 100, mp: 100 });
    skill = new Skill(unit, { skillName: '스킬', requireMp: 0 });
  });

  it('유닛은 체력을 보유한다.', () => {
    expect(unit.status.hp).toBe(100);
  });

  it('유닛은 스킬을 배울 수 있다.', () => {
    expect(unit.skills.size).toBe(0);
    unit.learnSkill(skill.skillName, skill);
    expect(unit.skills.size).toBe(1);
  });

  it('동일한 스킬을 배울 시 에러를 발생시킨다.', () => {
    unit.learnSkill(skill.skillName, skill);

    expect(() => {
      unit.learnSkill(skill.skillName, skill);
    }).toThrow(ERROR_MESSAGE.EXISTING_SKILL);
  });

  it('유닛은 스킬을 사용할 수 있다.', () => {
    const enemy = new Unit({ name: '몬스터', hp: 100 });
    unit.learnSkill('스킬', skill);

    const skillSpy = jest.spyOn(skill, 'use');

    unit.useSkill('스킬', enemy);

    expect(skillSpy).toHaveBeenCalled();
  });

  it('유닛은 hp와 mp를 소모할 수 있다.', () => {
    unit.decreaseHp(20);
    unit.decreaseMp(20);
    expect(unit.status.hp).toBe(80);
    expect(unit.status.mp).toBe(80);
  });

  it('유닛의 hp와 mp는 최대값 이상으로 회복되지 않는다.', () => {
    unit.increaseHp(10);
    unit.increaseMp(10);
    expect(unit.status.hp).toBe(100);
    expect(unit.status.mp).toBe(100);
  });

  it('유닛의 hp와 mp는 0 이하로 떨어지지 않는다.', () => {
    unit.decreaseHp(110);
    unit.decreaseMp(110);
    expect(unit.status.hp).toBe(0);
    expect(unit.status.mp).toBe(0);
  });
});

describe('유닛 생성 예외 테스트', () => {
  it.each([{ hp: '짱쎔' }, { hp: true }, { hp: [100] }])(
    '숫자가 아닌 $hp를 hp에 입력하면 에러가 발생한다.',
    ({ hp }) => {
      expect(() => {
        new Unit({ name: '유닛', hp, mp: 100 });
      }).toThrow(ERROR_MESSAGE.IS_NOT_NUMBER('HP'));
    }
  );

  it.each([{ mp: '짱쎔' }, { mp: true }, { mp: [100] }])(
    '숫자가 아닌 $mp를 mp에 입력하면 에러가 발생한다.',
    ({ mp }) => {
      expect(() => {
        new Unit({ name: '유닛', hp: 100, mp });
      }).toThrow(ERROR_MESSAGE.IS_NOT_NUMBER('MP'));
    }
  );

  it.each([{ hp: 0.1 }, { hp: 150.5 }])('정수가 아닌 $hp를 hp에 입력하면 에러가 발생한다.', ({ hp }) => {
    expect(() => {
      new Unit({ name: '유닛', hp, mp: 100 });
    }).toThrow(ERROR_MESSAGE.IS_DECIMAL('HP'));
  });

  it.each([{ mp: 0.1 }, { mp: 150.5 }])('정수가 아인 $mp를 mp에 입력하면 에러가 발생한다.', ({ mp }) => {
    expect(() => {
      new Unit({ name: '유닛', hp: 100, mp });
    }).toThrow(ERROR_MESSAGE.IS_DECIMAL('MP'));
  });

  it.each([{ hp: 0 }, { hp: -10 }])('0 이하인 $hp를 hp에 입력하면 에러가 발생한다.', ({ hp }) => {
    expect(() => {
      new Unit({ name: '유닛', hp, mp: 100 });
    }).toThrow(ERROR_MESSAGE.IS_BELOW_ZERO('HP'));
  });

  it.each([{ mp: 0 }, { mp: -10 }])('0 이하인 $mp를 mp에 입력하면 에러가 발생한다.', ({ mp }) => {
    expect(() => {
      new Unit({ name: '유닛', hp: 100, mp });
    }).toThrow(ERROR_MESSAGE.IS_BELOW_ZERO('MP'));
  });
});
