<template>
<div v-if="this.loggedin" v-bind="islogged()" class="pageMinFit">
        <div class="d-flex justify-content-center">
            <img src="~assets/images/NewLogoPNG.svg" class="imageNotFound"> 
        </div>
    </div>
<div v-else class="container py-5" style="height:700px;">
    <div class="row justify-content-center py-5">
        <div class="col-md-8 py-5">
            <div class="card">
                <div class="card-header text-center">{{ 'Εγγραφή' }}</div>

                <div class="card-body">
                    <form @submit.prevent="checkForm" id="Register"  class="col">
                       

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ 'Όνομα' }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name"  required autocomplete="name" autofocus>

                               
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ 'message' }}</strong>
                                    </span>
                            
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ 'E-Mail' }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control " name="email" required autocomplete="email">

                               
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ 'message' }}</strong>
                                    </span>
                                
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ 'Κωδικός πρόσβασης' }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required autocomplete="new-password">

                           
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ 'message' }}</strong>
                                    </span>
                               
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ 'Επανάληψη κωδικού' }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>
                        
                        <div class="form-group text-center mb-0">
                            <div>
                                <input type="checkbox" id="terms" name="terms" value="terms" required>
                                <label for="terms">Έχω Διαβάσει και Αποδέχομαι τους <router-link to="/terms">Όρους και τις προϋποθεσεις χρήσης</router-link></label>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ 'Εγγραφή' }}
                                </button>
                            </div>
                        </div>
                        <div>
                            <p  class="text-center">
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
        props:['loggedin', 'csrfToken'],
        setup () {
            const config = useRuntimeConfig();
            return { config }
        },         
        methods:{
            async checkForm(e) {
                    if (this.loggedin) {
                        alert('Είστε ήδη συνδεδεμένος/η \n Μεταβείτε στην αρχική');
                        this.$router.push('/home');
                    } else {
                        const formContents = new FormData(document.getElementById('Register'));
                        const csrfToken = this.csrfToken; // Use the CSRF token prop

                        try {
                        const response = await fetch(this.config.public.apiUrl+'/vueregister', {
                            method: 'POST',
                            headers: {
                            'X-CSRF-TOKEN': csrfToken,
                            },
                            body: formContents,
                        });

                        if (response.status === 200) {
                            const data = await response.json();
                            if (data.status === 'success') {
                            const User = data.user;
                            this.$emit('userLogged', User);
                            this.$router.push('/home');
                            } else {
                            alert('Errors');
                            }
                        } else {
                            console.error('Request failed:', response.statusText);
                        }
                        } catch (error) {
                        console.error('Request error:', error);
                        }
                    }
                    e.preventDefault();
                },
                islogged(){
                alert('Είστε ήδη συνδεδεμένος/η \n Μεταβείτε στην αρχική')
                location.replace('/home');
            }
        }
    }

</script>