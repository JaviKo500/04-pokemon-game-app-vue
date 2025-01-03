import { mount } from "@vue/test-utils";
import type { Mock } from "vitest";

import PokemonGame from '@/modules/pokemon/pages/PokemonGame.vue';

import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import { GameStatus } from "@/modules/pokemon/interfaces";

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
   usePokemonGame: vi.fn(),
}));

const pokemonsOptions = [
   {
      id: 1,
      name: 'bulbasaur',
   },
   {
      id: 2,
      name: 'ivysaur',
   },
   {
      id: 3,
      name: 'venusaur',
   },
   {
      id: 4,
      name: 'charmander',
   }
];

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

   test('should render  <PokemonPicture />  and <PokemonOptions />', () => {
      (usePokemonGame as Mock).mockReturnValue({
         gameStatus: GameStatus.Playing,
         isLoading: false,
         pokemonsOptions,
         randomPokemon: pokemonsOptions.at(0),
         getNextRound: vi.fn(),
         checkAnswer: vi.fn(),
      });
      const wrapper = mount(PokemonGame);
      const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
      expect(wrapper.find('img').attributes('src')).toBe(imageUrl);

      const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100');
      expect(buttons.length).toBe(pokemonsOptions.length);
      expect(buttons).length(pokemonsOptions.length);

      buttons.forEach((button, index) => {
         expect(button.text()).toBe(pokemonsOptions[index].name);
      });
   });

   test('should render button for trying again', () => {
      (usePokemonGame as Mock).mockReturnValue({
         gameStatus: GameStatus.Won,
         isLoading: false,
         pokemonsOptions,
         randomPokemon: pokemonsOptions.at(0),
         getNextRound: vi.fn(),
         checkAnswer: vi.fn(),
      });
      const wrapper = mount(PokemonGame);
      const button = wrapper.find('[data-test-id="button-try-again"]');

      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('Try again?');
   });

   test('should call the getNextRound function when clicking on the button', async () => {
      const spyNextRoundFn = vi.fn();
      (usePokemonGame as Mock).mockReturnValue({
         gameStatus: GameStatus.Won,
         isLoading: false,
         pokemonsOptions,
         randomPokemon: pokemonsOptions.at(0),
         getNextRound: spyNextRoundFn,
         checkAnswer: vi.fn(),
      });


      const wrapper = mount(PokemonGame);
      const button = wrapper.find('[data-test-id="button-try-again"]');

      await button.trigger('click');

      expect(spyNextRoundFn).toHaveBeenCalled();
      expect(spyNextRoundFn).toHaveBeenCalledTimes(1);
      expect(spyNextRoundFn).toHaveBeenCalledWith(4);
   });
});