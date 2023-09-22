import { View } from '../core/View.js';

export class TextView extends View {
  /**
   * @param {string} text
   */
  setText(text) {
    this.$target.textContent = text;
  }

  /**
   * @param {string} text
   */
  addText(text) {
    this.$target.textContent += text;
  }
}
