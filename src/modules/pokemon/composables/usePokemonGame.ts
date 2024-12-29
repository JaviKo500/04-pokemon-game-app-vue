import { onMounted, ref } from "vue";
import { GameStatus, type PokemonResponse } from '../interfaces';
import { pokemonApi } from "../api/pokemonApi";

export const usePokemonGame = () => {

   const gameStatus = ref<GameStatus>(GameStatus.Playing);

   const getPokemons = async () => {
      const response = await pokemonApi.get<PokemonResponse>('/?limit=151');
      console.log(response.data);
   };

   onMounted(() => {
      getPokemons();
   });

   return {
      gameStatus,
   };
}