/**
 * @typedef {import('./units/Player').Player} Player
 * @typedef {import('./core/units/Monster').Monster} Monster
 * @typedef {import('./core/skills/Skill').Skill} Skill
 */

import { ERROR_MESSAGE } from '../constants/error.js';

export class BattleFiled {
  #turn = 1;

  #player;

  #enemy;

  #winner = null;

  #disable = false;

  /**
   * @param {Player} player
   */
  constructor(player) {
    this.#player = player;
  }

  get turn() {
    return this.#turn;
  }

  get player() {
    return this.#player;
  }

  /**
   * @returns {Monster}
   */
  get enemy() {
    return this.#enemy;
  }

  /**
   * @returns {Monster | Player}
   */
  get winner() {
    return this.#winner;
  }

  init() {
    this.#turn = 1;
    this.#player = null;
    this.#enemy = null;
    this.#winner = null;
  }

  /**
   * @param {Monster} enemy
   */
  setEnemy(enemy) {
    this.#enemy = enemy;
  }

  increaseTurn(value = 1) {
    this.#turn += value;
  }

  /**
   * @param {Skill} playerSkill
   * @param {Skill} enemySkill
   */
  processTurn(playerSkill, enemySkill) {
    if (this.#disable) {
      throw new Error(ERROR_MESSAGE.IS_ENDED_GAME);
    }
    this.playerUseSkill(playerSkill);
    this.checkWinner();
    if (this.#winner) {
      return;
    }
    this.enemyUseSkill(enemySkill);
    this.checkWinner();
    if (this.#winner) {
      return;
    }
    this.increaseTurn();
  }

  /**
   * @param {string} skillName
   */
  playerUseSkill(skillName) {
    this.#player.useSkill(skillName, this.#enemy);
  }

  /**
   * @param {string} skillName
   */
  enemyUseSkill(skillName) {
    this.#enemy.useSkill(skillName, this.#player);
  }

  checkWinner() {
    if (this.#player.status.isDead) {
      this.setWinner(this.#enemy);
      this.#enemy.setWinner();
      return;
    }
    if (this.#enemy.status.isDead) {
      this.setWinner(this.#player);
    }
  }

  setWinner(winner) {
    this.#winner = winner;
    this.#disable = true;
  }
}
