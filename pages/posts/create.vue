<template>
    <div>
        <PostForm v-if="isUserVerified" :user="user" @sessionExpired="sessionExpired"/>
    </div>
</template>

<script>
    export default defineNuxtComponent({
        props:['user'],
        data() {
            return {
                isUserVerified: false,
            }
        },
        methods: {
            sessionExpired() {
                this.$emit('sessionExpired')
            }
        },
        created () {
            if (this.user && this.user.email_verified_at == null) {
                alert('Επαληθεύστε το Email σας για να προσθέσετε αγγελίες')
                this.$router.push({name: 'Home'})
            } else {
                this.isUserVerified = true;
            }
        }
    })
</script>