/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  let result = 'center';
  
  if (0 < index && index < (boardSize - 1)) {
    result = 'top';
  }
  if ((boardSize * boardSize - boardSize) < index && index < (boardSize * boardSize - 1)) {
    result = 'bottom';
  }
  if (index % boardSize === 0) {
    if (index === 0) {
      result = 'top-left';
    } else if (index === (boardSize * boardSize - boardSize)) {
      result = 'bottom-left';
    } else {
      result = 'left';
    }
  }
  if ((index + 1) % boardSize === 0) {
    if (index === (boardSize - 1)) {
      result = 'top-right';
    } else if (index === (boardSize * boardSize - 1)) {
      result = 'bottom-right';
    } else {
      result = 'right';
    }
  }

  return result;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

export function genTooltipMessage(data) {
  return `🎖${data.level}⚔${data.attack}🛡${data.defence}❤${data.health}`;
}