<template>
    <div>
        <button class="btn btn-primary" @click="followUser" v-text="buttonText"></button>
    </div>
</template>

<script>
export default {
    props: ['profileId', 'follows', 'user'],
    data() {
        return {
            followtext: this.follows
        }
    },
    setup () {
        const config = useRuntimeConfig();
        return { config }
    },
    methods: {
        async followUser() {
            const response = await $fetch(`/api/followUser?id=${this.profileId}&token=${this.user.auth_token}`)

            if (response && response.followResponse) {
                let data = response.followResponse
                if (data.status == 'success') {
                    this.followtext = !this.followtext;
                    this.$emit('followClick')
                } else if (data.expired) {
                    this.$emit('sessionExpired')
                }
            }
        }

    },
    computed: {
        buttonText() {
            return (this.followtext) ? 'Unfollow' : "Follow";
        }
    }
}
</script>
