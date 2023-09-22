export const GAME_MESSAGE = Object.freeze({
  SUCCESS_RAID_BOSS: (name, turn) =>
    `🎉 ${name}님이 ${turn}번의 전투 끝에 보스 몬스터를 잡았습니다!! 🎉`,
  FAILED_RAID_BOSS: (name, turn) => `${name}의 HP가 0이 되었습니다. \n
    보스 레이드에 실패했습니다. 턴: ${turn}`,
});
