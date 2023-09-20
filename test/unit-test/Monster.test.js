import { Player, Monster } from '../../src/domain/units';
import { RandomAttack } from '../../src/domain/skills';
import { Random } from '../../src/utils/random';

jest.spyOn(Random, 'calculateBossDMG').mockReturnValue(13);

describe('보스몬스터 테스트', () => {
  let monster;
  let player;

  beforeEach(() => {
    monster = new Monster({ name: '보스 몬스터', hp: 100 });
    player = new Player({ name: '용사', hp: 120, mp: 80 });
  });

  it('보스 몬스터는 이름, hp를 보유한다.', () => {
    expect(monster.status.name).toBe('보스 몬스터');
    expect(monster.status.hp).toBe(100);
  });

  it('보스 몬스터는 기본 스킬로 랜덤 데미지 공격을 가진다.', () => {
    expect(monster.skills.size).toBe(1);
    expect(monster.skills.get(RandomAttack.SKILL_NAME)).toBeDefined();
  });

  it('보스 몬스터는 유닛을 랜덤한 값으로 공격한다.', () => {
    monster.useSkill(RandomAttack.SKILL_NAME, player);

    expect(player.status.hp).toBe(107);
  });
});
