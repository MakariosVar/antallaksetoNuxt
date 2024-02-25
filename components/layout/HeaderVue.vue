<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light border bg-navbar px-5 shadow-sm bg-body">

            <nuxt-link to="/home" class="navbar-brand" title="Αρχική">
                <img style="max-height: 70px;" src="~assets/images/NewLogoPNG.png" alt="Logo">
            </nuxt-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-collapse"
                aria-controls="nav-collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="nav-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item d-flex align-items-center justify-content-center">
                        <nuxt-link to="/posts/" class="nav-link">
                            <span class="text-dark">Αγγελίες</span>
                        </nuxt-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link d-flex align-items-center justify-content-center dropdown-toggle" href="#" id="about-dropdown" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <li class="nav-item d-flex align-items-center justify-content-center me-2" v-if="!isPostPage">
                        <form class="form-inline my-2 my-lg-0" @submit.prevent="handleSubmit">
                            <input v-model="headerSearchInputValue" class="form-control mr-sm-2 d-sm-none d-lg-block "
                                type="search" placeholder="Αναζήτηση..." aria-label="Search">
                        </form>
                    </li>

                    <li class="nav-item dropdown" v-if="user && (user.role_id == 1 || user.role_id == 3)">
                        <a class="nav-link d-flex align-items-center justify-content-center dropdown-toggle " href="#" id="admin-dropdown" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <ClientOnly>
                                <font-awesome-icon icon="fa fa-gear"/>
                            </ClientOnly>
                            <span v-if="user.role_id == 1" class="ml-1">
                                Admin
                            </span>
                            <span v-else-if="user.role_id == 3" class="ml-1">
                                Moderator
                            </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="admin-dropdown">
                            <a v-if="user.role_id == 1" :href="`${backendBasePath}/admin`" target="_blank"
                                class="dropdown-item">
                                <span class="text-dark">Admin panel</span>
                            </a>
                            <nuxt-link :to="{ path: '/posts/verification' }" class="dropdown-item">
                                <span class="text-dark">Εξέταση Αγγελιών ({{ pending }})</span>
                            </nuxt-link>
                            <nuxt-link to="/messages" class="dropdown-item">
                                <span class="text-dark">Μηνύματα ({{ unreadMessages }})</span>
                            </nuxt-link>
                            <nuxt-link to="/reports" class="dropdown-item">
                                <span class="text-dark">Αναφορές</span>
                            </nuxt-link>
                        </div>
                    </li>

                    <li v-if="user" class="nav-item dropdown">
                        <a class="nav-link  dropdown-toggle d-flex align-items-center justify-content-center gap-1" href="#" id="user-dropdown"
                            role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span v-if="profileImage.length">
                                <img style="max-width: 35px;" :src="profileImage" alt="User" class="rounded-circle" />
                            </span>
                            <span class="ml-1">
                                {{ user.name }}
                            </span>
                           
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="user-dropdown">
                            <nuxt-link :to="{ name: 'Profile', query: { id: user.id } }" class="dropdown-item">
                                <span class="text-dark">Προφίλ / {{ user.name }}</span>
                            </nuxt-link>
                            <nuxt-link to="/posts/create" class="dropdown-item">
                                <span class="text-dark">Προσθήκη Αγγελίας</span>
                            </nuxt-link>
                            <nuxt-link :to="{ path: '/posts/mine', query: { id: user.id } }" class="dropdown-item">
                                <span class="text-dark">Οι Αγγελίες μου</span>
                            </nuxt-link>
                            <a class="dropdown-item" @click="logout">Αποσύνδεση</a>
                        </div>
                    </li>
                    <li class="nav-item" v-else>
                        <div class="d-flex flex-column align-items-center justify-content-center">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-lg-6 d-flex justify-content-center justify-content-lg-start">
                                    <NuxtLink to="/login" class="btn btn-outline-dark">
                                        <span>
                                            <ClientOnly>
                                                <font-awesome-icon icon="fa-solid fa-circle-user" class="mr-2" />
                                            </ClientOnly>
                                            <span class="ms-1 font-semibold">Σύνδεση</span>
                                        </span>
                                    </NuxtLink>
                                </div>
                                <div class="col-lg-6 mt-lg-0 mt-1 d-flex justify-content-center justify-content-lg-start">
                                    <NuxtLink to="/register" class="btn btn-sm btn-outline-secondary">
                                        <span class="font-semibold">Εγγραφή</span>
                                    </NuxtLink>
                                </div>
                            </div>
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

    data() {
        return {
            pending: 0,
            unreadMessages: 0,
            profileImage: '',
        }
    },
    setup() {
        const config = useRuntimeConfig();
        const headerSearchInputValue = ref('')
        const backendBasePath = 'https://b.antallakseto.gr'
        return {
            headerSearchInputValue,
            backendBasePath,
            config
        }
    },
    methods: {
        toAdminPanel() {
            window.location.replace('/admin')
        },
        handleSubmit() {
            // Change the router's view programmatically
            this.$router.push({ path: '/posts', query: { search: this.headerSearchInputValue } });
            this.headerSearchInputValue = ""
        },
        async logout() {
            if (process.client) {
                localStorage.setItem('user', null)
                location.replace('/home');
            }
        },
        async getPendingPosts() {
            let response = await $fetch(`/api/postsToVerificate?token=${this.user.auth_token}`);
            this.pending = response.post ? response.post.length : 0;
        },
        async getUnreadMessages() {
            let response = await $fetch(`/api/unreadMessages?token=${this.user.auth_token}`);
            this.unreadMessages = response.totalUnreadMessages ?? 0;
        },
        async fetchProfileImage() {
            if (this.user && this.user.profile_image) {
                try {
                    const response = await $fetch(`/api/image?image=${this.user.profile_image}`);
                    const imageRes = response.imageRes;

                    if (imageRes) {
                        this.profileImage = `data:image/jpeg;base64,${imageRes}`;
                    }
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        }
    },
    mounted() {
        this.fetchProfileImage();
        if (this.user && this.user.role_id != 2) {
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
    computed: {
        isPostPage() {
            return this.$route.path === '/posts';
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
    background-color: rgba(0, 0, 0, 0.1);
    /* Change this to your desired background color */
    cursor: pointer;
}

.bg-navbar {
    background-color: rgba(250, 250, 250, 0.97);
}

v-tab {
    text-transform: none !important;
}

.nav-item {
    list-style: none;
}

.btn {
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    text-decoration: none;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(107, 107, 107, 0.1);
}

.btn-outline-dark {
    color: #333;
    border: 1.5px solid #333;
}

.btn-outline-dark:hover {
    color: #fff;
    background-color: #333;
}

.btn span {
    display: flex;
    align-items: center;
}

.font-awesome-icon {
    font-size: 1.2rem;
}

.font-semibold {
    font-weight: 600;
}
</style>
