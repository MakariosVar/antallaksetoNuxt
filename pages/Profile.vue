<template>
  <div class="container mt-4" :key="profile.id">
    <div v-if="!Loaded" class="d-flex justify-content-center">
      <PreLoader></PreLoader>
    </div>
    <div v-else class="row">
      <div class="col-md-4">
        <ProfileInfo :profile="profile" :profileUser="profileUser" :user="user" :isMine="isMine" @updateProfileImage="updateProfileImage" />
        <div v-if="user && user.id !== profile.user_id" class="card text-center my-2">
          <div class="card-body">
            <h1>Αφήστε Σχόλιο</h1>
            <form @submit.prevent="addComment" id="Comment">
              <div class="form-group">
                <input
                  v-model="commentInput"
                  id="comment"
                  type="text"
                  class="form-control"
                  name="comment"
                  autocomplete="comment"
                  autofocus
                >
                <span class="invalid-feedback" role="alert">
                  <strong>{{ message }}</strong>
                </span>
                <div class="mt-3">
                  <button type="submit" class="btn btn-dark">Εκχώρηση</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ProfileDescription :profileUser="profileUser" :profile="profile" :isMine="isMine" :user="user"/>
    </div>
    <div v-for="comment in comments" :key="comment.id" class="card mb-3 text-center">
        <nuxt-link :to="'/profile?id=' + comment.user_id"><h3 class="blue">{{ comment.commentersname }}</h3></nuxt-link>
        <p>
          <span>{{ comment.comment }}</span>
        </p>
        <span style="font-size:13px;">{{ comment.date }}</span>
        <form @submit.prevent="deletecomment(comment.id)" v-if="user">
          <button v-if="user.id === comment.user_id" type="submit" class="btn btn-link">Delete</button>
        </form>
      </div>
    <div class="mt-4 text-center">
      <h1><strong>Αγγελίες</strong></h1>
      <hr>
    </div>
    <div v-if="posts.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
      <div v-for="post in filteredPosts" :key="post.id" class="col mb-4">
        <div class="card">
          <nuxt-link :to="`posts/view?id=${post.id}`">
            <img :src="`${config.public.storageUrl}/${post.image0}`" class="card-img-top" alt="Post Image">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p v-if="!(post.verified === 1)" class="card-text text-danger">ΠΡΟΣ ΕΓΚΡΙΣΗ</p>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="col mb-4">
        <div class="card">
          <nuxt-link to="/p/create">
            <img :src="`${config.public.storageUrl}/profile/default.png`" class="card-img-top" alt="Default Post Image">
            <div class="card-body">
              <h5 class="card-title">Προσθήκη Νέας Αγγελίας</h5>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <h3>Καμία αγγελία.</h3>
      <div v-if="user && user.id === profile.user_id">
        <nuxt-link to="/p/create">Δημιουργήστε την πρώτη σας αγγελία.</nuxt-link>
      </div>
    </div>
    <div v-if="comments.length > 0">
      <div class="mt-4 text-center">
        <h1><strong>Σχόλια</strong></h1>
        <hr>
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    props: [ 'user'],
    data() {
      return {
        commentInput: '',
        profile: {},
        profileUser: {},
        comments: {}, 
        posts: {},
        Loaded: false,
      }
    },
    setup () {
			const config = useRuntimeConfig();
      return { config }
    },
    methods:{
      async deletecomment(id) {
        try {
          const response = await fetch(`${this.config.public.apiUrl}/deletecomment/${id}`, {
            method: 'POST',
          });
          const data = await response.json();
          if (data.status === 'success') {
            this.getComments();
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      },
      async getProfileData() {
        try {
          const response = await fetch(`${this.config.public.apiUrl}/vue/profile/${this.$route.query.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (data.status === 'success') {
            this.profile = data.profile[0];
            this.profileUser = data.profileUser;

            if (this.profile.image === null) {
              this.profile.image = '/profile/default.png';
            }
            this.Loaded = true;
          }
        } catch (error) {
          this.$router.push('/home');
        }
      },
      async getComments() {
        try {
          const response = await fetch(`${this.config.public.apiUrl}/vue/getcomments/${this.$route.query.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (data.status === 'success') {
            this.comments = data.comments;
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      },
      async getPosts() {
        if (this.profileUser) {
          try {
            const response = await fetch(`${this.config.public.apiUrl}/vue/myposts/${this.$route.query.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const data = await response.json();

            if (data.status === 'success') {
              this.posts = data.posts;
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        }
      },
      async addComment() {
        if (this.commentInput != '') {  
          try {

          const response = await fetch(`${this.config.public.apiUrl}/c/store`, {
            method: 'POST',
            body: new URLSearchParams({
              comment: this.commentInput,
              user_id: this.user.id,
              profile_id: this.profile.id
            })
          });

            const data = await response.json();
            if (data.status === 'success') {
              this.getComments();
            } else {
              alert('Προσπαθήστε ξανά');
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        }
      },
      followclick(){
        if(!(this.profile.follows))
        {
          this.profile.follows = true;
          this.profile.followersCount += 1;
        } else {
          this.profile.follows = false;
          this.profile.followersCount -= 1; 
        } 
      },
      updateProfileImage (event) {
        this.profile.image = event
      }
    },
    computed: {
      isMine() {
        return this.user.id == this.profileUser.id;
      },
      filteredPosts() {
        return this.posts.filter(post => {
          return this.user && (this.user.id === post.user_id || post.verified === 1);
        });
      },
    },
    created(){
    // Watch for changes in the route query's "id"
      this.$watch(
      () => this.$route.query.id,
        (newId, oldId) => {
          if (newId !== oldId) {
            if (newId) {
              // Route query "id" has changed, fetch new data
              this.getProfileData();
              this.getPosts();
              this.getComments();
            }
          }
        }
      );

      // Initial data fetch
      this.getProfileData();
      this.getPosts();
      this.getComments();
    }
  }
</script>