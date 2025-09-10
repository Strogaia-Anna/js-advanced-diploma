import Character from "../Character";
import { Swordsman } from "../characters/Swordsman";

test('should Swordsman', () => {
  const result = new Swordsman(3);
  expect(result).toBeInstanceOf(Character);
});

test('should have correct attack', () => {
  const result = new Swordsman(1);
  expect(result.attack).toBe(40);
});

test('should have correct defence', () => {
  const result = new Swordsman(1);
  expect(result.defence).toBe(10);
});