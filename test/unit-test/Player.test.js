import Player from '../../src/domain/Player';
import Unit from '../../src/domain/core/Unit';

describe('플레이어 테스트', () => {
  let player;

  beforeEach(() => {
    player = new Player({ name: '용사', hp: 120, mp: 80 });
  });

  it('플레이어는 이름, hp, mp를 보유한다.', () => {
    expect(player.name).toBe('용사');
    expect(player.hp).toBe(120);
    expect(player.mp).toBe(80);
  });

  it('플레이어는 유닛을 물리공격 할 시 유닛의 hp가 10 소모하고 mp가 10 회복한다.', () => {
    const enemy = new Unit(100);
    player.decreaseMp(30);
    player.attack(enemy);

    expect(enemy.hp).toBe(90);
    expect(player.mp).toBe(60);
  });

  it('mp는 최대 mp 이상으로 회복되지 않는다.', () => {
    const enemy = new Unit(100);
    player.decreaseMp(5);
    player.attack(enemy);

    expect(enemy.hp).toBe(90);
    expect(player.mp).toBe(80);
  });
});
