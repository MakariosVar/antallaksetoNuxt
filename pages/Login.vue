<template>
    <div class="container p-5 pageMinFit">
        <div v-if="$route.query.reAutheticate" class="alert alert-danger d-flex align-items-center" role="alert">
            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="me-2" size="2x" />
            <div>
                Συνδεθείτε ξανά για λόγους ασφαλείας
            </div>
        </div>
        <div class="row justify-content-center py-5">
            <div class="col-md-8 py-5">
                <div class="card">
                    <div class="card-header text-center">Σύνδεση</div>
                       <div class="card-body">
                        <form @submit.prevent="checkForm" id="Login">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" required autocomplete="email" autofocus>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Κωδικός πρόσβασης</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember">
                                        <label class="form-check-label" for="remember">Να με θυμάσαι</label>
                                    </div>
                                </div>
                            </div>
  
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-success">Σύνδεση</button>
                            </div>
                        <div>
                  <p class="text-center">
                    Εάν δεν έχετε λογαριασμό, κάντε <router-link class="btn btn-link" to="/register">Εγγραφή</router-link>
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
        props:['loggedin'], 
        mounted() {
            if (this.loggedin) {
                alert('Είστε ήδη συνδεδεμένος/η \n Μεταβείτε στην αρχική');
                location.replace('/home');
            } 
        },
        setup () {
            const config = useRuntimeConfig();
            return { config }
        },         
        methods:{
            async checkForm(e) {
                e.preventDefault();
                var formContents = new FormData(document.getElementById('Login'));

                try {
                    const response = await fetch(this.config.public.apiUrl+'/vuelogin', {
                        method: 'POST',
                        body: formContents,
                    });

                    if (response.status === 200) {
                        const data = await response.json();
                        if (data.status === 'success') {
                            let user = data.user;
                            
                            this.$emit('userLogged', user);
                            if (process.client) {
                                location.replace('/home');
                            }
                        } else if (data.status === 'error') {
                            alert('Το email και ο κωδικός δεν ταιριάζουν, Προσπαθήστε ξανά');
                        } else {
                            await fetch(this.config.public.apiUrl+'/vuelogout');
                            this.checkForm();
                        }
                    } else {
                        console.error('Failed to fetch');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }

            },
        }
    }
    
</script>