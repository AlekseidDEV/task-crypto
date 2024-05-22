import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { axiosClient } from "@/axiosClient";
import { cardObj } from "@/models/cardObj";

export const useStore = defineStore("store", () => {
  const posts: cardObj[] = reactive([]);
  const onEdit = ref(false);
  const editId = ref("");
  const editTitile = ref("");
  const editDescr = ref("");
  const countPage = ref(1);
  const postsSearch: cardObj[] = reactive([]);
  const isSearch = ref(false);
  const flagWindModal = ref(false);
  const getData = async () => {
    const responce = await axiosClient("/posts");
    posts.splice(0, posts.length);
    responce.data.forEach((item: { title: string; description: string }) =>
      posts.push(item)
    );
  };
  const searchData = (word) => {
    isSearch.value = true;
    postsSearch.splice(0, postsSearch.length);
    axiosClient(`/posts?title_like=${word}`).then((res) => {
      if (res.data.length !== 0) {
        res.data.forEach((item) => {
          postsSearch.push(item);
        });
      } else {
        postsSearch.splice(0, postsSearch.length);
      }
    });
  };
  const getCards = (current: number, perPage: number) => {
    const start = perPage * (current - 1);
    const end = perPage * current;
    return posts ? posts.slice(start, end) : null;
  };
  const getFilterCards = (current: number, perPage: number) => {
    const start = perPage * (current - 1);
    const end = perPage * current;
    return postsSearch ? postsSearch.slice(start, end) : null;
  };
  const getByIDCard = (id) => {
    return posts ? posts[id] : null;
  };
  const addPost = (title, descr) => {
    axiosClient
      .post("/posts", {
        title: title,
        description: descr,
      })
      .then(() => {
        flagWindModal.value = false;
        alert("sent successfully");
        getData();
      })
      .catch((error) => console.log(error)),
      {
        "Content-Type": "application/json",
      };
  };
  const editPost = (id, title, descr) => {
    axiosClient
      .put(`/posts/${id}`, {
        title: title,
        description: descr,
      })
      .then(() => {
        flagWindModal.value = false;
        alert("sent successfully");
        getData();
      });
  };
  return {
    posts,
    getData,
    getCards,
    getByIDCard,
    countPage,
    isSearch,
    postsSearch,
    searchData,
    getFilterCards,
    onEdit,
    flagWindModal,
    addPost,
    editPost,
    editTitile,
    editDescr,
    editId,
  };
});
