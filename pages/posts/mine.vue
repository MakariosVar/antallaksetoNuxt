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
                    <nuxt-link v-for="post in posts" :key="post.id" :to="{ path: '/posts/view', query: { id: post.id } }"
                        class="col-md-3 col-sm-6 mb-4">
                        <div class="card">
                            <img :src="`${config.public.storageUrl}/${post.image0}`" class="card-img-top" style="height: 300px;" alt="Post Image">
                            <div class="card-body">
                                <p class="card-text">
                                    <span v-if="!post.verified" class="card-text text-warning"><small>(ΠΡΟΣ ΕΓΚΡΙΣΗ)</small></span>
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

    try {
        const {data: myPostsData} = await useFetch(`/api/myPosts?user_id=${props.user.id}`);
        const response = myPostsData.value.postsResponse;

        if (response.status == 'success') {
            posts.value = response.posts;
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }

  
</script>