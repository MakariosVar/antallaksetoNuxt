<template>
  <div>
    <ClientOnly>
        <LayoutHeaderVue :loggedin="loggedin" :user="user" />
        <router-view @userLogged="getUser($event)" :loggedin="loggedin" :user="user" :key="$route.params.id" />
        <LayoutFooterVue />
    </ClientOnly>
  </div>
</template>
<style>

/* If the screen size is 1200px wide or more, set the font-size to 80px */
  @media (min-width: 1200px) {
    .responsive-font {
      font-size: 30x;
    }
  }
/* If the screen size is smaller than 1200px, set the font-size to 80px */
  @media (max-width: 1199.98px) {
    .responsive-font {
      font-size: 13px;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        loggedin: 0,
        user:  null,
      }
    },
    methods: {
      getUser(User)
      {
        this.user = User
        this.loggedin = 1
        if(process.client) {
          localStorage.setItem('user', JSON.stringify(User))
        }
      },
            
    },
    created(){
      this.loggedin =  0;
      if(process.client) {
          var storageUser = localStorage.getItem('user');
        if (storageUser && storageUser != 'null') {
          this.user = JSON.parse(storageUser)
          this.loggedin =  1;
        }
        // console.log(this.user)
        window.scrollTo(0, 0);
      }
    }
  }
</script>