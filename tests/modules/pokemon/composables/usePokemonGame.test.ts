import MockAdapter from 'axios-mock-adapter';
import { flushPromises } from '@vue/test-utils';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus, type Pokemon } from '@/modules/pokemon/interfaces';
import { sleep } from '@/modules/pokemon/helpers';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';

import { withSetup } from '../../../utils/with-setup';
import { fakePokemons } from '../../../data/fake-pokemons';

const mockPokemonApi = new MockAdapter(pokemonApi);
mockPokemonApi.onGet('/?limit=151').reply(200, fakePokemons);

describe('UsePokemonGame.test', () => {
   test('should initialize with correct default values', async () => {
      const [results] = withSetup(usePokemonGame);
      const { gameStatus, isLoading, pokemonsOptions, randomPokemon } = results;

      expect(gameStatus.value).toBe(GameStatus.Playing);
      expect(isLoading.value).toBe(true);
      expect(pokemonsOptions.value).toEqual([]);
      expect(randomPokemon.value).toBeUndefined();

      await sleep(0.5);
      await flushPromises();

      expect(isLoading.value).toBe(false);
      expect(pokemonsOptions.value.length).toBe(4);
      expect(randomPokemon.value).toEqual({
         id: expect.any(Number),
         name: expect.any(String),
      });
   });

   test('should correctly handle getNextRound', async () => {
      const [results] = withSetup(usePokemonGame);
      await sleep(0.5);
      await flushPromises();
      const { gameStatus, pokemonsOptions } = results;
      results.getNextRound(5);
      expect(gameStatus.value).toBe(GameStatus.Playing);
      expect(pokemonsOptions.value).toHaveLength(5);
   });

   test('should correctly handle getNextRound and return different pokemons', async () => {
      const [results] = withSetup(usePokemonGame);
      await flushPromises();
      const { pokemonsOptions } = results;

      results.getNextRound();
      const previousPokemonsOptionsIds = pokemonsOptions.value.map((pokemon: Pokemon) => pokemon.id);

      results.getNextRound();
      const currentPokemonsOptionsIds = pokemonsOptions.value.map((pokemon: Pokemon) => pokemon.id);

      expect(previousPokemonsOptionsIds).not.toContain(currentPokemonsOptionsIds);
   });

   test('should correctly handle getNextRound and return different pokemons', async () => {
      const [results] = withSetup(usePokemonGame);
      await flushPromises();
      const { pokemonsOptions } = results;

      const previousPokemonsOptions = [...pokemonsOptions.value.map((pokemon: Pokemon) => pokemon.name)];

      results.getNextRound();
      const currentPokemonsOptions: Pokemon[] = [...pokemonsOptions.value];
      currentPokemonsOptions.forEach((pokemon: Pokemon) => {
         expect(previousPokemonsOptions).not.toContain(pokemon.name);
      });
   });

   test('should correctly handle a incorrect answer', async () => {
      const [results] = withSetup(usePokemonGame);
      await sleep(0.5);
      await flushPromises();
      const { checkAnswer, gameStatus } = results;
      expect(gameStatus.value).toBe(GameStatus.Playing);
      checkAnswer(100000000);
      expect(gameStatus.value).toBe(GameStatus.Lost);
   });

   test('should correctly handle a correct answer', async () => {
      const [results] = withSetup(usePokemonGame);
      await sleep(0.5);
      await flushPromises();
      const { checkAnswer, gameStatus, randomPokemon } = results;
      expect(gameStatus.value).toBe(GameStatus.Playing);
      checkAnswer(randomPokemon.value.id);
      expect(gameStatus.value).toBe(GameStatus.Won);
   });
});