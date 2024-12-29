<template>
   <section class="mt-5 flex flex-col justify-center">
      <button 
         v-for="{ name, id } in options" 
         :key="id" 
         @click="$emit('selectedOption', id)"
         :disabled="blockSelection"
         :class="[
            'capitalize disabled:shadow-none disabled:bg-gray-100',
            {
               correct: id === correctAnswer && blockSelection,
               incorrect: id !== correctAnswer && blockSelection,
            }
         ]">
       {{ name }}
      </button>
   </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '../interfaces';

   interface Props {
      options: Pokemon[];
      correctAnswer: number;
      blockSelection?: boolean;
   }

   defineProps<Props>();

   defineEmits<{
      selectedOption: [id:number]
   }>();

</script>

<style scoped>
   button{
      @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
   }

   .correct {
      @apply bg-blue-500 text-white;
   }

   .incorrect {
      @apply bg-red-100 opacity-70;
   }
</style>