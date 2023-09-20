export default class BattleFiled {
  #turn = 1;

  #player;

  #enemy;

  #winner = null;

  constructor(player) {
    this.#player = player;
  }

  get turn() {
    return this.#turn;
  }

  get player() {
    return this.#player;
  }

  get enemy() {
    return this.#enemy;
  }

  get winner() {
    return this.#winner;
  }

  setEnemy(enemy) {
    this.#enemy = enemy;
  }

  increaseTurn(value = 1) {
    this.#turn += value;
  }

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

  playerUseSkill(skillName) {
    this.#player.useSkill(skillName, this.#enemy);
  }

  enemyUseSkill(skillName) {
    this.#enemy.useSkill(skillName, this.#player);
  }

  checkWinner() {
    if (this.#player.status.isDead) {
      this.#winner = this.#enemy;
      return;
    }
    if (this.#enemy.status.isDead) {
      this.#winner = this.#player;
    }
  }
}
