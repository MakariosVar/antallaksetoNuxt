<template>
    <div v-if="this.user" class="pageMinFit">
        <div class="d-flex justify-content-center">
            <img src="~assets/images/NewLogoPNG.svg" class="imageNotFound">
        </div>
    </div>
    <div v-else class="container py-5" style="height:700px;">
        <div class="row justify-content-center py-5">
            <div class="col-md-8 py-5">
                <div class="card">
                    <div class="card-header text-center">
                        {{ 'Εγγραφή' }}
                    </div>
                    <div class="card-body">
                        <div v-if="incorectPasswordRepeatError" class="alert alert-danger d-flex align-items-center" role="alert">
                            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="me-2" size="2x" />
                            <div>
                                Λάθος επαλήθευση κωδικού. Προσπαθήστε ξανά.
                            </div>
                        </div>
                        <div v-if="emailExistsError" class="alert alert-danger d-flex align-items-center" role="alert">
                            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="me-2" size="2x" />
                            <div>
                                Το Email " {{ email }} " υπάρχει ήδη.
                                <br>
                                Ξεχάσατε τον κωδικό σας; πατήστε <nuxt-link to="/resetPassword">εδώ</nuxt-link>
                            </div>
                        </div>
                        <div v-if="loading" class="d-flex justify-content-center align-items-center">
                            <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <form v-else @submit.prevent="checkForm" id="Register" class="col">
                            <div class="form-group row mb-1 ">
                                <label for="name" class="col-md-4 col-form-label text-md-right">
                                    {{ 'Όνομα' }}
                                </label>
                                <div class="col-md-6">
                                    <input v-model="name" id="name" type="text" class="form-control" name="name" required
                                        autocomplete="name" autofocus>
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ 'message' }}</strong>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group row mb-1 ">
                                <label for="email" class="col-md-4 col-form-label text-md-right">
                                    {{ 'E-Mail' }}
                                </label>
                                <div class="col-md-6">
                                    <input v-model="email" id="email" type="email" class="form-control " name="email" required
                                        autocomplete="email">
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ 'message' }}</strong>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group row mb-1 ">
                                <label for="password" class="col-md-4 col-form-label text-md-right">
                                    {{ 'Κωδικός πρόσβασης'}}
                                </label>
                                <div class="col-md-6">
                                    <input v-model="password" id="password" type="password" class="form-control" name="password" required
                                        autocomplete="new-password">
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ 'message' }}</strong>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group row mb-1 ">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">
                                    {{ 'Επανάληψη κωδικού' }}
                                </label>
                                <div class="col-md-6">
                                    <input v-model="passwordConfirm" id="password-confirm" type="password" class="form-control"
                                        name="password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>
                            <div class="form-group py-2 container" style="font-size: 0.8rem;">
                                <div class="row">
                                    <div class="col-1 d-flex justify-content-end">
                                        <input type="checkbox" id="terms" name="terms" value="terms" required>
                                    </div>
                                    <div class="col-11">
                                        <label for="terms">
                                            Έχω Διαβάσει και Αποδέχομαι τους 
                                            <nuxt-link to="/terms">Όρους και τις προϋποθεσεις χρήσης</nuxt-link>
                                            και την 
                                            <nuxt-link to="/privacyPolicy">Πολιτική Απορρήτου</nuxt-link>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row mb-1">
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-primary">
                                        {{ 'Εγγραφή' }}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p class="text-center">
                                    Έχετε ήδη λογαριασμό;<router-link class="btn btn-link" to="/login">Σύνδεση</router-link>
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
    props: ['user'],
    data() {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            incorectPasswordRepeatError: false,
            emailExistsError: false,
            loading: false,
        }
    },
    setup() {
        const config = useRuntimeConfig();
        return { config }
    },
    mounted () {
        if (this.user) {
            alert('Είστε ήδη συνδεδεμένος/η \n Μεταβείτε στην αρχική')
            location.replace('/home');
        }
    },
    methods: {
        async checkForm(e) {
            this.incorectPasswordRepeatError = false;
            this.emailExistsError = false;

            if (this.password != this.passwordConfirm) {
                this.incorectPasswordRepeatError = true;
                this.passwordConfirm = '';
                return;
            }

            this.loading = true;
            let url = `/api/register?name=${this.name}&password=${this.password}&email=${this.email}`
            try {
                const {data: registerData} = await useFetch(url);
                const response = registerData.value.registerData

                if (response.status === 'success') {
                    const User = response.user;
                    this.$emit('userLogged', User);
                    if (process.client) {
                        location.replace('/home');
                    }
                } else if (response.status === 'error' && response.message === 'User Exist') {
                    this.emailExistsError = true;
                    this.loading = false;
                } else {
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
                console.error('Request error:', error);
            }
        },
    }
}

</script>