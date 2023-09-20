import Unit from '../../src/domain/core/Unit';

describe('유닛 테스트', () => {
  it('유닛은 체력을 보유한다.', () => {
    const unit = new Unit(100);
    expect(unit.hp).toBe(100);
  });

  it('유닛은 hp를 소모할 수 있다.', () => {
    const unit = new Unit(100);
    unit.takeDamage(20);
    expect(unit.hp).toBe(80);
  });

  it('유닛은 hp는 0 이하로 떨어지지 않는다.', () => {
    const unit = new Unit(100);
    unit.takeDamage(110);
    expect(unit.hp).toBe(0);
  });
});
