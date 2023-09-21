/**
 * @typedef {import('./units/Player').Player} Player
 * @typedef {import('./core/units/Monster').Monster} Monster
 * @typedef {import('./core/skills/Skill').Skill} Skill
 */

export class BattleFiled {
  #turn = 1;

  #player;

  #enemy;

  #winner = null;

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
      this.#winner = this.#enemy;
      this.#enemy.setWinner();
      return;
    }
    if (this.#enemy.status.isDead) {
      this.#winner = this.#player;
    }
  }
}
