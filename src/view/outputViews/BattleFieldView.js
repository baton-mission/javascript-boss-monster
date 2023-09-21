export class BattleFieldView {
  #target;

  /**
   * @param {HTMLButtonElement} target
   */
  constructor(target) {
    this.#target = target;
  }

  showMonster(template) {
    this.#target.querySelector('#boss-shape').textContent = template;
  }

  show() {
    this.#target.classList.remove('hide');
  }

  hide() {
    this.#target.classList.add('hide');
  }
}
