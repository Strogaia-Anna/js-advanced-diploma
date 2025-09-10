import Character from "../Character";
import { Magician } from "../characters/Magician";

test('should Magician', () => {
  const result = new Magician(3);
  expect(result).toBeInstanceOf(Character);
});

test('should have correct attack', () => {
  const result = new Magician(1);
  expect(result.attack).toBe(10);
});

test('should have correct defence', () => {
  const result = new Magician(1);
  expect(result.defence).toBe(40);
});