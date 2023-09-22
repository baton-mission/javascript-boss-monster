import { BattleFiled } from '../../src/domain/BattleField';
import { BossMonster } from '../../src/domain/units/monsters/BossMonster';
import { Player } from '../../src/domain/units';
import { PhysicalAttack, MagicAttack, RandomAttack } from '../../src/domain/skills';
import { Random } from '../../src/utils/random';
import { Unit } from '../../src/domain/core/units/Unit';
import { ERROR_MESSAGE } from '../../src/constants/error';

jest.spyOn(Random, 'calculateBossDMG').mockReturnValue(10);

describe('전장 테스트', () => {
  /** @type {BattleFiled} */
  let battleField;
  /** @type {Player} */
  let player;

  beforeEach(() => {
    player = new Player({ name: '용사', hp: 120, mp: 80 });
    battleField = new BattleFiled(player);
  });

  it('전장은 생성 시 조작할 플레이어를 입력받는다', () => {
    expect(battleField.player).toEqual(player);
  });

  it('전장은 상대를 입력받는다', () => {
    const monster = new BossMonster({ name: '보스 몬스터', hp: 100 });
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

describe('전장 생성 예외 테스트', () => {
  it.each([
    { player: null },
    { player: undefined },
    { player: '용사' },
    { player: new Unit({ name: '유닛', hp: 10 }) },
    { player: new BossMonster({ name: '스파이', hp: 100 }) },
  ])('플레이어가 아닌 값이 들어올 시 에러가 발생한다 입력받는다', ({ player }) => {
    expect(() => {
      new BattleFiled(player);
    }).toThrow(ERROR_MESSAGE.INVALID_PLAYER);
  });

  it.each([
    { player: null },
    { player: undefined },
    { player: '용사' },
    { player: new Unit({ name: '유닛', hp: 10 }) },
    { player: new Player({ name: '용사', hp: 120, mp: 80 }) },
  ])('몬스터가 아닌 값이 들어올 시 에러가 발생한다 입력받는다', ({ enemy }) => {
    expect(() => {
      const player = new Player({ name: '용사', hp: 120, mp: 80 });
      const battleField = new BattleFiled(player);
      battleField.setEnemy(enemy);
    }).toThrow(ERROR_MESSAGE.INVALID_ENEMY);
  });
});

describe('전장 전투 테스트', () => {
  it('전장은 턴을 진행하면서 스킬을 주고받는다.', () => {
    const player = new Player({ name: '용사', hp: 120, mp: 80 });
    const battleField = new BattleFiled(player);
    const monster = new BossMonster({ name: '보스 몬스터', hp: 100 });

    battleField.setEnemy(monster);

    battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);

    expect(battleField.player.status.hp).toBe(110);
    expect(battleField.player.status.mp).toBe(50);
    expect(battleField.enemy.status.hp).toBe(80);
    expect(battleField.turn).toBe(2);

    battleField.processTurn(PhysicalAttack.SKILL_NAME, RandomAttack.SKILL_NAME);

    expect(battleField.player.status.hp).toBe(100);
    expect(battleField.player.status.mp).toBe(60);
    expect(battleField.enemy.status.hp).toBe(70);
    expect(battleField.turn).toBe(3);
  });

  it('전장은 턴을 진행할때마다 사망한 유닛을 확인하고 우승자를 설정한다.', () => {
    const player = new Player({ name: '용사', hp: 100, mp: 100 });
    const battleField = new BattleFiled(player);
    const monster = new BossMonster({ name: '보스 몬스터', hp: 100 });
    battleField.setEnemy(monster);
    monster.decreaseHp(70);

    battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    expect(battleField.winner).toBeNull();

    battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    expect(battleField.winner).toEqual(player);
  });

  it('플레이어가 선제공격이기에 공격 후 적이 죽으면 적의 스킬은 시전되지 않는다.', () => {
    const player = new Player({ name: '용사', hp: 120, mp: 80 });
    const battleField = new BattleFiled(player);
    const monster = new BossMonster({ name: '보스 몬스터', hp: 100 });
    battleField.setEnemy(monster);
    monster.decreaseHp(80);

    battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    expect(battleField.winner).toEqual(player);
    expect(battleField.player.status.hp).toBe(120);
  });

  it('스킬 시전에 실패할 시 턴이 진행되지 않는다.', () => {
    const player = new Player({ name: '용사', hp: 170, mp: 30 });
    player.decreaseMp(10);
    const battleField = new BattleFiled(player);
    const monster = new BossMonster({ name: '보스 몬스터', hp: 100 });
    battleField.setEnemy(monster);

    expect(() => {
      battleField.processTurn(MagicAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    }).toThrow();

    expect(battleField.player.status.hp).toBe(170);
    expect(battleField.player.status.mp).toBe(20);
    expect(battleField.enemy.status.hp).toBe(100);
    expect(battleField.turn).toBe(1);

    expect(() => {
      battleField.processTurn(MagicAttack.SKILL_NAME, PhysicalAttack.SKILL_NAME);
    }).toThrow();

    expect(battleField.player.status.hp).toBe(170);
    expect(battleField.player.status.mp).toBe(20);
    expect(battleField.enemy.status.hp).toBe(100);
    expect(battleField.turn).toBe(1);
  });

  it('전투 결과에 따라 보스 몬스터의 외형이 바뀐다.', () => {
    const player = new Player({ name: '용사', hp: 20, mp: 180 });
    const battleField = new BattleFiled(player);
    const monster = new BossMonster({ name: '보스 몬스터', hp: 100 });
    battleField.setEnemy(monster);

    expect(battleField.enemy.status.appearance).toBe(BossMonster.CONDITIONS.NORMAL.APPEARANCE);

    battleField.processTurn(PhysicalAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    expect(battleField.enemy.status.appearance).toBe(
      BossMonster.CONDITIONS.TAKEN_DAMAGE.APPEARANCE
    );

    battleField.processTurn(PhysicalAttack.SKILL_NAME, RandomAttack.SKILL_NAME);
    expect(battleField.enemy.status.appearance).toBe(BossMonster.CONDITIONS.RAID_FAILED.APPEARANCE);
  });
});
