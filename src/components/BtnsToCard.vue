<template>
  <div class="flex gap-5 mt-5">
    <button
      @click.stop="deletePost"
      class="bg-red-700 text-white py-1 px-5 rounded-3xl"
    >
      delete
    </button>
    <button
      @click.stop="editPost"
      class="bg-yellow-600 text-white py-1 px-5 rounded-3xl"
    >
      edit
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/postsStrores";
import { axiosClient } from "@/axiosClient";

const store = useStore();

const deletePost = (e) => {
  axiosClient
    .delete(`/posts/${e.target.closest("li").id}`, {
      method: "DELETE",
    })
    .then(() => {
      store.getData();
    });
};
const editPost = (e) => {
  const descr = e.target.closest("li").querySelector("p");
  const title = e.target.closest("li").querySelector("h2");
  store.onEdit = true;
  store.flagWindModal = true;
  store.editTitile = title.innerText;
  store.editDescr = descr.innerText;
  store.editId = e.target.closest("li").id;
};
</script>

<style></style>
