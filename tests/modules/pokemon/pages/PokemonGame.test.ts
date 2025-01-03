import { mount } from "@vue/test-utils";

import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';
import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import type { Mock } from "vitest";
import { GameStatus } from "@/modules/pokemon/interfaces";

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
   usePokemonGame: vi.fn(),
}));

describe('PokemonGame.test', () => {
   test('should initialize with default values', () => {
      (usePokemonGame as Mock).mockReturnValue({
         gameStatus: GameStatus.Playing,
         isLoading: true,
         pokemonsOptions: [],
         randomPokemon: undefined,
         getNextRound: vi.fn(),
         checkAnswer: vi.fn(),
      });
      const wrapper = mount(PokemonGame);

      expect(wrapper.get('h1').text()).toBe('awaiting please');
      expect(wrapper.get('h1').classes()).toContain('text-3xl');

      expect(wrapper.get('h3').text()).toBe('Loading pokemons...');
      expect(wrapper.get('h3').classes()).toEqual(['animate-pulse']);
   });
});