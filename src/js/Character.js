/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;

    // TODO: выбросите исключение, если кто-то использует "new Character()"

    if (new.target === Character) throw "Character must be called without new"
  }

  addLevel(is_new=false) {
    if (is_new === false) {
      this.level += 1;
    }
    
    if (this.level > 4) {
      this.level = 4;
      return;
    }
    this.attack = Math.max(this.attack, this.attack * (80 + this.health) / 100);
    this.defence = Math.max(this.defence, this.defence * (80 + this.health) / 100);
    this.health = Math.min(this.health + 80, 100);
  }

  toString() {
    return `{level: ${this.level}, type: ${this.type}, health: ${this.health}, defence: ${this.defence}, attack: ${this.attack}}`;
  }
}
