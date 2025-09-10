import GameController from "../GameController";
import { Swordsman } from "../characters/Swordsman";
import { Undead } from "../characters/Undead";
import { Magician } from "../characters/Magician";
import { Daemon } from "../characters/Daemon";
import { Bowman } from "../characters/Bowman";
import { Vampire } from "../characters/Vampire";

test('should be able to move', () => {
  const char = new Swordsman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 32, 4)).toBe(true);
});

test('should not be able to move', () => {
  const char = new Swordsman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 25, 4)).toBe(false);
});

test('should not be able to move because character', () => {
  const char = new Swordsman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, true, 32, 4)).toBe(false);
});




test('should be able to move', () => {
  const char = new Undead(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 32, 4)).toBe(true);
});

test('should not be able to move', () => {
  const char = new Undead(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 25, 4)).toBe(false);
});

test('should not be able to move because character', () => {
  const char = new Undead(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, true, 32, 4)).toBe(false);
});



test('should be able to move', () => {
  const char = new Magician(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 37, 4)).toBe(true);
});

test('should not be able to move', () => {
  const char = new Magician(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 34, 4)).toBe(false);
});

test('should not be able to move because character', () => {
  const char = new Magician(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, true, 37, 4)).toBe(false);
});



test('should be able to move', () => {
  const char = new Daemon(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 37, 4)).toBe(true);
});

test('should not be able to move', () => {
  const char = new Daemon(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 34, 4)).toBe(false);
});

test('should not be able to move because character', () => {
  const char = new Daemon(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, true, 37, 4)).toBe(false);
});


test('should be able to move', () => {
  const char = new Bowman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 38, 4)).toBe(true);
});

test('should not be able to move', () => {
  const char = new Bowman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 33, 4)).toBe(false);
});

test('should not be able to move because character', () => {
  const char = new Bowman(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, true, 37, 4)).toBe(false);
});



test('should be able to move', () => {
  const char = new Vampire(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 38, 4)).toBe(true);
});

test('should not be able to move', () => {
  const char = new Vampire(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, false, 33, 4)).toBe(false);
});

test('should not be able to move because character', () => {
  const char = new Vampire(3);
  const gameCtrl = new GameController(null, null)
  gameCtrl.gameState = {boardSize: 8, selected_index: 36}
  expect(gameCtrl.isPossibleMove(char.moves, true, 37, 4)).toBe(false);
});