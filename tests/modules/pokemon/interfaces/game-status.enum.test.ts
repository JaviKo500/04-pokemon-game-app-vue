import { GameStatus } from '@/modules/pokemon/interfaces/game-status.enum';
describe('Game-status.enum.test', () => {
   test('should have a value of "playing"', () => {
      expect(GameStatus.Playing).toBe('playing');
      expect(GameStatus.Won).toBe('won');
      expect(GameStatus.Lost).toBe('lost');
   });
});