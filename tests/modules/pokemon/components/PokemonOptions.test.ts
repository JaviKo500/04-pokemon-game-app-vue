import type { Pokemon } from "@/modules/pokemon/interfaces";
import { mount } from "@vue/test-utils";
import PokemonOptions from '@pokemon/components/PokemonOptions.vue';

const options: Pokemon[] = [
   {
      id: 1,
      name: 'Bulbasaur',
   },
   {
      id: 2,
      name: 'Ivysaur',
   },
   {
      id: 3,
      name: 'Venusaur',
   }
];

describe('PokemonOptions.test', () => {

   test('should render buttons with correct text', () => {
      const wrapper = mount(PokemonOptions, {
         props: {
            options,
            blockSelection: false,
            correctAnswer: 1,
         }
      });

      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBe(3);
      buttons.forEach((button, index) => {
         expect(button.text()).toBe(options[index].name);
         expect(button.attributes('class')).toBe('capitalize disabled:shadow-none disabled:bg-gray-100');
      });
   });

   test('should emit selected option when a button is clicked', async () => {
      const wrapper = mount(PokemonOptions, {
         props: {
            options,
            blockSelection: false,
            correctAnswer: 1,
         }
      });

      const [button1, button2, button3] = wrapper.findAll('button');
      await button1.trigger('click');
      await button2.trigger('click');
      await button3.trigger('click');

      expect(wrapper.emitted().selectedOption).toBeTruthy();
      expect(wrapper.emitted().selectedOption[0]).toEqual([1]);
      expect(wrapper.emitted().selectedOption[1]).toEqual([2]);
      expect(wrapper.emitted().selectedOption[2]).toEqual([3]);


   });
});