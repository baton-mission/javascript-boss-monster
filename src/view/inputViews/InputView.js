export class InputView {
  #target;

  /**
   * @param {HTMLInputElement} target
   */
  constructor(target) {
    this.#target = target;
  }

  /**
   * @param {string} event
   * @param {function} handler
   */
  addEvent(event, handler) {
    this.#target.addEventListener(event, handler);
  }

  get value() {
    return this.#target.value;
  }
}
