import { TextView } from './outputViews/index.js';
import { SkillWindow } from './inputViews/index.js';

export class BattleScreen {
  _children = {
    inputs: {
      skillWindow: new SkillWindow('.command'),
    },
    output: {
      bossHp: new TextView('#boss-hp'),
      bossShape: new TextView('#boss-shape'),

      playerName: new TextView('#player-name'),
      playerHp: new TextView('#player-hp'),
      playerMp: new TextView('#player-mp'),
    },
  };

  get inputs() {
    return this._children.inputs;
  }

  get outputs() {
    return this._children.output;
  }

  setPlayer({ name, hp, maxHp, mp, maxMp }) {
    this.setPlayerName(name);
    this.setPlayerHp(hp, maxHp);
    this.setPlayerMp(mp, maxMp);
  }

  setPlayerName(name) {
    this._children.output.playerName.setText(name);
  }

  setPlayerHp(hp, maxHp) {
    this._children.output.playerHp.setText(`[${hp}/${maxHp}]`);
  }

  setPlayerMp(mp, maxMp) {
    this._children.output.playerMp.setText(`[${mp}/${maxMp}]`);
  }

  setEnemy({ hp, maxHp, appearance }) {
    this._children.output.bossShape.setText(appearance);
    this.setEnemyHp(hp, maxHp);
  }

  setEnemyHp(hp, maxHp) {
    this._children.output.bossHp.setText(`[${hp}/${maxHp}]`);
  }

  show() {
    document.querySelector('.game-section').classList.remove('hide');
  }

  hide() {
    document.querySelector('.game-section').classList.add('hide');
  }
}
