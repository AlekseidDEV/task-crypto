<template>
  <Transition name="modal">
    <div class="modal_window" v-show="props.show" @click="modal">
      <div class="w-[700px] bg-gray-500 rounded-2xl relative">
        <form
          @submit.prevent="submit"
          class="flex py-20 px-10 flex-col justify-center items-center gap-2"
        >
          <h2 class="mb-8 font-medium text-4xl text-white">Add Post</h2>
          <input
            class="border-2 rounded-3xl pl-4 w-[400px] py-1"
            type="text"
            placeholder="title post..."
            v-model="v$.title.$model"
          />
          <span
            class="text-white underline font-bold"
            v-for="error of v$.title.$errors"
            :key="error.$uid"
            >{{ error.$message }}</span
          >
          <textarea
            v-model="v$.descr.$model"
            class="rounded-3xl w-[400px] px-10 py-3"
            placeholder="description..."
          ></textarea>
          <span
            class="text-white font-bold"
            v-for="error of v$.descr.$errors"
            :key="error.$uid"
            >{{ error.$message }}</span
          >
          <button type="submit" class="bg-white mt-5 py-1 px-5 rounded">
            send post
          </button>
        </form>
        <span class="close cursor-pointer top-5 right-5 text-white">X</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { computed, ref, watch } from "vue";
import { useStore } from "@/store/postsStrores";

const store = useStore();
const emit = defineEmits(["modal"]);
const editTitle = computed(() => store.editTitile);
const editDescr = computed(() => store.editDescr);
const title = ref("");
const descr = ref("");
const isEditPost = computed(() => store.onEdit);

const props = defineProps<{
  show: boolean;
}>();

const rules = computed(() => {
  return {
    title: { required, maxLength: maxLength(12) },
    descr: { required, maxLength: maxLength(50) },
  };
});

watch(editTitle, (newVal) => {
  title.value = newVal;
});

watch(editDescr, (newVal) => {
  descr.value = newVal;
});

const v$ = useVuelidate(rules, { title, descr });

const submit = async (e) => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  if (!isEditPost.value) {
    e.target.reset();
    store.addPost(title.value, descr.value);
  } else {
    e.target.reset();
    store.editPost(store.editId, title.value, descr.value);
  }
};

const modal = (e) => {
  if (e.target.matches(".close") || e.target.matches(".modal_window")) {
    store.editTitile = "";
    store.editDescr = "";
    store.onEdit = false;
    emit("modal");
  }
};
</script>

<style scoped>
.modal_window * {
  position: relative;
}

.modal_window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}

.modal_window::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
}

.close {
  position: absolute;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
