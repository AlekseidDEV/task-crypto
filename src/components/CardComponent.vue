<template>
  <li
    @click="onClick"
    class="shadow shadow-green-400 w-[320px] pt-10 pb-10 pr-5 pl-5 hover:shadow-2xl duration-500 cursor-pointer hover:shadow-green-200"
  >
    <h2 class="font-bold text-2xl text-green-900">{{ props.card.title }}</h2>
    <p class="mt-5 font-normal">
      {{ props.card.description }}
    </p>
    <Btns />
  </li>
</template>

<script setup lang="ts">
import { cardObj } from "@/models/cardObj";
import Btns from "@/components/BtnsToCard.vue";

const props = defineProps<{
  card: cardObj;
}>();
const emit = defineEmits(["onNavigateItems"]);
const onClick = () => {
  emit("onNavigateItems");
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
