<template>
    <div>
        <PostForm :user="user" @sessionExpired="sessionExpired"/>
    </div>
</template>

<script>
    export default defineNuxtComponent({
        props:['user'],
        methods: {
            sessionExpired() {
                this.$emit('sessionExpired')
            }
        }
    })
</script>