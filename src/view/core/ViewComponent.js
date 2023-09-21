export class ViewComponent {
  _children = {
    inputs: {},
    output: {},
  };

  get inputs() {
    return this._children.inputs;
  }

  get outputs() {
    return this._children.output;
  }
}
