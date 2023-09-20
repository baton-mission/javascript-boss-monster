import Player from '../../src/domain/Player';
import BasicAttack from '../../src/domain/skills/BasicAttack';
import MagicAttack from '../../src/domain/skills/MagicAttack';
import { Random } from '../../src/random';

jest.spyOn(Random, 'calculateBossDMG').mockReturnValue(13);

describe('보스몬스터 테스트', () => {
  let player;
  let monster;

  beforeEach(() => {
    player = new Player({ name: '용사', hp: 120, mp: 80 });
    monster = new Monster({ name: '보스 몬스터', hp: 100 });
  });

  it('보스 몬스터는 이름, hp, mp를 보유한다.', () => {
    expect(player.status.name).toBe('보스 몬스터');
    expect(player.status.hp).toBe(100);
  });

  it('보스 몬스터는 기본 스킬로 랜덤 데미지 공격을 가진다.', () => {
    expect(player.skills.size).toBe(1);
    expect(player.skills.get(RandomDamageAttack.SKILL_NAME)).toBeDefined();
  });

  it('보스 몬스터는 유닛을 랜덤한 값으로 공격한다.', () => {
    monster.useSkill(RandomDamageAttack.SKILL_NAME, player);

    expect(player.status.mp).toBe(107);
  });
});
