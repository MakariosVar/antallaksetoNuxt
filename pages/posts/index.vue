<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-3">
        <div class="d-flex flex-column align-items-center border bg-light mx-5 p-2">
          <h3>Αναζήτηση</h3>
          <form @submit.prevent="getPosts" style="width: 70%;">
            <div class="mb-3">
              <input v-model="searchTitle" class="form-control form-control-lg" type="text" placeholder="Ψάχνω για..">
            </div>
            <div class="mb-3">
              <select v-model="searchCategory" @change="getPosts" id="category" class="form-select form-select-sm" name="category">
                <option value="all">Όλες οι Κατηγορίες</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.title"
                >
                  {{ category.title + '(' + category.count + ')' }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Αναζήτηση</button>
          </form>
        </div>
      </div>
    </div>
    <div v-if="!Loaded">
      <PreLoader></PreLoader>
    </div>
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <nuxt-link v-for="post in ListResult" :key="post.id" :to="{ path: '/posts/view', query: { id: post.id } }" class="col post">
        <div class="card h-100">
          <img :src="`${$config.public.storageUrl}/${post.image0}`" class="card-img-top" style="height: 300px;" alt="Post Image">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">Περιοχή: {{ `${post.fullAddress.locality}, ${post.fullAddress.country}` }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        posts: {
          data: [], // Initialize with an empty array
          current_page: 1,
          last_page: 1,
        },
        loadingMorePosts: false,
        categories: {},
        searchTitle: '',
        searchCategory: 'all',
        Loaded: false,
        page: 1,
      };
    },
    setup () {
      const config = useRuntimeConfig();
        return { config }
    },
    methods: {
      async loadMorePosts(e) {
        e.stopPropagation();
        e.preventDefault();

        // Check if a loading operation is already in progress
        if (this.loadingMorePosts) {
          return;
        }

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Check if the user has scrolled to the bottom
        if (scrollY + windowHeight >= documentHeight - 100) {
          // Set the loading flag to true to prevent concurrent requests
          this.loadingMorePosts = true;

          // Increment the page number
          this.page++;

          // Call a method to fetch more posts
          await this.fetchMorePosts();

          // Reset the loading flag when the request is complete
          this.loadingMorePosts = false;
        }
      },
      // Method to fetch more posts based on the current page
      async fetchMorePosts() {
        try {
          const response = await fetch(`${this.config.public.apiUrl}/vue/posts?page=${this.page}&category=${this.searchCategory}&q=${this.searchTitle}`);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
          const data = await response.json();
          // Append the new posts to the existing posts array
          this.posts.data = [...this.posts.data, ...data.data]; // Update only the 'data' property of 'this.posts'
          this.posts.current_page = data.current_page;
          this.posts.last_page = data.last_page;
        } catch (error) {
          console.error(error);
        }
      },
      async getPosts() {
        try {
          const response = await fetch(`${this.config.public.apiUrl}/vue/posts?category=${this.searchCategory}&q=${this.searchTitle}`);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
          const data = await response.json();
          this.posts = data;
          this.Loaded = true;
        } catch (error) {
          console.error(error);
        }
      },
      async getCategories() {
        try {
          const response = await fetch(`${this.config.public.apiUrl}/vue/categories`);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
          }
          const data = await response.json();
          this.categories = data;
        } catch (error) {
          console.error(error);
        }
      },
      queryCaught() {
        if (this.$route.query.category) {
          this.searchCategory = this.$route.query.category;
        }
        if (this.$route.query.search) {
          this.searchTitle = this.$route.query.search;
        }
      },
    },
    computed: {
      ListResult() {
        return this.posts.data;
      },
    },
    created() {
      this.getCategories();
      this.queryCaught();
      this.getPosts();
      // Add a scroll event listener
      window.addEventListener('scroll', this.loadMorePosts);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.loadMorePosts);
    },
  };
</script>
