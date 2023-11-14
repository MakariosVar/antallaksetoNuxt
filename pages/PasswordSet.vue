<template>
    <span v-if="!loaded" class="d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
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
                                <label for="password" class="col-md-4 col-form-label text-md-right">Νεος Κωδικός πρόσβασης</label>
                                <div class="col-md-6">
                                    <input v-model="password" id="password" type="password" class="form-control" name="password" required
                                        autocomplete="password" autofocus>
                                </div>
                                <label for="password_confirm" class="col-md-4 col-form-label text-md-right">Επανάληψη νέου κωδικού</label>
                                <div class="col-md-6">
                                    <input v-model="password_confirm" id="password_confirm" type="password" class="form-control" name="password_confirm" required
                                        autocomplete="password_confirm" autofocus>
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
                loaded: false,
                token: '',
                password: '',
                password_confirm: ''
            }
        },
        methods: {
            async checkToken() {
                let response = await $fetch(`/api/checkResetPasswordToken?token=${this.token}`);
                
                if (response && response.resetResponse && response.resetResponse.status === "success") {
                    this.loaded = true
                } else {
                    alert('Κάτι πήγε στραβά\nΚάν\'τε αίτηση ξανά');
                    this.$router.push({path: 'ResetPassword'})
                }
            },
            async submitForm() {
                if (this.password !== this.password_confirm) {
                    this.password_confirm = ''
                    alert('Επαναλάβετε τον κωδικό σωστα')
                    return;
                }
                let response = await fetch(`${this.$config.public.apiUrl}/set-password/${this.token}`, {
                    method: 'POST',
                    body: new URLSearchParams({
                        password: this.password
                    })
                });
                const data = await response.json();
                if (data.status === "success") {
                    this.$router.push({name: 'Login'})
                } else {
                    alert('Κάτι πήγε στραβά\nΚάν\'τε αίτηση ξανά');
                    this.$router.push({path: 'ResetPassword'})
                }
            }
        },
        async mounted () {
            this.token = this.$route.query.token;
            this.checkToken();
        }
    })
</script>