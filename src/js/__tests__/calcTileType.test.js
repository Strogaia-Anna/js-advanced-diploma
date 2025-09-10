import { calcTileType } from '../utils';

test('should be top-left', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
});

test('should be top-right', () => {
  expect(calcTileType(7, 8)).toBe('top-right');
});

test('should be bottom-left', () => {
  expect(calcTileType(56, 8)).toBe('bottom-left');
});

test('should be bottom-right', () => {
  expect(calcTileType(63, 8)).toBe('bottom-right');
});

test('should be top', () => {
  expect(calcTileType(4, 8)).toBe('top');
});

test('should be bottom', () => {
  expect(calcTileType(61, 8)).toBe('bottom');
});

test('should be left', () => {
  expect(calcTileType(16, 8)).toBe('left');
});

test('should be right', () => {
   expect(calcTileType(23, 8)).toBe('right');
});

test('should be center', () => {
   expect(calcTileType(20, 8)).toBe('center');
});
