<template>
        <section>
                
        <div class="container" style="min-height:700px;">

                <div v-if="this.submit" class="pageMinFit d-flex flex-column text-center">
			<p class="h2 loadingText"> Φόρτωση</p>
			<PreLoader ></PreLoader>
		</div>

                <form v-else enctype="multipart/form-data" @submit.prevent="checkForm" >
      

                        <div class='row'>
                                <div class="col-8 offset-2 pb-3" >
                                        <div class="row  justify-content-center ">
                                                <p class="display-4">Διαμόρφωση Προφίλ</p>
                                        </div>
  

             
            
                                        <div class="profile-pic-wrapper pt-5">
                                                <h2>Φωτογραφία Προφίλ</h2>  
                                                <div class="pic-holder">
                                                        <!-- uploaded pic shown here   -->
                                                        <img v-if="this.NewImageLoad" id="profilePic" class="pic" style="min-width: 100%;">         
                                                        <img v-else id="profilePic" class="pic" :src="`/storage/${profile.image}`">

                                                        <Input  @change="image" class="uploadProfileInput" type="file" name="image" id="newProfilePhoto" accept="image/*"   />
                                                        <label for="newProfilePhoto" class="upload-file-block">
                                                                
                     
                                                                <div class="text-center">
                                                                        <div class="mb-2">
                                                                                <i class="fa fa-camera fa-2x"></i>
                                                                        </div>  
 
                                                                        <div class="text-uppercase">
                                                                                Νέα Φωτογραφία <br /> Προφίλ
                                                                        </div>
                                                                </div>
                                                        </label>
                                                </div>
                                        </div> 
         
                                        <div class="form-group row">
                                                <label for="description" class="col-md-4 col-form-label">Περιγραφή:</label>
        
                       
                                                <textarea id="description" 
                                                        type="text"
                                                        class="form-control" 
                                                        name="description"
                                                        rows="10"
                                                        cols="50"
                                                        :maxlength="600"
                                                        :value="profile.description"  
                                                        autocomplete="description" 
                                                        autofocus>
        
                            
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>message</strong>
                                                        </span>
                                                </textarea>
                        
                                        </div>   
                                        <div class="row pt-4 justify-content-center">
                                           <button class="btn btn-primary ">Αποθήκευση</button>
                                        </div>
                                </div>
                        </div>
                </form>


        </div>
        </section>
</template>

<script>
        export default{
                data(){
                        return{
                                profile:{},
                                form:{
                                        image: '',
                                        description:'' 
                                },
                                NewImageLoad: false,
                                submit:false
                        }
                }, 
                methods:{
                        getProfileData(){
                                 axios.get('/api/vue/profile/'+this.$route.params.id ).then((response) => {  
                                                if(response.data.status == "success"){
                                                  this.profile = response.data.profile[0];
                                                  
                                                  if(this.profile.image == null)
                                                   
                                                   {
                                                    this.profile.image = "/profile/default.png"
                                                    }
                                                 
                                                }
                        
                                });
                        },
                        image:
                                function (e){
                                var files = e.target.files[0];
                                this.form.image = files;  
                                
                                
                                var reader = new FileReader();
                               
                                reader.onload = function(){
                                        var profilePic = document.getElementById('profilePic');
                                        profilePic.src = reader.result;
                                };

                                reader.readAsDataURL(this.form.image);
  
                                this.NewImageLoad = true;
                                },
                        checkForm: 
                                function (e) { 
                                        this.submit=true;
                                        let data = new FormData();
                                        this.form.description = $("#description").val();
                                        data.append('description', this.form.description);
                                        if(this.NewImageLoad){data.append('image', this.form.image);}

                                        axios.post('/api/profile/'+this.$route.params.id, data).then((response) =>{
                                               this.$router.push('/profile/'+this.$route.params.id)
                                        }); 
                                } 
                }, 
                created(){ 
                        this.getProfileData();
                }

        }
</script>