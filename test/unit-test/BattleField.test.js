import BattleFiled from '../../src/domain/BattleField';
import { Monster, Player } from '../../src/domain/units';

describe('전장 테스트', () => {
  let battleField;
  let player;

  beforeEach(() => {
    player = new Player({ name: '용사', hp: 120, mp: 80 });
    battleField = new BattleFiled(player);
  });

  it('전장은 생성 시 조작할 플레이어를 입력받는다', () => {
    expect(battleField.player).toEqual(player);
  });

  it('전장은 상대를 입력받는다', () => {
    const monster = new Monster({ name: '보스 몬스터', hp: 100 });
    battleField.setEnemy(monster);

    expect(battleField.enemy).toEqual(monster);
  });

  it('전장의 턴 초기값은 1이다.', () => {
    expect(battleField.turn).toBe(1);
  });

  it('전장은 턴을 증가시킬 수 있다.', () => {
    battleField.increaseTurn();
    expect(battleField.turn).toBe(2);

    battleField.increaseTurn(3);
    expect(battleField.turn).toBe(5);
  });
});
