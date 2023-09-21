import { View } from '../core/View.js';

export class InputView extends View {
  get value() {
    return this.$target.value;
  }
}
