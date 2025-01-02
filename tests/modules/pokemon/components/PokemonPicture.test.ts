import { mount } from '@vue/test-utils';
import PokemonPicture from '@pokemon/components/PokemonPicture.vue';

describe('PokemonPicture.test', () => {
   const pokemonId = 1;
   const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
   test('should render the hidden image when showPokemon props is false', async () => {

      const wrapper = mount(PokemonPicture, {
         props: {
            showPokemon: false,
            pokemonId: pokemonId,
         }
      });

      const image = wrapper.find('img');

      expect(image.exists()).toBeTruthy();
      expect(image.attributes('class')).toBe('brightness-0');
      expect(image.attributes('src')).toBe(pokemonImage);

      const attributes = image.attributes();
      expect(attributes).toEqual(
         expect.objectContaining({
            src: pokemonImage,
            class: 'brightness-0',
         })
      )
   });

   test('should render the visible image when showPokemon props is true', async () => {
      const wrapper = mount(PokemonPicture, {
         props: {
            showPokemon: true,
            pokemonId: pokemonId,
         }
      });

      const image = wrapper.find('img');

      expect(image.exists()).toBe(true);
      expect(image.attributes('class')).toBe('fade-in');
      expect(image.attributes('src')).toBe(pokemonImage);
   });
});