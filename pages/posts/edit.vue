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
                const response = await $fetch("/api/post?id=" + this.$route.query.id);
                const data = response.post;
                if (data.status == "success") {
                    this.post = data.post;
                }
            }
        },
        mounted () {
            this.getPostData();
        }
    });
</script>