<template>
    <div>
        <span class="d-flex flex-column bg-light" style="min-height: 100vh;">
            <LayoutHeaderVue :loggedin="loggedin" :user="user" class="sticky-top" />
            <LayoutBaseLoader :loaded="loaded" v-if="!loaded"/>
            <NuxtPage @userLogged="setUser($event)" @sessionExpired="sessionExpired" :loggedin="loggedin" :user="user"
                :key="$route.params.id" :loaded="loaded" />
            <span class="mt-auto">
                <LayoutFooterVue />
            </span>
        </span>
    </div>
</template>
<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
</style>
<script>
export default defineNuxtComponent({
    methods: {
        sessionExpired() {
            this.user = null;
            this.loggedin = 0;
            if (process.client) {
                localStorage.clear();
                this.$router.push('/Login?reAutheticate=1');
            }
        }
    },
    async setup() {
        const config = useRuntimeConfig();
        const user = ref(null);
        const loaded = ref(false);
        const loggedin = ref(0);

        const setUser = (newUser) => {
            if (newUser) {
                loggedin.value = 1;
                user.value = newUser
                if (process.client) {
                    localStorage.setItem('user', JSON.stringify(newUser));
                }
            }
        };
        useHead( {
            titleTemplate: ( titleChunk ) => {
                return titleChunk ? `${ titleChunk } - Αντάλλαξέ Το` : 'Αντάλλαξέ Το'
            },
        });

        useSeoMeta({
            ogImage: 'https://antallakseto.gr/default.png',
            ogTitle: 'Αντάλλαξέ Το',
            description: 'Antallakseto.gr - Νο1 site για ανταλλαγές',
            ogDescription: 'Antallakseto.gr - Νο1 site για ανταλλαγές'
        })

        const asyncData = async () => {
            try {
                loaded.value = false;
                if (process.client) {
                    var storageUser = localStorage.getItem('user');

                    if (storageUser && storageUser !== 'null') {
                        storageUser = JSON.parse(storageUser);
                        const response = await $fetch(`/api/getUser?auth_token=${storageUser.auth_token}`);

                        if (response && response.userData && response.userData.status === 'success') {
                            if (process.client) {
                                localStorage.setItem('user', JSON.stringify(response.userData.user));
                            }
                            user.value = response.userData.user;
                            loggedin.value = 1;
                        } else if (response && response.userData && response.userData.expired) {
                            user.value = null;
                            loggedin.value = 0;
                        } else {
                            user.value = null;
                            loggedin.value = 0;
                        }
                    } else {
                        user.value = null;
                        loggedin.value = 0;
                    }
                    loaded.value = true;
                }
            } catch (error) {
                loaded.value = true;

                console.error('API request error:', error);
            }

        };
        useHead({ script: { src: "https://www.googletagmanager.com/gtag/js?id=G-H6SJD5S37R", async: true }, });


        const nuxtApp = useNuxtApp()

        nuxtApp.hook("page:finish", () => {
            window.scrollTo(0, 0)
        })

        const googleApiKey = config.public.googleApiKey;
        onMounted(() => {
            if (process.client) {
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", "G-H6SJD5S37R");
            }
        });

        await asyncData();

        return {
            user,
            loggedin,
            loaded,
            setUser,
        };
    },
    watch: {
        $route() {
            if (process.client) {
                const collapseNav = document.getElementById('nav-collapse');
                if (collapseNav && collapseNav.classList.contains('show')) {
                    collapseNav.classList.remove('show');
                }
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 500);
            }
        },
    },
});
</script>