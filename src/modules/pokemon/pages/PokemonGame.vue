<template>
   <section class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-3xl">awaiting please</h1>
      <h3 class="animate-pulse">Loading pokemons...</h3>
   </section>
   <section class="flex flex-col justify-center items-center h-screen">
      <h1 class="m-4">Who is the pokemon?</h1>
      <!-- Pokemon pictures -->
      <PokemonPicture/>
      <!-- Pokemons options -->
       <PokemonOptions/>
   </section>
</template>
<script lang="ts" setup>
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'
</script>