import Team from "./Team";
import { Bowman } from "./characters/Bowman";
import { Magician } from "./characters/Magician";
import { Swordsman } from "./characters/Swordsman";
import { Daemon } from "./characters/Daemon";
import { Undead } from "./characters/Undead";
import { Vampire } from "./characters/Vampire";
import PositionedCharacter from "./PositionedCharacter";

const allowed_types = {
  'bowman': Bowman, 'magician': Magician, 'swordsman': Swordsman,
  'daemon': Daemon, 'undead': Undead, 'vampire': Vampire
};

export default class GameState {
  constructor(boardSize, teams, positions, level) {
    this.boardSize = boardSize;
    this.positionedCharacters = [];
    this.selected_index;
    this.hover_index;
    this.turn = 'player'
    this.level = level;
    this.getPositionedCahracters(teams[0].characters, positions[0]);
    this.getPositionedCahracters(teams[1].characters, positions[1]);
  }

  getPositionedCahracters(characters, positions) {
    for (let character of characters) {
      const index = Math.floor(Math.random() * positions.length);
      const positionedCharacter = new PositionedCharacter(character, positions[index]);
      this.positionedCharacters.push(positionedCharacter);
      positions.splice(index, 1);
    }
  }

  from(object) {
    this.boardSize = object.boardSize;
    this.turn = object.turn;
    this.level = object.level;
    this.positionedCharacters = [];

    for (let character of object.positionedCharacters) {
      const char = new allowed_types[character.character.type](character.character.level);
      char.attack = character.character.attack;
      char.defence = character.character.defence;
      char.health = character.character.health;
      this.positionedCharacters.push(new PositionedCharacter(char, character.position))
    }

    // TODO: create object
    return null;
  }
}
