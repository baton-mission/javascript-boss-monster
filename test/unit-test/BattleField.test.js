import BattleFiled from '../../src/domain/BattleField';
import { BasicAttack, MagicAttack, RandomAttack } from '../../src/domain/skills';
import { Monster, Player } from '../../src/domain/units';
import { Random } from '../../src/utils/random';

jest.spyOn(Random, 'calculateBossDMG').mockReturnValue(10);

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

describe('전장 전투 테스트', () => {
  it('전장은 턴을 진행하면서 스킬을 주고받는다.', () => {
    const player = new Player({ name: '용사', hp: 120, mp: 80 });
    const battleField = new BattleFiled(player);
    const monster = new Monster({ name: '보스 몬스터', hp: 100 });

    battleField.setEnemy(monster);

    battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);

    expect(battleField.player.status.hp).toBe(110);
    expect(battleField.player.status.mp).toBe(50);
    expect(battleField.enemy.status.hp).toBe(70);
    expect(battleField.turn).toBe(2);

    battleField.processTurn(BasicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);

    expect(battleField.player.status.hp).toBe(100);
    expect(battleField.player.status.mp).toBe(60);
    expect(battleField.enemy.status.hp).toBe(60);
    expect(battleField.turn).toBe(3);
  });

  it('전장은 턴을 진행할때마다 사망한 유닛을 확인하고 우승자를 설정한다.', () => {
    const player = new Player({ name: '용사', hp: 120, mp: 80 });
    const battleField = new BattleFiled(player);
    const monster = new Monster({ name: '보스 몬스터', hp: 100 });
    battleField.setEnemy(monster);
    monster.decreaseHp(60);

    battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    expect(battleField.winner).toBeNull();

    battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    expect(battleField.winner).toEqual(player);
  });

  it('플레이어가 선제공격이기에 공격 후 적이 죽으면 적의 스킬은 시전되지 않는다.', () => {
    const player = new Player({ name: '용사', hp: 120, mp: 80 });
    const battleField = new BattleFiled(player);
    const monster = new Monster({ name: '보스 몬스터', hp: 100 });
    battleField.setEnemy(monster);
    monster.decreaseHp(70);

    battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    expect(battleField.winner).toEqual(player);
    expect(battleField.player.status.hp).toBe(120);
  });

  it('스킬 시전에 실해할 시 턴이 진행되지 않는다.', () => {
    const player = new Player({ name: '용사', hp: 180, mp: 20 });
    const battleField = new BattleFiled(player);
    const monster = new Monster({ name: '보스 몬스터', hp: 100 });
    battleField.setEnemy(monster);

    expect(() => {
      battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    }).toThrow();

    expect(battleField.player.status.hp).toBe(180);
    expect(battleField.player.status.mp).toBe(20);
    expect(battleField.enemy.status.hp).toBe(100);
    expect(battleField.turn).toBe(1);

    expect(() => {
      battleField.processTurn(MagicAttack.SKILL_NAME, BasicAttack.SKILL_NAME);
    }).toThrow();

    expect(battleField.player.status.hp).toBe(180);
    expect(battleField.player.status.mp).toBe(20);
    expect(battleField.enemy.status.hp).toBe(100);
    expect(battleField.turn).toBe(1);
  });
});
