import { View } from '../core/View.js';

export class InputView extends View {
  /**
   * @returns {string}
   */
  get value() {
    return this.$target.value;
  }
}
