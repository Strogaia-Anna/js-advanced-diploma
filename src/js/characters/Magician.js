import Character from "../Character"

export class Magician extends Character {
    constructor(level) {
        super(level, 'magician');
        this.attack = 10;
        this.defence = 40;
        this.attack_distance = 4;
        this.moves = 1;
        for (let i = 1; i < level; i++) {
            this.addLevel(true);
        }
    }
}