<template>
    <div class="row" v-if="posts && posts.length">
        <div class="col-12">
            <h5 class="text-decoration-underline">Σχετικές Αγγελίες</h5>
        </div>
        <nuxt-link v-for="post in posts" :key="post.id" :to="{ path: '/posts/view', query: { id: post.id } }" class="col-lg-3 col-sm-6">
            <div class="card shadow p-3 mb-5 bg-body h-100">
                <img v-if="post.image0" :src="`https://b.antallakseto.gr/storage/${post.image0}`" class="card-img-top responsive-image" style="height: 250px;" alt="Post Image">
                <div v-else class="d-flex justify-content-center align-items-center" style="width: 100%; height: 300px;">
                    <div class="spinner-grow" style="color: #e4e3e3; width: 150px; height: 150px;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ post.title }}</h5>
                    <p class="card-text">{{post.fullAddress.name_el }}</p>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
    export default {
        props: ['post']
    }
</script>
<script setup>
    const route = useRoute();
    const posts = ref([])

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

    // Fetch related posts
    const { data: postsData } = await useFetch(`/api/relatedPosts?id=${route.query.id}`);
    if (postsData && postsData.value && postsData.value.posts) {

        const response = postsData.value.posts;
        if (response.status === 'success'){
            posts.value = response.posts;
        }
    }
</script>
