import Character from "../Character";

test('should be mistake', () => {
  expect(() => {
    new Character(3);
  }).toThrow('Character must be called without new');
});

