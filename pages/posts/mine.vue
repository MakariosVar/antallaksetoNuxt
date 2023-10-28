<template>
    <div>
        <div v-if="!posts" class="pageMinFit text-center">
            <div class="d-flex justify-content-center">
                <img src="~assets/images/NewLogoPNG.svg" class="imageNotFound">
            </div>
            <div style="font-size: 40px;">
                <strong>Δεν έχετε καταχωρήσει αγγελίες ακόμη</strong>
                <br>
                <nuxt-link to="/posts/create" class="btn btn-primary mt-3">Προώθηση Αγγελίας</nuxt-link>
            </div>
        </div>
        <div v-else>
            <div class="mt-3 text-center">
                <h1 class="display-4">Οι Αγγελίες μου</h1>
            </div>
            <div class="mt-3 text-center p-3">
                <nuxt-link to="/posts/create" class="btn btn-primary btn-lg">Προώθηση Αγγελίας</nuxt-link>
            </div>
            <div class="container">
                <div class="row">
                    <nuxt-link v-for="post in sortedPosts" :key="post.id" :to="{ path: '/posts/view', query: { id: post.id } }"
                        class="col-md-3 col-sm-6 mb-4">
                        <div class="card">
                            <img :src="post.imageURL" class="card-img-top" style="height: 300px;" alt="Post Image">
                            <div class="card-body">
                                <p class="card-text">
                                    <span v-if="!post.verified" class="badge bg-warning"><small>(ΠΡΟΣ ΕΓΚΡΙΣΗ)</small></span>
                                    <span v-if="post.done" class="badge bg-success">ΟΛΟΚΛΗΡΩΜΕΝΗ</span>
                                    {{ post.title }}
                                </p>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>
  


<script setup>
    const config = useRuntimeConfig()
    const posts = ref([])
    
    const props = defineProps({
        user: {
            type: Object,
        }
    })

    if (!props.user) {
        const router = useRouter()

        router.push({ path: '/home'})
    }

    const getImage = async (path) => {
        try {
            const response = await $fetch(`/api/image?image=${path}`);
            const imageRes = response.imageRes; 

            if (imageRes) {
                return `data:image/jpeg;base64,${imageRes}`;
            }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    try {
        const myPostsData = await $fetch(`/api/myPosts?user_id=${props.user.id}`);
        const response = myPostsData.postsResponse;

        if (response.status == 'success') {
            posts.value = response.posts;
            posts.value.forEach(async (post) => {
                if (post.image0) {
                    const imageURL = await getImage(post.image0);
                    post.imageURL = imageURL 
                }
            })
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }
  
    const sortedPosts = computed(() => {
        if (!posts.value) {
            return [];
        }

        const unverifiedPosts = posts.value.filter(post => !post.verified);
        const incompletePosts = posts.value.filter(post => (typeof post.done === 'undefined' || !post.done) && post.verified);
        const completePosts = posts.value.filter(post => post.done);

        return unverifiedPosts.concat(incompletePosts, completePosts);
    });
</script>