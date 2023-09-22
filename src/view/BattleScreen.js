import { TextView } from './outputViews/index.js';
import { SkillWindow } from './inputViews/index.js';
import { GAME_MESSAGE } from '../constants/message.js';
import { ViewComponent } from './core/ViewComponent.js';

/**
 * @typedef {import('../domain/units/Player.js')} Player
 * @typedef {import('../domain/units/monsters/BossMonster.js')} BossMonster
 */

export class BattleScreen extends ViewComponent {
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

  /**
   * @param {Player} player
   */
  setPlayer({ name, hp, maxHp, mp, maxMp }) {
    this.setPlayerName(name);
    this.setPlayerHp(hp, maxHp);
    this.setPlayerMp(mp, maxMp);
  }

  /**
   * @param {string} name
   */
  setPlayerName(name) {
    this._children.output.playerName.setText(name);
  }

  /**
   * @param {number} hp
   * @param {number} maxHp
   */
  setPlayerHp(hp, maxHp) {
    this._children.output.playerHp.setText(`[${hp}/${maxHp}]`);
  }

  /**
   * @param {number} mp
   * @param {number} maxMp
   */
  setPlayerMp(mp, maxMp) {
    this._children.output.playerMp.setText(`[${mp}/${maxMp}]`);
  }

  /**
   * @param {BossMonster} BossMonster
   */
  setEnemy({ hp, maxHp, appearance }) {
    this._children.output.bossShape.setText(appearance);
    this.setEnemyHp(hp, maxHp);
  }

  /**
   * @param {number} hp
   * @param {number} maxHp
   */
  setEnemyHp(hp, maxHp) {
    this._children.output.bossHp.setText(`[${hp}/${maxHp}]`);
  }

  /**
   * @param {{
   *  name: string;
   *  turn: number;
   *  isWin?: boolean;
   * }} result
   */
  setResult({ name, turn, isWin = false }) {
    if (isWin) {
      this.showSuccessRaid(name, turn);
      return;
    }
    this.showFailedRaid(name, turn);
  }

  /**
   * @param {string} name
   * @param {number} turn
   */
  showSuccessRaid(name, turn) {
    const message = GAME_MESSAGE.SUCCESS_RAID_BOSS(name, turn);
    this._children.output.bossShape.setText(message);
  }

  /**
   * @param {string} name
   * @param {number} turn
   */
  showFailedRaid(name, turn) {
    const message = GAME_MESSAGE.FAILED_RAID_BOSS(name, turn);
    this._children.output.bossShape.addText(message);
  }

  show() {
    document.querySelector('.game-section').classList.remove('hide');
  }

  hide() {
    document.querySelector('.game-section').classList.add('hide');
  }
}
