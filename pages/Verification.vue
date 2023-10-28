<template>
    <div class="d-flex justify-content-center py-5">
        <div class="spinner-border display-1" role="status">
            <span class="visually-hidden display-1">Loading...</span>
        </div>
    </div>
</template>

<script>
    export default defineNuxtComponent({
        data() {
            return {
                token:''
            }
        },
        setup () {
			const config = useRuntimeConfig();
          	return { config }
		},
        methods: {
            async verificateUser() {
                if (this.token !== '') {
                    try {
                        const response = await fetch(this.config.public.apiUrl+'/user-verificate/'+this.token)
                        if (response.ok) {
                            const data = await response.json(); // Parse JSON response
                            if (data.status == 'success' && data.user) {
                                this.$emit('userLogged', data.user);
                            }
                            this.$router.push({name: 'Home'});
                        } else {
                            console.error('Failed to fetch data');
                        }
                    } catch (error) {
                        console.error(error);
                    }

                }

            }
        },
        mounted() {
            this.token = this.$route.query.token;
            this.verificateUser();
        }
    })
</script>