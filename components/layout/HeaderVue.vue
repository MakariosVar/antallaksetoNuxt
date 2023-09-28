<template>
  <div>
  <nav class="navbar navbar-expand-md navbar-light border bg-light px-5">

    <nuxt-link to="/home" class="navbar-brand" title="Αρχική">
      <img style="max-height: 70px;" src="~assets/images/NewLogoPNG.png" alt="Logo">
    </nuxt-link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-collapse" aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="nav-collapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <nuxt-link to="/posts/" class="nav-link">
            <span class="text-dark">Αγγελίες</span>
          </nuxt-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="about-dropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <em class="text-dark">Σχετικά με εμάς</em>
          </a>
          <div class="dropdown-menu" aria-labelledby="about-dropdown">
            <nuxt-link to="/info" class="dropdown-item">
              <span class="text-dark">Πληροφορίες</span>
            </nuxt-link>
            <nuxt-link to="/contact" class="dropdown-item">
              <span class="text-dark">Επικοινωνία</span>
            </nuxt-link>
          </div>
        </li>
      </ul>
      <!-- Right-aligned nav items -->
      <ul class="navbar-nav ms-auto">
        <li class="nav-item" v-if="!isPostPage">
          <form class="form-inline my-2 my-lg-0" @submit.prevent="handleSubmit">
            <input v-model="searchInputValue" class="form-control mr-sm-2" type="search" placeholder="Αναζήτηση..." aria-label="Search">
          </form>
        </li>

        <li class="nav-item dropdown" v-if="user && (user.role_id == 1 || user.role_id == 3)">
          <a class="nav-link dropdown-toggle" href="#" id="admin-dropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <font-awesome-icon icon="fa fa-gear" size="2x" />
          </a>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="admin-dropdown">
            <a :href="`${config.public.backendBasePath}/admin`" target="_blank" class="dropdown-item">
              <span class="text-dark">Admin panel</span>
            </a>
            <nuxt-link :to="{path: '/posts/verification'}" class="dropdown-item">
              <span class="text-dark">Εξέταση Αγγελιών ({{ pending }})</span>
            </nuxt-link>
            <nuxt-link to="/messages" class="dropdown-item">
              <span class="text-dark">Μηνύματα ({{ unreadMessages }})</span>
            </nuxt-link>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="user-dropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span v-if="profileImage">
              <img style="max-width: 35px;" :src="`${config.public.storageUrl}/${profileImage}`" alt="User" class="rounded-circle" />
            </span>
            <span v-else>
            <font-awesome-icon icon="fa-solid fa-circle-user"  size="2x"/>
            </span>
          </a>
          <div v-if="user" class="dropdown-menu dropdown-menu-end" aria-labelledby="user-dropdown">
            <nuxt-link :to="{name: 'Profile', query: {id: user.id}}" class="dropdown-item">
              <span class="text-dark">Προφίλ / {{ user.name }}</span>
            </nuxt-link>
            <nuxt-link to="/posts/create" class="dropdown-item">
              <span class="text-dark">Προσθήκη Αγγελίας</span>
            </nuxt-link>
            <nuxt-link :to="{path: '/posts/mine', query: {id: user.id}}" class="dropdown-item">
              <span class="text-dark">Οι Αγγελίες μου</span>
            </nuxt-link>
            <a class="dropdown-item" @click="logout">Αποσύνδεση</a>
          </div>
          <div v-else class="dropdown-menu dropdown-menu-end"  aria-labelledby="user-dropdown">
            <nuxt-link to="/login" class="dropdown-item">
              <span class="text-dark">Σύνδεση</span>
            </nuxt-link>
            <nuxt-link to="/register" class="dropdown-item">Εγγραφή</nuxt-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container-fluid" v-if="user && user.verification_token">
    <div class="row">
      <div class="col-12 bg-warning text-center text-muted">
        Έχει σταλεί ένα email στη διεύθυνση που παραχωρήσατε, 
        προκειμένου να επαληθευτεί η διεύθυνση email και να ενεργοποιηθεί ο λογαριασμός σας.
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    props: ['loggedin', 'user'],

    data(){
      return{
          pending:0,
          unreadMessages: 0,
          searchInputValue: '',
      }
    },
    setup() {
      const config = useRuntimeConfig();
      return {
        config
      }
    },
    methods: {
      toAdminPanel () {
        window.location.replace('/admin')
      },
      handleSubmit() {
        // Change the router's view programmatically
        this.$router.push({ path: '/posts/' , query: { search: this.searchInputValue } });
      },
      async logout() {
        const response = await fetch(`${this.config.public.apiUrl}/vuelogout`, {
          method: 'GET',
        })
        const data = await response.json();
        if (data.status == 'success' && process.client) {
          localStorage.setItem('user', null)
          location.replace('/home');
        }
      },
      async getPendingPosts(){ 
          const response = await fetch(`${this.config.public.apiUrl}/vue/toverificate/${this.user.auth_token}`);
          const data = await response.json()
          console.log(data)
          this.pending = data.length ?? 0;
          
      },
      async getUnreadMessages(){ 
          const response = await fetch(`${this.config.public.apiUrl}/vue/unreadmessages/${this.user.auth_token}`);
          const data = await response.json()
          this.unreadMessages = data.totalUnreadMessages ?? 0;
      },
    },
    created (){
      if (this.user && this.user.role_id == 1) { 
        // Call the method initially
        this.getUnreadMessages();
        this.getPendingPosts();

        // Use setInterval to call the method every 1 minute (60,000 milliseconds)
        this.intervalId = setInterval(() => {
          this.getUnreadMessages();
          this.getPendingPosts();
        }, 60000);
      }
    },
    computed:{
      profileImage() {
        return (this.user && this.user.profile_image) ? this.user.profile_image : false;
      },
      isPostPage() {
        return this.$route.path === '/p';
      }, 
    }
  }
</script>

<style scoped>
  .logo-img {
    max-height: 50px;
  }

  .v-tabs-bar .right-alignment {
    float: right !important;
  }

  .v-tabs-bar .left-alignment {
    float: left !important;
  }

  .active-tab {
    background-color: rgba(0, 0, 0, 0.1); /* Change this to your desired background color */
    cursor: pointer;
  }

  v-tab {
    text-transform: none !important;
  }
</style>
