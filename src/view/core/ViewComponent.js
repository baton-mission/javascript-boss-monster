/**
 * @typedef {import('./View').View} View
 */

export class ViewComponent {
  /** @protected */
  _children = {
    inputs: {},
    output: {},
  };

  /** @returns {Object.<string, View>} */
  get inputs() {
    return this._children.inputs;
  }

  /** @returns {Object.<string, View>} */
  get outputs() {
    return this._children.output;
  }
}
