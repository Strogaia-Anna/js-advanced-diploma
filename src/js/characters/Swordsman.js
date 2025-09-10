import Character from "../Character"

export class Swordsman extends Character {
    constructor(level) {
        super(level, 'swordsman');
        this.attack = 40;
        this.defence = 10;
        this.attack_distance = 1;
        this.moves = 4;
        for (let i = 1; i < level; i++) {
            this.addLevel(true);
        }
    }
}