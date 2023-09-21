import { formatUserInput } from '../../src/utils/formatUserInput';

describe('유틸리티 함수 테스트', () => {
  it.each([
    { input: '  입력값 ', output: '입력값' },
    { input: '10 ', output: 10 },
    { input: '  0 ', output: 0 },
    { input: '  -10 ', output: -10 },
    { input: '입력  값   ', output: '입력  값' },
    { input: '', output: '' },
  ])('입력값 가공 함수 테스트 (입력: "$input" => 출력: $output)', ({ input, output }) => {
    expect(formatUserInput(input)).toBe(output);
  });
});
