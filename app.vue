<template>
  <div>
    <span class="d-flex flex-column" style="min-height: 100vh;">
      <LayoutHeaderVue :loggedin="loggedin" :user="user" />
      <NuxtPage 
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
          this.$router.push('/Login?reAutheticate=1');
        }
      }
    },
    setup() {
      const config = useRuntimeConfig();
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
              const response = await $fetch(`/api/getUser?auth_token=${storageUser.auth_token}`);

              if (response.userData.status === 'success') {
                if (process.client) {
                  localStorage.setItem('user', JSON.stringify(response.userData.user));
                }
                user.value = response.userData.user;
                loggedin.value = 1;
              } else if (response.userData.expired) {
                user.value = null;
                loggedin.value = 0;
              }
            } else {
              user.value = null;
              loggedin.value = 0;
            }
          }
        } catch (error) {
          console.error('API request error:', error);
        }
        
      };

      const googleApiKey = config.public.googleApiKey;
      onMounted(() => {
          // Check if the Google Maps API script is loaded
          if (typeof google === 'undefined') {
              // Wait for it to load
              const script = document.createElement('script');
              script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
              script.async = true;
              script.defer = true;
              script.onload = () => {
                  // Google Maps API script is now loaded, initialize the autocomplete component
                  // this.initializeAutocomplete();
              };
              if (process.client) {
                  document.head.appendChild(script);
              }
          } else {
              // Google Maps API is already loaded, initialize the autocomplete component
              // this.initializeAutocomplete();
          }
      });

      asyncData();

      return {
        user,
        loggedin,
        setUser,
      };
    },
    watch: {
      $route() {
        if (process.client) {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 500);
        }
      },
    },
  });
</script>