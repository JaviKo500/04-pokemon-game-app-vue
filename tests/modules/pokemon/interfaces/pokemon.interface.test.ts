import { type Pokemon } from '@/modules/pokemon/interfaces/pokemon.interface';
describe('Pokemon.interface.test', () => {
   const pokemon: Pokemon = {
      id: 1,
      name: 'bulbasaur',
   }
   test('should have this properties and types', () => {
      expect(pokemon).toHaveProperty('id');
      expect(pokemon).toHaveProperty('name');

      expect(pokemon).toEqual({
         id: expect.any(Number),
         name: expect.any(String),
      });
   });

   test('should have and id type of number', () => {
      expect(pokemon.id).toEqual(expect.any(Number));
   });
   test('should have a name type of string', () => {
      expect(pokemon.name).toEqual(expect.any(String));
   });
});