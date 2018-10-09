<template>
    <div class="container">
        <h1>This is the posts component of the application</h1>
        <h1>Latest Posts</h1>
        <div class="create-post">
            <label for="create-post">Say Something!</label>
            <input type="text" id="create-post" v-model="text" placeholder="Create a new post">
            <button @click="createPost()">Create Post</button>
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="posts-container">
            <div class="post" v-for="post in posts" :key="post._id" @click="deletePost(post._id)">
              {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}  {{ post.text }}
            </div>
        </div>
    </div>
</template>

<script>
import PostService from "@/PostService.js";
export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: null,
      text: ""
    };
  },
  async created() {
    try {
      const posts = await PostService.getPosts();
      this.posts = posts;
    } catch (error) {
      console.log(error);
      this.error = error.response.statusText;
      console.log(this.error);
    }
  },
  methods: {
    async createPost() {
      try {
        await PostService.createPost(this.text);
        this.text = "";
        this.posts = await PostService.getPosts();
      } catch (ex) {
        this.error = `Unable to create the post : ${ex}`;
      }
    },
    async deletePost(id) {
      try {
        await PostService.deletePost(id);
        this.posts = await PostService.getPosts();
      } catch (ex) {
        this.error = `Unable to delete the post : ${ex}`;
      }
    }
  }
};
</script>


<style scoped>
</style>
