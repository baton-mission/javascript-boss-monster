import Player from '../../src/domain/Player';
import Unit from '../../src/domain/core/Unit';
import BasicAttack from '../../src/domain/skills/BasicAttack';

describe('플레이어 테스트', () => {
  let player;
  let enemy;

  beforeEach(() => {
    player = new Player({ name: '용사', hp: 120, mp: 80 });
    enemy = new Unit({ name: '몬스터', hp: 100 });
  });

  it('플레이어는 이름, hp, mp를 보유한다.', () => {
    expect(player.status.name).toBe('용사');
    expect(player.status.hp).toBe(120);
    expect(player.status.mp).toBe(80);
  });

  it('플레이어는 기본 스킬로 물리 공격과 마법공격을 가진다.', () => {
    expect(player.skills.size).toBe(2);
    expect(player.skills.get(BasicAttack.SKILL_NAME)).toBeDefined();
    expect(player.skills.get(MagicAttack.SKILL_NAME)).toBeDefined();
  });

  it('플레이어는 유닛을 물리 공격 할 시 유닛의 hp가 10 소모하고 플레이어의 mp가 10 회복한다.', () => {
    player.decreaseMp(30);
    player.useSkill(BasicAttack.SKILL_NAME, enemy);

    expect(enemy.status.hp).toBe(90);
    expect(player.status.mp).toBe(60);
  });

  it('플레이어는 유닛을 마법 공격 할 시 유닛의 hp가 30 소모하고 플레이어의 mp가 30 소모한다.', () => {
    player.useSkill(BasicAttack.SKILL_NAME, enemy);

    expect(enemy.status.hp).toBe(90);
    expect(player.status.mp).toBe(60);
  });
});
