<template>
  <div class="text-center">
    <h1 class="text-center mt-5 text-6xl font-bold text-green-600">
      Home Page
    </h1>
  </div>
  <div class="max-w-5xl m-auto flex justify-between my-10">
    <div>
      <input
        v-model="words"
        class="border-2 rounded-3xl pl-4 w-[400px] py-1"
        type="text"
        placeholder="search post..."
      />
      <button
        class="ml-2 bg-indigo-600 py-1 px-3 rounded-3xl text-white font-medium"
        :disabled="!isSearch"
        @click="
          () => {
            store.isSearch = false;
            words = '';
          }
        "
      >
        reset searched
      </button>
    </div>
    <button
      @click="store.flagWindModal = !store.flagWindModal"
      class="bg-indigo-600 py-1 px-8 rounded-3xl text-white font-medium"
    >
      add post
    </button>
    <teleport to="body">
      <ModalWindow @modal="modal" :show="modalFlag" />
    </teleport>
  </div>
  <ul
    class="max-w-5xl m-auto mt-10 flex flex-wrap justify-center gap-6"
    v-if="!isSearch"
  >
    <CardComponent
      :id="card.id"
      v-for="card of cards"
      :key="card.id"
      :card="card"
      @click="onNavigateItems(card.id)"
    />
  </ul>
  <div
    class="max-w-5xl m-auto mt-10 flex flex-wrap justify-center gap-6"
    v-else-if="serachPost.length !== 0"
  >
    <CardComponent
      :id="card.id"
      v-for="card of serachPost"
      :key="card.id"
      :card="card"
      @click="onNavigateItems(card.id)"
    />
  </div>
  <div
    class="max-w-5xl m-auto mt-10 flex flex-wrap justify-center gap-6"
    v-else
  >
    <p>no result</p>
  </div>
  <div class="max-w-5xl m-auto flex justify-center gap-6 mt-10">
    <button
      class="bg-indigo-600 py-1 px-5 rounded-3xl text-white"
      @click="prev"
    >
      prev
    </button>
    <button
      class="bg-indigo-600 py-1 px-5 rounded-3xl text-white"
      @click="next"
    >
      next
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/postsStrores.ts";
import { computed, onMounted, ref, watch } from "vue";
import CardComponent from "@/components/CardComponent.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import router from "@/router";
import debounce from "lodash.debounce";

const modalFlag = computed(() => store.flagWindModal);
const words = ref("");
const isSearch = computed(() => store.isSearch);
const store = useStore();
const itemPerPage = 6;
const serachPost = computed(() =>
  store.getFilterCards(currentPage.value, itemPerPage)
);
const currentPage = ref(store.countPage > 1 ? store.countPage : 1);
const cards = computed(() => store.getCards(currentPage.value, itemPerPage));

watch(
  words,
  debounce((text) => {
    if (text !== "") {
      currentPage.value = 1;
      store.searchData(text);
    }
  }, 500)
);
const onNavigateItems = (id) => {
  router.push({ name: "Item", params: { id: id } });
};

const next = () => {
  currentPage.value++;
  store.countPage = currentPage.value;
  if (isSearch.value && serachPost.value.length === 0) {
    currentPage.value = 1;
  }

  if (cards.value.length === 0) {
    currentPage.value = 1;
  }
};

const prev = () => {
  currentPage.value--;
  store.countPage = currentPage.value;
  if (isSearch.value && currentPage.value < 1) {
    currentPage.value = 1;
  }
  if (currentPage.value < 1) {
    currentPage.value = 1;
  }
};

const modal = () => {
  store.flagWindModal = false;
};

if (store.posts.length === 0) {
  onMounted(() => {
    store.getData();
  });
}
</script>

<style scoped>
body {
  position: relative;
}
</style>
