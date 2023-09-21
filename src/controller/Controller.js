import { Player } from '../domain/units/Player.js';
import { ButtonView } from '../view/inputViews/ButtonView.js';
import { InputView } from '../view/inputViews/InputView.js';
import { formatUserInput } from '../utils/formatUserInput.js';

export class Controller {
  #player;

  #views = {
    playerNameInput: new InputView(document.querySelector('#name-input')),
    playerStatusInput: new InputView(document.querySelector('#player-status-input')),
    startButton: new ButtonView(document.querySelector('#start-raid-button')),
  };

  constructor() {
    this.#setViewEvent();
  }

  #setViewEvent() {
    this.#setPlayerSettingEvent();
  }

  #setPlayerSettingEvent() {
    this.#views.startButton.addEvent('click', (event) => {
      event.preventDefault();
      const name = this.#views.playerNameInput.value;
      const [hp, mp] = this.#views.playerStatusInput.value.split(',');
      this.setPlayer({
        name: formatUserInput(name),
        hp: formatUserInput(hp, true),
        mp: formatUserInput(mp, true),
      });
    });
  }

  start() {
    console.log('어플리케이션을 시작합니다');
  }

  /**
   * @param {string} name
   * @param {number} hp
   * @param {number} mp
   */
  setPlayer({ name, hp, mp }) {
    try {
      this.#player = new Player({ name, hp, mp });
      console.log(this.#player);
    } catch (e) {
      alert(e.message);
    }
  }
}
