import themes from "./themes";
import { generateTeam } from "./generators"
import { Bowman } from "./characters/Bowman";
import { Swordsman } from "./characters/Swordsman";
import { Magician } from "./characters/Magician";
import { Vampire } from "./characters/Vampire";
import { Undead } from "./characters/Undead";
import { Daemon } from "./characters/Daemon";
import { genTooltipMessage } from "./utils"
import GameState from "./GameState";
import GamePlay from "./GamePlay";
import Team from "./Team";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.levels = [themes.prairie, themes.desert, themes.arctic, themes.mountain];
  }

  init(is_new=true) {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    let team1;
    let level = 0;
    if (is_new) {
      team1 = generateTeam([Bowman, Swordsman, Magician], 3, 4)
    } else {
      level = this.gameState.level;
      const chars = [];
      for (const ch of this.gameState.positionedCharacters.filter((item) => ['bowman', 'swordsman', 'magician'].includes(item.character.type))) {
        chars.push(ch.character);
      }
      team1 = new Team(chars);
    }
    const team2 = generateTeam([Vampire, Undead, Daemon], 3, 4);

    this.gameState = new GameState(this.gamePlay.boardSize, [team1, team2], this.getPositions(), level);

    this.gamePlay.drawUi(this.levels[this.gameState.level]);

    this.gamePlay.redrawPositions(this.gameState.positionedCharacters);

    if (is_new) {
      this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
      this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
      this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
      this.gamePlay.addNewGameListener(this.onNewGame.bind(this));
      this.gamePlay.addSaveGameListener(this.onSaveGame.bind(this));
      this.gamePlay.addLoadGameListener(this.onLoadGame.bind(this));
    }
  }

  onNewGame() {
    this.gamePlay.clearCellListeners();
    this.gamePlay.clearGameListeners();
    this.init();
  }

  onSaveGame() {
    this.stateService.save(JSON.stringify(this.gameState));
  }

  onLoadGame() {
    let game;
    try {
      game = this.stateService.load();
    } catch (e) {
      GamePlay.showError(e.message);
      return;
    }
    
    if (game) {
      this.gameState.from(JSON.parse(game));
      this.gamePlay.drawUi(this.levels[this.gameState.level]);
      this.gamePlay.redrawPositions(this.gameState.positionedCharacters);
    }
  }

  getPositions() {
    const positionsTeam1 = [];
    const positionsTeam2 = [];
    const boardSize = this.gamePlay.boardSize;
    for (let i = 0; i < boardSize ** 2 ; i++) {
      if ((i % boardSize === 0) || ((i - 1) % boardSize === 0)) {
        positionsTeam1.push(i);
        continue;
      }
      if (((i + 1) % boardSize === 0) || ((i + 2) % boardSize === 0)) {
        positionsTeam2.push(i);
      }
    }
    return [positionsTeam1, positionsTeam2];
  }

  onCellClick(index) {
    // TODO: react to click
    const char_ind = this.gameState.positionedCharacters.findIndex((item) => index === item.position);
    const char = this.gameState.positionedCharacters[char_ind];
    const selected_char = this.gameState.positionedCharacters.find((item) => this.gameState.selected_index === item.position);
    if (char) {
      if (['bowman', 'swordsman', 'magician'].includes(char.character.type)) {
        if (![undefined, index].includes(this.gameState.selected_index)) {
          this.gamePlay.deselectCell(this.gameState.selected_index);
        }
        this.gamePlay.selectCell(index);
        this.gameState.selected_index = index;
      } else {
        if (!selected_char) {
          GamePlay.showError('wrong cell');
          return;
        }
        const char_row_ind = parseInt(this.gameState.selected_index / this.gameState.boardSize);
        if (this.isPossibleAttack(char_row_ind, selected_char, index)) {
          const damage = Math.max(selected_char.character.attack - char.character.defence, selected_char.character.attack * 0.1);
          
          this.gamePlay.showDamage(index, damage).then(() => {
            char.character.health -= damage;
            if (char.character.health <= 0) {
              this.gameState.positionedCharacters.splice(char_ind, 1);
              if (!this.gameState.positionedCharacters.find((item) => !['bowman', 'swordsman', 'magician'].includes(item.character.type))) {
                
                for (let ch of this.gameState.positionedCharacters.filter((item) => ['bowman', 'swordsman', 'magician'].includes(item.character.type))) {
                  ch.character.addLevel();
                }
                this.gamePlay.deselectCell(this.gameState.hover_index);
                this.gamePlay.deselectCell(this.gameState.selected_index);
                this.gameState.level += 1;
                this.gamePlay.redrawPositions(this.gameState.positionedCharacters);
                if (this.gameState.level < 4) {
                  this.init(false);
                  return;
                }
                this.gamePlay.clearListeners()
                return;
              }
            }
            this.gamePlay.deselectCell(this.gameState.hover_index);
            this.gamePlay.deselectCell(this.gameState.selected_index);
            this.gamePlay.deselectCell(index);
            this.gamePlay.redrawPositions(this.gameState.positionedCharacters);
            this.gameState.selected_index = undefined;
            this.gameState.turn = "enemy";
            this.gamePlay.setCursor('default');
            this.enemyTurn();
          });
        } else {
          GamePlay.showError('wrong cell');
        }
      }
    } else {
      if (selected_char) {
        const char_row_ind = parseInt(this.gameState.selected_index / this.gameState.boardSize);
        if (this.isPossibleMove(selected_char.character.moves, char, index, char_row_ind)) {
          selected_char.position = index;
          this.gamePlay.deselectCell(this.gameState.selected_index);
          this.gamePlay.deselectCell(this.gameState.hover_index);
          this.gamePlay.deselectCell(index);
          this.gamePlay.redrawPositions(this.gameState.positionedCharacters);
          this.gameState.selected_index = undefined;
          this.gameState.turn = "enemy";
          this.gamePlay.setCursor('default');
          this.enemyTurn();
        } else {
          GamePlay.showError('wrong cell');
        }
      } else {
        GamePlay.showError('wrong cell');
      }
    }
  }

  enemyTurn() {
    const enemyChars = this.gameState.positionedCharacters.filter((item) => !['bowman', 'swordsman', 'magician'].includes(item.character.type));
    const playerChars = this.gameState.positionedCharacters.filter((item) => ['bowman', 'swordsman', 'magician'].includes(item.character.type));
    for (let enemyCh of enemyChars) {
      const char_row_ind = parseInt(enemyCh.position / this.gameState.boardSize);
      for (let playerCh of playerChars) {
        const playerChInd = this.gameState.positionedCharacters.findIndex((item) => playerCh.position === item.position);
        if (this.isPossibleAttack(char_row_ind, enemyCh, playerCh.position)) {
          const damage = Math.max(enemyCh.character.attack - playerCh.character.defence, enemyCh.character.attack * 0.1);
          this.gamePlay.showDamage(playerCh.position, damage).then(() => {
            playerCh.character.health -= damage;
            if (playerCh.character.health <= 0) {
              this.gameState.positionedCharacters.splice(playerChInd, 1);
              if (!this.gameState.positionedCharacters.find((item) => ['bowman', 'swordsman', 'magician'].includes(item.character.type))) {
                this.gamePlay.redrawPositions(this.gameState.positionedCharacters);
                this.gamePlay.clearListeners()
                return;
              }
            }
            this.gamePlay.redrawPositions(this.gameState.positionedCharacters);
            this.gameState.turn = "player";
            this.gamePlay.setCursor('default');
          });
          return;
        }
      }
    }
    this.gameState.turn = "player";
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const char = this.gameState.positionedCharacters.find((item) => index === item.position);
    const selected_char = this.gameState.positionedCharacters.find((item) => this.gameState.selected_index === item.position);
    if (char) {
      const message = genTooltipMessage(char.character);
      this.gamePlay.showCellTooltip(message, index);
    }

    if (![undefined, index].includes(this.gameState.selected_index)) {
      const char_row_ind = parseInt(this.gameState.selected_index / this.gameState.boardSize);
      if (char) {
        if (['bowman', 'swordsman', 'magician'].includes(char.character.type)) {
          this.gamePlay.setCursor('pointer'); 
        } else {
          this.gamePlay.deselectCell(this.gameState.hover_index);

          if (this.isPossibleAttack(char_row_ind, selected_char, index)) {
            this.gamePlay.setCursor('crosshair');
            this.gamePlay.selectCell(index, "red");
          } else {
            this.gamePlay.setCursor('not-allowed');
          }
        }
        // this.gamePlay.deselectCell(this.gameState.hover_index);
      } else {
        if (selected_char) {
          if (this.isPossibleMove(selected_char.character.moves, char, index, char_row_ind)) {
            this.gamePlay.setCursor('pointer');
            this.gamePlay.selectCell(index, "green");
          } else {
            this.gamePlay.setCursor('not-allowed');
          }
        } else {
          this.gamePlay.setCursor('not-allowed');
        }
      }
      this.gamePlay.selectCell(this.gameState.selected_index);
    }
    this.gameState.hover_index = index;
  }

  isPossibleAttack(char_row_ind, selected_char, index) {
    let start_index = char_row_ind - selected_char.character.attack_distance;
    start_index = start_index < 0 ? 0 : start_index;
    let end_index = char_row_ind + selected_char.character.attack_distance;
    end_index = (end_index < this.gameState.boardSize) ? end_index : this.gameState.boardSize - 1;

    const offset = selected_char.position % this.gameState.boardSize;
    for (let row_index = start_index; row_index <= end_index; row_index++) {
      let start_cell_index = (row_index * this.gameState.boardSize + offset) - selected_char.character.attack_distance;
      start_cell_index = (start_cell_index >= this.gameState.boardSize * row_index) ? start_cell_index : this.gameState.boardSize * row_index;
      let end_cell_index = (row_index * this.gameState.boardSize + offset) + selected_char.character.attack_distance;
      end_cell_index = (end_cell_index < this.gameState.boardSize * (row_index + 1)) ? end_cell_index : this.gameState.boardSize * (row_index + 1) - 1;

      if (start_cell_index <= index && index <= end_cell_index) {
        return true;
      }
    }
    return false;
  }

  isPossibleMove(moves, char, index, char_row_ind) {
    for (let i = 1; i <= moves; i++) {
      if(char) {
        continue;
      }
      if(this.gameState.selected_index + i === index || this.gameState.selected_index - i === index) {
        if (parseInt(this.gameState.selected_index / this.gameState.boardSize) === parseInt(index / this.gameState.boardSize)) {
          return true;
        }
      }

      if(this.gameState.selected_index + this.gameState.boardSize * i === index || this.gameState.selected_index - this.gameState.boardSize * i === index) {
        return true;
      }

      if(this.gameState.selected_index + this.gameState.boardSize * i + i === index || this.gameState.selected_index + this.gameState.boardSize * i - i === index) {
        if ((i + char_row_ind) * this.gameState.boardSize <= index && index <= this.gameState.boardSize * (i + char_row_ind + 1) - 1) {
          return true;
        }
      }

      if(this.gameState.selected_index - this.gameState.boardSize * i + i === index || this.gameState.selected_index - this.gameState.boardSize * i - i === index) {
        if ((char_row_ind - i) * this.gameState.boardSize <= index && index <= this.gameState.boardSize * (char_row_ind - i + 1) - 1) {
          return true;
        }
      }
    }
    return false;
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.deselectCell(this.gameState.hover_index);
    if (this.gameState.selected_index !== undefined) {
      this.gamePlay.selectCell(this.gameState.selected_index);
    }
    this.gamePlay.hideCellTooltip(index);
  }
}
