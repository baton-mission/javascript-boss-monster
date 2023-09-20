export default class BattleFiled {
  #turn = 1;

  #player;

  #enemy;

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

  setEnemy(enemy) {
    this.#enemy = enemy;
  }

  increaseTurn(value = 1) {
    this.#turn += value;
  }
}
