<template>
    <div v-if="!profileUser">
        <div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 300px;">
            <div class="spinner-grow" style="color: #e4e3e3; width: 150px; height: 150px;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <div v-else class="container mt-4" :key="profile.id">
        <div class="row">
            <div class="col-md-4">
                <ProfileInfo v-if="profile && profileUser" :profile="profile" :profileUser="profileUser" :user="user"
                    :isMine="isMine" @sessionExpired="sessionExpired" @updateProfileImage="updateProfileImage"
                    @followClick="followClick" :profileImage="profileAvatar" />
                <div v-if="user && user.id !== profile.user_id" class="card text-center my-2">
                    <div class="card-body">
                        <h1>Αφήστε Σχόλιο</h1>
                        <form @submit.prevent="addComment" id="Comment">
                            <div class="form-group">
                                <input v-model="commentInput" id="comment" type="text" class="form-control" name="comment"
                                    autocomplete="comment" autofocus>
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ message }}</strong>
                                </span>
                                <div class="mt-3">
                                    <button type="submit" class="btn btn-dark">Εκχώρηση</button>
                                </div>
                            </div>
                        </form>
                        <div v-if="commentExists" class="alert alert-warning d-flex align-items-center" role="alert">
                            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="me-2" size="2x" />
                            <div>
                                Μπορείτε να αφήσετε ένα σχόλιο σε κάθε προφίλ.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileDescription v-if="profile && profileUser" @sessionExpired="sessionExpired" :profileUser="profileUser"
                :profile="profile" :isMine="isMine" :user="user" />
        </div>
        <div v-if="comments && comments.length" class="mt-4 text-center">
            <h1><strong>Σχόλια</strong></h1>
            <hr>
        </div>
        <div v-for="comment in comments" :key="comment.id" class="card mb-3 text-center">
            <nuxt-link :to="'/profile?id=' + comment.user_id">
                <h3 class="blue">{{ comment.commentersname }}</h3>
            </nuxt-link>
            <p>
                <span>{{ comment.comment }}</span>
            </p>
            <span style="font-size:13px;">{{ comment.date }}</span>
            <form @submit.prevent="deletecomment(comment.id)" v-if="user">
                <button v-if="user.id === comment.user_id || user.id === profile.user_id" type="submit"
                    class="btn btn-link">Delete</button>
            </form>
        </div>
        <div class="mt-4 text-center">
            <h1><strong>Αγγελίες</strong></h1>
            <hr>
        </div>
        <div v-if="posts.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <div v-for="post in sortedFilteredPosts" :key="post.id" class="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div class="card h-100">
                    <nuxt-link :to="`/posts/view?id=${post.id}`">
                        <img v-if="post.imageURL" :src="post.imageURL" class="card-img-top" style="height: 300px;"
                            alt="Post Image">
                        <div v-else class="d-flex justify-content-center align-items-center"
                            style="width: 100%; height: 300px;">
                            <div class="spinner-grow" style="color: #e4e3e3; width: 150px; height: 150px;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-black">{{ post.title }}</h5>
                            <span v-if="post.done" class="card-text badge bg-success">ΟΛΟΚΛΗΡΩΜΕΝΗ</span>
                            <p v-if="!(post.verified === 1)" class="card-text text-danger">ΠΡΟΣ ΕΓΚΡΙΣΗ</p>
                        </div>
                    </nuxt-link>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4" v-if="user && user.id === profileUser.id">
                <div class="card h-100">
                    <nuxt-link to="/posts/create">
                        <img src="~assets/images/default.png" class="card-img-top" alt="Default Post Image">
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
                <nuxt-link to="/posts/create">Δημιουργήστε την πρώτη σας αγγελία.</nuxt-link>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    props: ['user'],
    data() {
        return {
            commentExists: false,
            commentInput: '',
            profile: {},
            profileUser: null,
            profileAvatar: false,
            comments: {},
            posts: [],
            Loaded: false,
        }
    },
    setup() {
        const config = useRuntimeConfig();
        return { config }
    },
    methods: {
        sessionExpired() {
            this.$emit('sessionExpired', true);
        },
        async deletecomment(id) {
            try {
                const response = await $fetch(`/api/deleteComment?id=${id}`);

                if (response && response.deleteResponse) {
                    const data = response.deleteResponse
                    if (data.status === 'success') {
                        this.getComments();
                    }
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        },
        async getProfileData() {
            let token = (this.user && this.user.auth_token) ? this.user.auth_token : '-';
            try {
                const response = await $fetch(`/api/getProfile?id=${this.$route.query.id}&auth_token=${token}`);
                if (response && typeof response === 'undefined' && process.client) {
                    location.replace('/home');
                }

                const data = response.profileResponse;
                if (data.status === 'success') {
                    this.profile = data.profile[0];
                    this.profileUser = data.profileUser;

                    if (this.profile.image === null) {
                        this.profile.image = '/profile/default.png';
                    }
                    this.Loaded = true;
                }
            } catch (error) {
                console.error(error)
            }
        },
        async getComments() {
            try {
                const response = await $fetch(`/api/getComments?id=${this.$route.query.id}`);

                const data = response.commentsResponse;

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
                    const { data: myPostsData } = await useLazyFetch(`/api/myPosts?user_id=${this.profileUser.id}`);
                    const response = myPostsData.value.postsResponse;


                    if (response.status === 'success') {
                        this.posts = response.posts;
                        this.posts.forEach(async (post) => {
                            if (post.image0) {
                                const imageURL = await this.getImage(post.image0);
                                post.imageURL = imageURL
                            }
                        })
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            }
        },
        async addComment() {
            if (this.commentInput != '') {
                try {

                    const response = await $fetch(`/api/addComment?comment=${this.commentInput}&token=${this.user.auth_token}&profile_id=${this.profile.id}`);

                    const data = response.commentsResponse;
                    if (data.status === 'success') {
                        this.commentInput = ''
                        this.commentExists = false
                        this.getComments();
                    } else if (data.expired) {
                        this.sessionExpired();
                    } else if (data.commentExist) {
                        this.commentExists = true
                    } else {
                        alert('Προσπαθήστε ξανά');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            }
        },
        async getImage(path) {
            try {
                const response = await $fetch(`/api/image?image=${path}`);
                const imageRes = response.imageRes;

                if (imageRes) {
                    return `data:image/jpeg;base64,${imageRes}`;
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        },
        async profileImage() {
            if (this.profile.image) {
                this.profileAvatar = await this.getImage(this.profile.image);
            }
        },
        followClick() {
            if (!(this.profile.follows)) {
                this.profile.follows = true;
                this.profile.followersCount += 1;
            } else {
                this.profile.follows = false;
                this.profile.followersCount -= 1;
            }
        },
        async updateProfileImage(event) {
            this.profileAvatar = null;
            this.profileAvatar = await this.getImage(event);
        }
    },
    computed: {
        isMine() {
            return this.user && (this.user.id == this.profileUser.id);
        },
        filteredPosts() {
            if (this.user) {
                return this.posts.filter(post => {
                    return (this.user.id === post.user_id || post.verified === 1);
                });
            } else {
                return this.posts.filter(post => {
                    return post.verified === 1;
                });

            }
        },
        sortedFilteredPosts() {
            if (!this.filteredPosts) {
                return [];
            }

            const unverifiedPosts = this.filteredPosts.filter(post => !post.verified);
            const incompletePosts = this.filteredPosts.filter(post => (typeof post.done === 'undefined' || !post.done) && post.verified);
            const completePosts = this.filteredPosts.filter(post => post.done);

            return unverifiedPosts.concat(incompletePosts, completePosts);
        },
    },
    async created() {
        // Watch for changes in the route query's "id"
        this.$watch(
            () => this.$route.query.id,
            async (newId, oldId) => {
                if (newId !== oldId) {
                    if (newId) {
                        // Route query "id" has changed, fetch new data
                        await this.getProfileData();
                        await this.getPosts();
                        await this.getComments();
                    }
                }
            }
        );

        // Initial data fetch
        await this.getProfileData();
        await this.getPosts();
        await this.getComments();
        await this.profileImage();
    }
}
</script>