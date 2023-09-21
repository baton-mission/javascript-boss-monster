import { ViewComponent } from './core/ViewComponent.js';
import { InputView, ButtonView } from './inputViews/index.js';

export class StatusForm extends ViewComponent {
  _children = {
    inputs: {
      bossStatusInput: new InputView('#boss-status-input'),
      playerNameInput: new InputView('#name-input'),
      playerStatusInput: new InputView('#player-status-input'),
      startButton: new ButtonView('#start-raid-button'),
    },
  };

  get playerName() {
    return this._children.inputs.playerNameInput.value;
  }

  get playerStatus() {
    return this._children.inputs.playerStatusInput.value;
  }

  get bossHp() {
    return this._children.inputs.bossStatusInput.value;
  }
}
