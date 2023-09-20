class Unit {
  _hp;

  constructor(hp) {
    this._hp = hp;
  }

  get hp() {
    return this._hp;
  }

  takeDamage(damage) {
    this._hp = this._hp - damage >= 0 ? this._hp - damage : 0;
  }
}

export default Unit;
