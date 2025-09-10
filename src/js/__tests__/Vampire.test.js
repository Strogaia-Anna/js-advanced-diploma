import Character from "../Character";
import { Vampire } from "../characters/Vampire";

test('should Vampire', () => {
  const result = new Vampire(3);
  expect(result).toBeInstanceOf(Character);
});

test('should have correct attack', () => {
  const result = new Vampire(1);
  expect(result.attack).toBe(25);
});

test('should have correct defence', () => {
  const result = new Vampire(1);
  expect(result.defence).toBe(25);
});