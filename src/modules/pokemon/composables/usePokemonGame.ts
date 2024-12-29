import { computed, onMounted, ref } from "vue";
import { GameStatus, type Pokemon, type PokemonResponse } from '../interfaces';
import { pokemonApi } from "../api/pokemonApi";
import { showConfetti, sleep } from "../helpers";

export const usePokemonGame = () => {

   const gameStatus = ref<GameStatus>(GameStatus.Playing);
   const pokemons = ref<Pokemon[]>([]);
   const pokemonsOptions = ref<Pokemon[]>([]);
   const isLoading = computed(() => pokemons.value.length === 0);
   const randomPokemon = computed(
      () => {
         const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);
         return pokemonsOptions.value[randomIndex];
      }
   );


   const getPokemons = async (): Promise<Pokemon[]> => {
      const response = await pokemonApi.get<PokemonResponse>('/?limit=151');
      const pokemonsArray = response.data.results?.map((pokemon) => {
         const urlParts: string[] = pokemon?.url?.split('/') ?? [];
         const id = urlParts[urlParts.length - 2] ?? Date.now();
         return {
            id: +id,
            name: pokemon.name!,
         } as Pokemon;
      });

      return (pokemonsArray ?? []).sort(() => Math.random() - 0.5);
   };

   const getNextOptions = async (howMany: number = 4) => {
      gameStatus.value = GameStatus.Playing;
      pokemonsOptions.value = pokemons.value.slice(0, howMany);
      pokemons.value = pokemons.value.slice(howMany);
   }

   const checkAnswer = (id: number) => {
      const hasWon = randomPokemon.value.id === id;
      if (hasWon) {
         gameStatus.value = GameStatus.Won;
         showConfetti();
         return;
      }

      gameStatus.value = GameStatus.Lost;
   }
   onMounted(async () => {
      await sleep(0.5);
      pokemons.value = await getPokemons();
      getNextOptions();
   });

   return {
      gameStatus,
      isLoading,
      pokemonsOptions,
      randomPokemon,
      // methods
      getNextOptions,
      checkAnswer,
   };
}