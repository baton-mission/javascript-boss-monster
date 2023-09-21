import { View } from '../core/View.js';

export class SkillWindow extends View {
  /**
   * @param {string} event
   * @param {(event: MouseEvent) => void} handler
   * @param {string} skillName
   */
  addEvent(event, useSkill) {
    this.$target.addEventListener(event, (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLButtonElement) {
        const skillName = e.target.textContent;
        useSkill(skillName);
      }
    });
  }
}
