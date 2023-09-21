export class ButtonView {
  #target;

  /**
   * @param {HTMLButtonElement} target
   */
  constructor(target) {
    this.#target = target;
  }

  /**
   * @param {string} event
   * @param {(event: MouseEvent) => void} handler
   */
  addEvent(event, handler) {
    this.#target.addEventListener(event, handler);
  }
}
