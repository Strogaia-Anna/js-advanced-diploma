import Character from "../Character"

export class Vampire extends Character {
    constructor(level) {
        super(level, 'vampire');
        this.attack = 25;
        this.defence = 25;
        this.attack_distance = 2;
        this.moves = 2;
        for (let i = 1; i < level; i++) {
            this.addLevel(true);
        }
    }
}