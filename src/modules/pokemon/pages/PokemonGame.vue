<template>
   <section v-if="isLoading || !randomPokemon.id"  class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-3xl">awaiting please</h1>
      <h3 class="animate-pulse">Loading pokemons...</h3>
   </section>
   <section v-else class="flex flex-col justify-center items-center h-screen">
      <h1 class="m-4">Who is the pokemon?</h1>
      <div class="h-20">
         <button 
            class="m-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white" 
            v-if="gameStatus !== GameStatus.Playing"
            @click="getNextRound(4)"
            >
            Try again?
         </button>
      </div>
      <!-- Pokemon pictures -->
      <PokemonPicture 
         :pokemon-id="randomPokemon.id" 
         :show-pokemon="gameStatus !== GameStatus.Playing"/>
      <!-- Pokemons options -->
      <PokemonOptions 
         :options="options"
         :block-selection="gameStatus !== GameStatus.Playing"
         :correct-answer="randomPokemon.id"
         @selected-option="checkAnswer"
         />
   </section>
</template>
<script lang="ts" setup>
   import PokemonPicture from '@pokemon/components/PokemonPicture.vue'
   import PokemonOptions from '@pokemon/components/PokemonOptions.vue'
   import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { GameStatus } from '../interfaces';

   const { isLoading, randomPokemon, gameStatus, pokemonsOptions: options, checkAnswer, getNextRound } = usePokemonGame();

</script>