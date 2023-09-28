<template>
    <div class="row">
        <div class="col-12">
            <h5 class="text-decoration-underline">Σχετικές Αγγελίες</h5>
        </div>
        <nuxt-link v-for="post in posts" :key="post.id" :to="{ path: '/posts/view', query: { id: post.id } }" class="col-lg-3 col-sm-6">
            <div class="card h-100">
                <img :src="`${$config.public.storageUrl}/${post.image0}`" class="card-img-top" style="height: 300px; width: auto;" alt="Post Image">
                <div class="card-body">
                    <h5 class="card-title">{{ post.title }}</h5>
                    <p class="card-text">Περιοχή: {{ `${post.fullAddress.locality}, ${post.fullAddress.country}` }}</p>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
    export default defineNuxtComponent({
        props: ['post'],
        data() {
            return {
                posts: []
            }
        },
        methods: {
            async getRelatedPosts() {
                const response = await fetch(`${this.$config.public.apiUrl}/p/related/${this.post.id}`)
                const data = await response.json();
                
                if (data.status === 'success') {
                    this.posts = data.posts
                }
            }
        },
        mounted() {
            this.getRelatedPosts()  
        },
    })
</script>