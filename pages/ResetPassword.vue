<template>
    <span v-if="loading" class="d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </span>
    <div v-else class="container p-5">
        <div class="row justify-content-center py-5">
            <div class="col-md-8 py-5">
                <div class="card">
                    <div class="card-header text-center">Ανάκτηση Κωδικού</div>
                    <div class="card-body">
                        <form @submit.prevent="submitForm" id="Login">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail</label>
                                <div class="col-md-6">
                                    <input v-model="email" id="email" type="email" class="form-control" name="email" required
                                        autocomplete="email" autofocus>
                                </div>
                            </div>
                            <div class="col-md-12 text-center mt-3">
                                <button type="submit" class="btn btn-success">Αίτημα</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default defineNuxtComponent({
        data() {
            return {
                email: '',
                loading: false
            }
        },
        setup () {
            const config = useRuntimeConfig();
            return {config}
        },
        methods: {
            async submitForm () {
                this.loading = true;
                if (this.email !== '') {
                    const response = await fetch(`${this.config.public.apiUrl}/reset-password`, {
                        method: 'POST',
                        body: new URLSearchParams({
                            email: this.email
                        })
                    })
                    const data = await response.json();
                    if (data.status === 'success') {
                        alert(data.message)
                        this.$router.push({name: 'Home'})
                    }
                }
                this.loading = false;
            }
        }
        
    })
</script>