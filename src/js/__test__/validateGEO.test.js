import validateGEO from '../validateGEO';

test.each([
  ['183.12345, 80.54321 Valid', '183.12345, 80.54321', true],
  ['77.45678,-10.98765 Valid', '77.45678,-10.98765', true],
  ['121.41381, −110.45362 Valid', '121.41381, −110.45362', true],
  ['[52.54623, −52.21356] Valid', '[52.54623, −52.21356]', true],
  ['[2.25326, 10.21356] Valid', '[2.25326, 10.21356]', true],
  ['5.71751,−232.52572 Invalid', '5.71751,−232.52572', false],
])('Should validate GEO-position - %s', (_, input, expected) => {
  expect(validateGEO(input)).toBe(expected);
});