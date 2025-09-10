import Character from "../Character"

export class Daemon extends Character {
    constructor(level) {
        super(level, 'daemon');
        this.attack = 10;
        this.defence = 10;
        this.attack_distance = 4;
        this.moves = 1;
        for (let i = 1; i < level; i++) {
            this.addLevel(true);
        }
    }
}