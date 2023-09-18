<template>
  <div class="row">
    <div class="col-12 py-3">
      <div class="d-flex flex-column align-items-center border bg-light mx-5 p-2">
        <h3>Αναζήτηση</h3>
        <b-form @submit.prevent="getPosts()" style="width: 70%;" >
          <b-form-input v-model="searchTitle" size="lg" style="width: 100%;" class="mr-sm-2" placeholder="Ψάχνω για.."></b-form-input>
        </b-form>
        <b-form-select v-model="searchCategory" id="category" size="sm" name="category" style="width: 70%;" class="mt-2">
          <option value="all">Όλες οι Κατηγορίες</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.title"
          >
            {{ category.title + '(' + category.count + ')' }}
          </option>
        </b-form-select>
      </div>
    </div>
    <div v-if="!(Loaded)">
        <PreLoader></PreLoader>  
    </div> 
    <div v-else class="m-5">
      <div v-if="!(ListResult[0])" class="text-center">
        <h2> Καμία Αγγελία</h2>
        <h3>Δοκιμάστε άλλες λέξεις-κλειδία ή Κατηγορία</h3>
      </div>
      <div v-else class="row">
        <router-link v-for="post in ListResult" :key="post.id" :to="'/p/'+post.id" class="col-lg-3 col-md-4 col-sm-12 post">
          <figure class="post-image">
            <img :src="`/storage/${post.image0}`">
          </figure>
          <span class="post-overlay ">
            <div class="d-inline-block">
              <h5>	
                <span style="color:white; ">{{ post.title}}</span>	
              </h5>
              <p>
                <span style="color:white; ">Περιοχή : </span>
                <span style="color:white; font-size:13px;">{{ post.adlocation}}</span>
              </p>
            </div>
          </span>
        </router-link>
      </div>
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
            page: 1
        }
      },
      methods:{
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
          await axios.get(`/api/vue/posts?page=${this.page}&q=${this.searchTitle}`).then((response) => {
            // Append the new posts to the existing posts array
            this.posts.data = [...this.posts.data, ...response.data.data]; // Update only the 'data' property of 'this.posts'
            this.posts.current_page = response.data.current_page;
            this.posts.last_page = response.data.last_page;
          });
        },
        getPosts() {
          axios.get('/api/vue/posts', {
            params: {
              page: this.posts.current_page, // Pass the current page to the backend
              q: this.searchTitle, // Pass the search query to the backend
            },
          }).then((response) => {
            this.posts = response.data;
            this.Loaded = true;
          });
        },
        getCategories(){
          axios.get('/api/vue/categories').then((response) => {
            this.categories = response.data
          });
        },
        queryCaught(){
          if(this.$route.query.category){
            this.searchCategory = this.$route.query.category;
          }
          if(this.$route.query.search){
            this.searchTitle = this.$route.query.search;
          }
        }
       },
       computed:{
          ListResult(){ 
              return this.posts.data;
          }
        },
        created(){
          this.getCategories();
          this.getPosts(); 
          this.queryCaught();
          // Add a scroll event listener
          window.addEventListener('scroll', this.loadMorePosts);
        },
        beforeDestroy() {
          window.removeEventListener('scroll', this.loadMorePosts);
        },
      }

 

</script>
