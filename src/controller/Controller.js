import { Player, BossMonster } from '../domain/units/index.js';
import { formatUserInput } from '../utils/formatUserInput.js';
import { BattleFiled } from '../domain/BattleField.js';
import { StatusForm, BattleScreen } from '../view/index.js';
import { RandomAttack } from '../domain/skills/RandomAttack.js';

export class Controller {
  /** @type {Player} */
  #player;

  /** @type {BattleFiled} */
  #battleField;

  #views = {
    statusForm: new StatusForm(),
    battleScreen: new BattleScreen(),
  };

  constructor() {
    this.#setViewEvent();
  }

  /**
   * @param {function} action
   */
  #withShowError(action) {
    try {
      action();
    } catch (err) {
      alert(err.message);
    }
  }

  #setViewEvent() {
    this.#setStatusFormEvent();
    this.#setUseSkillEvent();
  }

  #setStatusFormEvent() {
    const { startButton } = this.#views.statusForm.inputs;
    startButton.addEvent('click', () => this.#withShowError(() => this.#start()));
  }

  #setUseSkillEvent() {
    const { skillWindow } = this.#views.battleScreen.inputs;
    skillWindow.addEvent('click', (e) => this.#withShowError(() => this.processTurn(e)));
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

  #start() {
    const name = this.#views.statusForm.playerName;
    const [hp, mp] = this.#views.statusForm.playerStatus.split(',');
    this.#setPlayer({
      name: formatUserInput(name),
      hp: formatUserInput(hp, true),
      mp: formatUserInput(mp, true),
    });
    this.#setBattleField();

    const { bossHp } = this.#views.statusForm;
    const monster = new BossMonster({ name: '보스 몬스터', hp: formatUserInput(bossHp, true) });
    this.#battleField.setEnemy(monster);

    this.openBattle();
  }

  openBattle() {
    this.#views.battleScreen.show();
    this.#views.battleScreen.setEnemy(this.#battleField.enemy.status);
    this.#views.battleScreen.setPlayer(this.#battleField.player.status);
  }

  /**
   * @param {string} skillName
   */
  processTurn(skillName) {
    this.#battleField.processTurn(skillName, RandomAttack.SKILL_NAME);
    this.#views.battleScreen.setEnemy(this.#battleField.enemy.status);
    this.#views.battleScreen.setPlayer(this.#battleField.player.status);
    this.checkRaidEnd();
  }

  checkRaidEnd() {
    if (this.#battleField.winner) {
      this.endRaid();
    }
  }

  endRaid() {
    this.#views.battleScreen.setResult({
      name: this.#player.status.name,
      turn: this.#battleField.turn,
      isWin: this.#battleField.winner === this.#player,
    });
    this.#battleField.init();
  }
}
