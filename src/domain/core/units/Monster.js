import { Unit } from './Unit';
import { ERROR_MESSAGE } from '../../../constants/error';

/**
 * @typedef {Object} MonsterStatus
 * @property {string} name - 유닛의 이름
 * @property {number} hp - 현재 체력 (HP)
 * @property {number} mp - 현재 마력 (MP)
 * @property {number} maxHp - 최대 체력 (HP)
 * @property {number} maxMp - 최대 마력 (MP)
 * @property {boolean} isDead - 유닛의 사망 여부
 * @property {string} condition - 유닛의 상태 코드
 * @property {string} appearance - 유닛의 외형 마크업
 */

/**
 * @class
 * @abstract
 * @extends {Unit}
 */
export class Monster extends Unit {
  /**
   * @constructor
   * @param {{
   *  name: string;
   *  hp: number;
   *  mp: number;
   * }} params
   */
  constructor({ name, hp, mp }) {
    super({ name, hp, mp });
    this.setCondition(this.constructor.CONDITIONS.NORMAL.CODE);
  }

  /**
   * @returns {MonsterStatus}
   */
  get status() {
    return { ...this._status };
  }

  /**
   * @param {string} code
   */
  setCondition(code) {
    const updatedCondition = this.constructor.CONDITIONS[code];
    if (!updatedCondition) {
      throw new Error(ERROR_MESSAGE.UNKNOWN_CONDITION_CODE);
    }
    this._status.condition = updatedCondition.CODE;
    this._status.appearance = updatedCondition.APPEARANCE;
  }

  decreaseHpEffect() {
    this.setCondition(this.constructor.CONDITIONS.TAKEN_DAMAGE.CODE);
  }

  setWinner() {
    this.setCondition(this.constructor.CONDITIONS.RAID_FAILED.CODE);
  }
}
