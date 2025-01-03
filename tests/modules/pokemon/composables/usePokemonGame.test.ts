import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import { withSetup } from "../../../utils/with-setup";
import { GameStatus } from "@/modules/pokemon/interfaces";
import { flushPromises } from "@vue/test-utils";
import { sleep } from "@/modules/pokemon/helpers";

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