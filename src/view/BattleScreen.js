import { TextView } from './outputViews/index.js';
import { SkillWindow } from './inputViews/index.js';
import { GAME_MESSAGE } from '../constants/message.js';

export class BattleScreen {
  _children = {
    inputs: {
      skillWindow: new SkillWindow('.command'),
    },
    output: {
      bossHp: new TextView('#boss-hp'),
      bossShape: new TextView('#boss-shape'),

      playerName: new TextView('#player-name'),
      playerHp: new TextView('#player-hp'),
      playerMp: new TextView('#player-mp'),
    },
  };

  get inputs() {
    return this._children.inputs;
  }

  get outputs() {
    return this._children.output;
  }

  setPlayer({ name, hp, maxHp, mp, maxMp }) {
    this.setPlayerName(name);
    this.setPlayerHp(hp, maxHp);
    this.setPlayerMp(mp, maxMp);
  }

  setPlayerName(name) {
    this._children.output.playerName.setText(name);
  }

  setPlayerHp(hp, maxHp) {
    this._children.output.playerHp.setText(`[${hp}/${maxHp}]`);
  }

  setPlayerMp(mp, maxMp) {
    this._children.output.playerMp.setText(`[${mp}/${maxMp}]`);
  }

  setEnemy({ hp, maxHp, appearance }) {
    this._children.output.bossShape.setText(appearance);
    this.setEnemyHp(hp, maxHp);
  }

  setEnemyHp(hp, maxHp) {
    this._children.output.bossHp.setText(`[${hp}/${maxHp}]`);
  }

  setResult({ name, turn, isWin = false }) {
    if (isWin) {
      this.showSuccessRaid(name, turn);
      return;
    }
    this.showFailedRaid(name, turn);
  }

  showSuccessRaid(name, turn) {
    const message = GAME_MESSAGE.SUCCESS_RAID_BOSS(name, turn);
    this._children.output.bossShape.setText(message);
  }

  showFailedRaid(name, turn) {
    const message = GAME_MESSAGE.FAILED_RAID_BOSS(name, turn);
    console.log(message);
  }

  show() {
    document.querySelector('.game-section').classList.remove('hide');
  }

  hide() {
    document.querySelector('.game-section').classList.add('hide');
  }
}
