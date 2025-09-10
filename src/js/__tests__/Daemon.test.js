import Character from "../Character";
import { Daemon } from "../characters/Daemon";

test('should Daemon', () => {
  const result = new Daemon(3);
  expect(result).toBeInstanceOf(Character);
});

test('should have correct attack', () => {
  const result = new Daemon(1);
  expect(result.attack).toBe(10);
});

test('should have correct defence', () => {
  const result = new Daemon(1);
  expect(result.defence).toBe(10);
});