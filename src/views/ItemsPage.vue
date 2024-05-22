<template>
  <div class="max-w-[1200px] w-full m-auto">
    <h1 class="text-center mt-5 text-6xl font-bold text-green-600">
      ItemsPage
    </h1>
    <div
      class="shadow shadow-green-800 rounded-2xl mt-20 max-w-[800px] m-auto flex justify-center"
    >
      <div class="max-w-[500px] justify-center py-3">
        <h2 class="flex justify-center font-medium text-2xl text-green-900">
          {{ item!.title }}
        </h2>
        <p class="flex mt-5 font-normal">{{ item!.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/postsStrores";
import { useRoute } from "vue-router";
import { computed } from "vue";

const store = useStore();
const route = useRoute();
const item = computed(() => {
  return store.getByIDCard(+route.params.id - 1);
});
</script>

<style></style>
