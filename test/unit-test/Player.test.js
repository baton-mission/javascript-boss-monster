import Player from '../../src/domain/Player';

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
});
