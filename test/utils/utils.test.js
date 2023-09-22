import { formatUserInput } from '../../src/utils/formatUserInput';

describe('유틸리티 함수 테스트', () => {
  it.each([
    { input: '입력값 ', formatToNumber: false, output: '입력값' },
    { input: '입력값 ', formatToNumber: true, output: '입력값' },
    { input: '10   ', formatToNumber: false, output: '10' },
    { input: '10   ', formatToNumber: true, output: 10 },
    { input: '   0 ', formatToNumber: true, output: 0 },
    { input: ' -10 ', formatToNumber: false, output: '-10' },
    { input: ' -10 ', formatToNumber: true, output: -10 },
    { input: '입력 값', formatToNumber: false, output: '입력 값' },
    { input: '', formatToNumber: false, output: '' },
    { input: '', formatToNumber: true, output: '' },
  ])(
    '입력값 가공 함수 테스트 (입력 [숫자로 가공: $formatToNumber]): "$input" => 출력: $output)',
    ({ input, formatToNumber, output }) => {
      expect(formatUserInput(input, formatToNumber)).toBe(output);
    }
  );
});
