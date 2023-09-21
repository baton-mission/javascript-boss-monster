import { Player, BossMonster } from '../domain/units/index.js';
import { ButtonView, InputView } from '../view/inputViews/index.js';
import { formatUserInput } from '../utils/formatUserInput.js';
import { BattleFiled } from '../domain/BattleField.js';

export class Controller {
  /** @type {Player} */
  #player;

  /** @type {BattleFiled} */
  #battleField;

  #views = {
    bossStatus: new InputView(document.querySelector('#boss-status-input')),
    playerNameInput: new InputView(document.querySelector('#name-input')),
    playerStatusInput: new InputView(document.querySelector('#player-status-input')),
    startButton: new ButtonView(document.querySelector('#start-raid-button')),
  };

  constructor() {
    this.#setViewEvent();
  }

  #withRetry(action) {
    try {
      action();
    } catch (err) {
      alert(err.message);
    }
  }

  #setViewEvent() {
    this.#setPlayerSettingEvent();
  }

  #setPlayerSettingEvent() {
    this.#views.startButton.addEvent('click', (event) => {
      event.preventDefault();
      this.#withRetry(() => this.start());
    });
  }

  /**
   * @param {string} name
   * @param {number} hp
   * @param {number} mp
   */
  #setPlayer({ name, hp, mp }) {
    this.#player = new Player({ name, hp, mp });
  }

  #setBattleField() {
    if (!this.#player) return;
    this.#battleField = new BattleFiled(this.#player);
  }

  start() {
    const name = this.#views.playerNameInput.value;
    const [hp, mp] = this.#views.playerStatusInput.value.split(',');
    this.#setPlayer({
      name: formatUserInput(name),
      hp: formatUserInput(hp, true),
      mp: formatUserInput(mp, true),
    });
    this.#setBattleField(this.#player);
    const bossHp = this.#views.bossStatus.value;
    const monster = new BossMonster({ name: '보스 몬스터', hp: bossHp });
    this.#battleField.setEnemy(monster);
  }
}
