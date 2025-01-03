import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import { withSetup } from "../../../utils/with-setup";

describe('UsePokemonGame.test', () => {
   test('should initialize with correct default values', () => {
      const [results, app] = withSetup(usePokemonGame);
      const { gameStatus, isLoading, pokemonsOptions, randomPokemon } = results;

   });
});