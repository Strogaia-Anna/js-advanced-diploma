import Character from "../Character";
import { Undead } from "../characters/Undead";

test('should Undead', () => {
  const result = new Undead(3);
  expect(result).toBeInstanceOf(Character);
});

test('should have correct attack', () => {
  const result = new Undead(1);
  expect(result.attack).toBe(40);
});

test('should have correct defence', () => {
  const result = new Undead(1);
  expect(result.defence).toBe(10);
});