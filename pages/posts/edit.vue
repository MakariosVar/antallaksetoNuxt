<template>
    <div>
        <PostForm v-if="post" :user="user" :post="post" :key="post.id" :isUpdate="true" @sessionExpired="sessionExpired"/>
    </div>
</template>

<script>
    export default defineNuxtComponent({
        props: ['user'],
        data() {
            return {
                post: {}
            }
        },
        setup() {
            const config = useRuntimeConfig();
            return {config}
        },
        methods: {
            sessionExpired() {
                this.$emit('sessionExpired')
            },
            async getPostData() {
                const response = await fetch(
                    this.config.public.apiUrl + "/vue/post/" + this.$route.query.id
                );
                const data = await response.json();
                if (data.status == "success") {
                    this.post = data.post;
                }
            },
        },
        mounted () {
            this.getPostData();
        }
    });
</script>