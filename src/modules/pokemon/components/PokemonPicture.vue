import { computed } from 'vue';
<template>
   <section>
      <img v-if="!showPokemon" class="brightness-0" :src="pokemonImage" alt="" srcset="">
      <img v-else class="fade-in" :src="pokemonImage" alt="pokemon image" srcset="">
   </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

   interface Props {
      pokemonId: number;
      showPokemon?: boolean;
   }
   const props = withDefaults(
      defineProps<Props>(),
      {
         showPokemon: false,
      }
   );


   const pokemonImage = computed(()=> 
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`
   );
   console.log('<--------------- JK PokemonPicture --------------->');
   console.log(props);
</script>

<style scoped>
img {
   height: 200px;
   user-select: none;
   -webkit-user-drag: none;
   -ms-user-select: none;
   -moz-user-select: none;
   -webkit-user-select: none;
}
</style>