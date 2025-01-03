import MockAdapter from 'axios-mock-adapter';
import { flushPromises } from '@vue/test-utils';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { sleep } from '@/modules/pokemon/helpers';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';

import { withSetup } from '../../../utils/with-setup';
import { fakePokemons } from '../../../data/fake-pokemons';

const mockPokemonApi = new MockAdapter(pokemonApi);
mockPokemonApi.onGet('/?limit=151').reply(200, fakePokemons);

describe('UsePokemonGame.test', () => {
   test('should initialize with correct default values', async () => {
      const [results, app] = withSetup(usePokemonGame);
      const { gameStatus, isLoading, pokemonsOptions, randomPokemon } = results;

      expect(gameStatus.value).toBe(GameStatus.Playing);
      expect(isLoading.value).toBe(true);
      expect(pokemonsOptions.value).toEqual([]);
      expect(randomPokemon.value).toBeUndefined();

      await sleep(2);
      await flushPromises();

      expect(isLoading.value).toBe(false);
      expect(pokemonsOptions.value.length).toBe(4);
      expect(randomPokemon.value).toEqual({
         id: expect.any(Number),
         name: expect.any(String),
      });
   });
});