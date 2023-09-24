<template>
  <div>
    <ClientOnly>
      <span v-if="!updating" class="d-flex flex-column" style="min-height: 100vh;">
        <LayoutHeaderVue :loggedin="loggedin" :user="user" />
        <router-view 
          @userLogged="setUser($event)"
          @sessionExpired="sessionExpired"
          :loggedin="loggedin"
          :user="user"
          :key="$route.params.id"
        />
        <span class="mt-auto">
          <LayoutFooterVue />
        </span>
      </span>
      <span v-else class="d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </span>
    </ClientOnly>
  </div>
</template>
<script>
  export default defineNuxtComponent({
    head: {
      title: 'Ανταλλαξέ το',
    },
    methods: {
      sessionExpired () {
        this.user = null;
        this.loggedin = 0;
        if (process.client) {
          localStorage.clear();
          location.replace('/Login?reAutheticate=1');
        }
      }
    },
    setup() {
      const config = useRuntimeConfig();
      const updating = ref(true);
      const user = ref(null);
      const loggedin = ref(0);

      const setUser = (newUser) => {
        if (newUser) {
          loggedin.value = 1;
          if (process.client) {
            localStorage.setItem('user', JSON.stringify(newUser));
          }
        }
      };
      const asyncData = async () => {
        try {
          if (process.client) {
            var storageUser = localStorage.getItem('user');

            if (storageUser && storageUser !== 'null') {
              storageUser = JSON.parse(storageUser);
              const config = useRuntimeConfig();
              const response = await $fetch(`${config.public.apiUrl}/vue/getuser/${storageUser.auth_token}`);
              if (response.status === 'success') {
                if (process.client) {
                  localStorage.setItem('user', JSON.stringify(response.user));
                }
                user.value = response.user;
                loggedin.value = 1;
                updating.value = false;
              } else if (response.expired) {
                user.value = null;
                loggedin.value = 0;
                updating.value = false;
              }
            } else {
              user.value = null;
              loggedin.value = 0;
              updating.value = false;
            }
          }
        } catch (error) {
          console.error('API request error:', error);
        }
        
      };

      asyncData();

      return {
        updating,
        user,
        loggedin,
        setUser,
      };
    },
    created() {
      if (process.client) {
        window.scrollTo(0, 0);
      }
    }
  });
</script>