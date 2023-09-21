export class View {
  $target;

  /**
   * @param {string} target
   */
  constructor(target) {
    const $dom = document.querySelector(target);
    if (!$dom) {
      throw new Error('존재하지 않는 선택자입니다!');
    }
    this.$target = $dom;
  }

  /**
   * @param {string} event
   * @param {(event: MouseEvent) => void} handler
   */
  addEvent(event, handler) {
    this.$target.addEventListener(event, handler);
  }
}
