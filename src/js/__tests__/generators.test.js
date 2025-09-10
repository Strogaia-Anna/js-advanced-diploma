import { characterGenerator, generateTeam } from "../generators"
import Character from "../Character";
import { Bowman } from "../characters/Bowman";
import { Swordsman } from "../characters/Swordsman";
import { Magician } from "../characters/Magician";

test('should generate characters infinitely', () => {
    const playerTypes = [Bowman, Swordsman, Magician]; 
    const playerGenerator = characterGenerator(playerTypes, 2);
    playerGenerator.next();
    playerGenerator.next();
    playerGenerator.next();
  expect(playerGenerator.next().value).toBeInstanceOf(Character);
});

test('should generate team', () => {
  const playerTypes = [Bowman, Swordsman, Magician]; 
  const team = generateTeam(playerTypes, 2, 3);
    
  expect(team.characters.length).toBe(3);
  expect(team.characters[0].level).toBeLessThanOrEqual(2);
  expect(team.characters[0].level).toBeGreaterThanOrEqual(1);
});