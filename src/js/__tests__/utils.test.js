import { genTooltipMessage } from "../utils"
import { Bowman } from "../characters/Bowman";

test('should generate Tooltip message', () => {
  const char = new Bowman(1);
    const result = genTooltipMessage(char); 
    
  expect(result).toBe(`🎖${char.level}⚔${char.attack}🛡${char.defence}❤${char.health}`);
});