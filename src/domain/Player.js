import Unit from './core/Unit';

class Player extends Unit {
  _name;

  _mp;

  constructor({ name, hp, mp }) {
    super(hp);
    this._name = name;
    this._mp = mp;
  }

  get name() {
    return this._name;
  }

  get mp() {
    return this._mp;
  }
}

export default Player;
