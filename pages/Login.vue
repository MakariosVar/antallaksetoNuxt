<template>
    <div class="container p-5 pageMinFit">
        <div v-if="reAutheticate" class="alert alert-danger d-flex align-items-center" role="alert">
            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="me-2" size="2x" />
            <div>
                Συνδεθείτε ξανά για λόγους ασφαλείας
            </div>
        </div>
        <div class="row justify-content-center py-5">
            <div class="col-md-8 py-5">
                <div class="card shadow bg-body">
                    <div class="card-header bg-white text-center"><strong>Σύνδεση</strong></div>
                    <div class="card-body">
                        <div v-if="showLoginError" class="alert alert-danger d-flex align-items-center" role="alert">
                            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="me-2" size="2x" />
                            <div>
                                Λάθος Κωδικός ή email
                            </div>
                        </div>
                        <div v-if="loading" class="d-flex justify-content-center align-items-center">
                            <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <form v-else @submit.prevent="checkForm" id="Login" >
                            <div class="form-group row mb-2">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail</label>
                                <div class="col-md-6">
                                    <input id="email" v-model="emailInput" type="email" class="form-control" name="email" required
                                        autocomplete="email" autofocus>
                                </div>
                            </div>
                            <div class="form-group row mb-2">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Κωδικός
                                    πρόσβασης</label>
                                <div class="col-md-6">
                                    <input v-model="passwordInput" id="password" type="password" class="form-control" name="password" required
                                        autocomplete="current-password">
                                </div>
                            </div>

                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-success">Σύνδεση</button>
                            </div>
                            <div>
                                <p class="text-center">
                                    Ξεχάσατε τον κωδικό σας; πατήστε <nuxt-link to="/resetPassword">εδώ</nuxt-link>
                                </p>
                            </div>
                            <div>
                                <p class="text-center">
                                    Εάν δεν έχετε λογαριασμό, κάντε <nuxt-link to="/register">Εγγραφή</nuxt-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['loggedin'],
    data() {
        return {
            showLoginError: false,
            passwordInput: '',
            emailInput: '',
            loading: false,
        }
    },
    mounted() {
        if (this.loggedin) {
            location.replace('/home');
        }
    },
    computed: {
        reAutheticate() {
            return this.$route.query.reAutheticate ? true : false
        }
    },
    setup() {
        const config = useRuntimeConfig();
        return { config }
    },
    methods: {
        async checkForm() {
            var formContents = new FormData(document.getElementById('Login'));
            this.loading = true;
            try {
                const response = await useFetch(`/api/login?email=${this.emailInput}&password=${this.passwordInput}`);

                const data = response.data.value.loginData;
                if (data.status === 'success') {
                    let user = data.user;

                    this.$emit('userLogged', user);
                    if (process.client) {
                        location.replace('/home');
                    }
                } else if (data.status === 'error') {
                    this.showLoginError = true;
                    this.passwordInput = ''
                    this.loading = false
                }
            } catch (error) {
                this.loading = false
                console.error('Error:', error);
            }

        },
    }
}

</script>