import GameController from "../GameController";
import { Swordsman } from "../characters/Swordsman";
import { Undead } from "../characters/Undead";
import { Magician } from "../characters/Magician";
import { Daemon } from "../characters/Daemon";
import { Bowman } from "../characters/Bowman";
import { Vampire } from "../characters/Vampire";

test('should be able to attack', () => {
  const character = new Swordsman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(4, {character, position: 36}, 35)).toBe(true);
});

test('should not be able to attack', () => {
  const character = new Swordsman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(4, {character, position: 36}, 34)).toBe(false);
});



test('should be able to attack', () => {
  const character = new Undead(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(4, {character, position: 36}, 35)).toBe(true);
});

test('should not be able to attack', () => {
  const character = new Undead(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(4, {character, position: 36}, 34)).toBe(false);
});



test('should be able to attack', () => {
  const character = new Magician(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(0, {character, position: 0}, 4)).toBe(true);
});

test('should not be able to attack', () => {
  const character = new Magician(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(0, {character, position: 0}, 5)).toBe(false);
});



test('should be able to attack', () => {
  const character = new Daemon(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(0, {character, position: 0}, 32)).toBe(true);
});

test('should not be able to attack', () => {
  const character = new Daemon(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(0, {character, position: 0}, 40)).toBe(false);
});



test('should be able to attack', () => {
  const character = new Bowman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(4, {character, position: 36}, 38)).toBe(true);
});

test('should not be able to attack', () => {
  const character = new Bowman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(4, {character, position: 36}, 39)).toBe(false);
});


test('should be able to attack', () => {
  const character = new Vampire(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(4, {character, position: 36}, 38)).toBe(true);
});

test('should not be able to attack', () => {
  const character = new Vampire(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8}
  expect(gameCtrl.isPossibleAttack(4, {character, position: 36}, 39)).toBe(false);
});
