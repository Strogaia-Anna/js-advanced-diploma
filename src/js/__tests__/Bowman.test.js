import Character from "../Character";
import { Bowman } from "../characters/Bowman";

test('should Bowman', () => {
  const result = new Bowman(3);
  expect(result).toBeInstanceOf(Character);
});

test('should have correct attack', () => {
  const result = new Bowman(1);
  expect(result.attack).toBe(25);
});

test('should have correct defence', () => {
  const result = new Bowman(1);
  expect(result.defence).toBe(25);
});