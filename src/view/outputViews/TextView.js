import { View } from '../core/View.js';

export class TextView extends View {
  /**
   * @param {string} template
   */
  setText(text) {
    this.$target.textContent = text;
  }
}
