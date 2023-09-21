import { View } from '../core/View.js';

export class ButtonView extends View {
  /**
   * @param {string} event
   * @param {(event: MouseEvent) => void} handler
   */
  addEvent(event, handler) {
    this.$target.addEventListener(event, (e) => {
      e.preventDefault();
      handler();
    });
  }
}
