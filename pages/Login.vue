<template>
    <div v-if="this.loggedin" v-bind="islogged()" class="pageMinFit">
        <div class="d-flex justify-content-center">
            <img src="/images/NewLogoPNG.svg" class="imageNotFound">
        </div>
    </div>
 <div v-else class="container p-5 pageMinFit">
    <div class="row justify-content-center py-5">
        <div class="col-md-8 py-5">
            <div class="card">
                <div class="card-header text-center">Σύνδεση</div>

                <div class="card-body">
                    <form @submit="checkForm" id="Login">
                       

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" required autocomplete="email" autofocus>

                            </div> 
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Κωδικός πόσβασης</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                    <label class="form-check-label" for="remember">
                                       Να με θυμάσαι
                                    </label>
                                </div>
                            </div>
                        </div>

                       
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Σύνδεση
                                </button>
                            </div>
                        
                            <!--
                            <div class="text-center">
                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Ξέχασες τον Κωδικό σου;') }}
                                    </a>
                                @endif
                            </div>-->
                        

                        <div>
                            <p  class="text-center">
                                Εάν δεν έχετε λογαριασμό κάν'τε <router-link class="btn btn-link" to="/register">Εγγραφή</router-link>
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
           
        },
         
        methods:{
            checkForm: 
                    function (e) {
                        if(this.loggedin){  
                                alert('Είστε ήδη συνδεδεμένος/η \n Μεταβείτε στην αρχική')
                            location.replace('/home');
                        }else
                        {    
                            var formContents = jQuery("#Login").serialize();

                            axios.post('/api/vuelogin', formContents).then((response) => {  
                                    if(response.data.status == "success"){
                                        let User = response.data.user;
                                    
                                        this.$emit('userLogged' , User); 
                                        this.$router.push('/home')
                                    }
                                    else if (response.data.status == "error") {
                                        alert('Το email και ο κωδικός δεν ταιριάζουν, Προσπαθήστε ξανά')
                                    }
                                    else
                                    {
                                        axios.post('/api/vuelogout').then((response) => {
                                            this.checkForm();
                                        });
                                    }
                            }, 
                            function() 
                            {
                                    console.log('failed');
                            });
                        }
                        e.preventDefault();
                    },
            islogged(){
                alert('η/η \n Μεταβείτε στην αρχική')
                location.replace('/home');
            }
        }
    }
    
</script>