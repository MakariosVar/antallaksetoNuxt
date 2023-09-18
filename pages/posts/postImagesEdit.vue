<template>
        <div v-if="submit" class="pageMinFit d-flex flex-column text-center">
			<p class="h2 loadingText"> Φόρτωση</p>
			<PreLoader></PreLoader>
			
		</div>  
        <section v-else>
                <h1 class="text-center">Αλλάξτε ή Προσθέστε Φωτογραφίες</h1>
                <div >
                        <form class="d-flex flex-column align-items-center mb-5" @submit="checkForm"> 
       
                              <!-- IMAGE 0-->
                                     <div class="pic-holder">
                                                        <img v-if="this.NewImageLoad0" id="profilePic0" class="pic" style="min-width: 100%;">         
                                                        <img v-else-if="post.image0" id="profilePic0" class="pic" :src="`/storage/${post.image0}`">
                                                        <div v-else class="d-flex flex-column align-items-center">
                                                               
                                                               
                                                                <svg width="150px" height="150px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs></defs><title>number--1</title><path d="M16,10V22h0V10m1-1H12v2h3V21H12v2h8V21H17V9Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-2" width="32" height="32"/></svg>

                                                        </div>   
                                                        <Input  @change="image0" class="uploadProfileInput1" type="file" name="image" id="newProfilePhoto1" accept="image/*"   />
                                                        <label for="newProfilePhoto1" class="upload-file-block">
                                                                
                     
                                                                <div class="text-center">
                                                                        <div class="mb-2">
                                                                                <i class="fa fa-camera fa-2x"></i>
                                                                        </div>  
 
                                                                        <div class="text-uppercase">
                                                                                Νέα Φωτογραφία <br /> No. 1 
                                                                        </div>
                                                                </div> 
                                                        </label>
                                        </div>
                                <!-- IMAGE 1 -->
                                        <div class="pic-holder">
                                                        <img v-if="this.NewImageLoad1" id="profilePic1" class="pic" style="min-width: 100%;">         
                                                        <img v-else-if="post.image1" id="profilePic1" class="pic" :src="`/storage/${post.image1}`">
                                                        <div v-else class="d-flex flex-column align-items-center">
                                                        
                                                                        
                                                        <svg width="150px" height="150px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs></defs><title>number--2</title><path d="M20,23H12V17a2,2,0,0,1,2-2h4V11H12V9h6a2,2,0,0,1,2,2v4a2,2,0,0,1-2,2H14v4h6Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>
                                                         </div>   
                                                        <Input  @change="image1" class="uploadProfileInput2" type="file" name="image" id="newProfilePhoto2" accept="image/*"   />
                                                        <label for="newProfilePhoto2" class="upload-file-block">
                                                                
                     
                                                                <div class="text-center">
                                                                        <div class="mb-2">
                                                                                <i class="fa fa-camera fa-2x"></i>
                                                                        </div>  
 
                                                                        <div class="text-uppercase">
                                                                                Νέα Φωτογραφία <br /> No. 2
                                                                        </div>
                                                                </div>
                                                        </label>
                                        </div>
                
                                <!-- IMAGE 2--> 
                                <div class="pic-holder">
                                                        <img v-if="this.NewImageLoad2" id="profilePic2" class="pic" style="min-width: 100%;">         
                                                        <img v-else-if="post.image2" id="profilePic2" class="pic" :src="`/storage/${post.image2}`">
                                                        <div v-else class="d-flex flex-column align-items-center">
                                                               
                                                              <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 32 32" id="icon" data-arp-injected="true"><defs></defs><title>number--3</title><path d="M18,9H12v2h6v4H14v2h4v4H12v2h6a2,2,0,0,0,2-2V11A2,2,0,0,0,18,9Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>
                                                        </div>   
                                                        <Input  @change="image2" class="uploadProfileInput3" type="file" name="image" id="newProfilePhoto3" accept="image/*"   />
                                                        <label for="newProfilePhoto3" class="upload-file-block">
                                                                
                     
                                                                <div class="text-center">
                                                                        <div class="mb-2">
                                                                                <i class="fa fa-camera fa-2x"></i>
                                                                        </div>  
 
                                                                        <div class="text-uppercase">
                                                                                Νέα Φωτογραφία <br /> No. 3
                                                                        </div>
                                                                </div>
                                                        </label>
                                        </div>
                                <!-- IMAGE 3--> 
                                <div class="pic-holder">
                                                        <img v-if="this.NewImageLoad3" id="profilePic3" class="pic" style="min-width: 100%;">         
                                                        <img v-else-if="post.image3" id="profilePic3" class="pic" :src="`/storage/${post.image3}`">
                                                        <div v-else class="d-flex flex-column align-items-center">
                                                          
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 32 32" id="icon" data-arp-injected="true"><defs></defs><title>number--4</title><path d="M18,10v8h0V10m1-1H17v8H14V9H12V19h5v4h2V19h1V17H19V9Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-2" width="32" height="32"/></svg>

                                                         </div>   
                                                        <Input  @change="image3" class="uploadProfileInput4" type="file" name="image" id="newProfilePhoto4" accept="image/*"   />
                                                        <label for="newProfilePhoto4" class="upload-file-block">
                                                                
                     
                                                                <div class="text-center">
                                                                        <div class="mb-2">
                                                                                <i class="fa fa-camera fa-2x"></i>
                                                                        </div>  
 
                                                                        <div class="text-uppercase">
                                                                                Νέα Φωτογραφία <br /> No. 4
                                                                        </div>
                                                                </div>
                                                        </label>
                                        </div>
                                <!-- IMAGE 4--> 
                                <div class="pic-holder">
                                                        <img v-if="this.NewImageLoad4" id="profilePic4" class="pic" style="min-width: 100%;">         
                                                        <img v-else-if="post.image4" id="profilePic4" class="pic" :src="`/storage/${post.image4}`">
                                                        <div v-else class="d-flex flex-column align-items-center">


                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 32 32" id="icon" data-arp-injected="true"><defs></defs><title>number--5</title><path d="M18,23H12V21h6V17H12V9h8v2H14v4h4a2,2,0,0,1,2,2v4A2,2,0,0,1,18,23Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>
                                                         
                                                         
                                                         </div>   
                                                        <Input  @change="image4" class="uploadProfileInput5" type="file" name="image" id="newProfilePhoto5" accept="image/*"   />
                                                        <label for="newProfilePhoto5" class="upload-file-block">
                                                                
                     
                                                                <div class="text-center">
                                                                        <div class="mb-2">
                                                                                <i class="fa fa-camera fa-2x"></i>
                                                                        </div>  
 
                                                                        <div class="text-uppercase">
                                                                                Νέα Φωτογραφία <br /> No. 5
                                                                        </div>
                                                                </div> 
                                                        </label>
                                        </div>
                        <div class="row pt-4 justify-content-center">
                                <button type="submit" class="btn btn-primary">Αποθήκευση</button>
                        </div> 
                        </form>
                </div>

  
 


        </section>

</template>
                <style>.cls-1{fill:none;}.cls-2{fill:none;}</style>  
<script>
        export default{
                data(){
                        return{
                                post: {},
                                form: {
                                        image0: null,
                                        image1: null,
                                        image3: null,
                                        image2: null,
                                        image4: null,
                                },
                                NewImageLoad0: false,
                                NewImageLoad1: false,
                                NewImageLoad2: false,
                                NewImageLoad3: false,
                                NewImageLoad4: false,
                                submit:false
                        }
                },   

                methods:{
                        checkForm: 
                                function (e) {
                    
                                let data = new FormData();
                                
                                if(this.form.image0 != null){data.append('image0', this.form.image0);}

                                if(this.form.image1 != null){data.append('image1', this.form.image1);}
                            
                                if(this.form.image2 != null){data.append('image2', this.form.image2);}
                            
                                if(this.form.image3 != null){data.append('image3', this.form.image3);}
                            
                                if(this.form.image4 != null){data.append('image4', this.form.image4);}
                        
                           
                                this.submit=true;
                    
                                axios.post('/api/p/'+this.post.id, data).then((response) => {
                                        
                                        this.$router.push('/p/'+this.post.id);
                                        }),
                       
                
                        
                                e.preventDefault();
               
                                },

                                image0:
                                        function (e){          
                                                var files = e.target.files[0];
                                                this.form.image0 = files; 
                                                
                                                var reader = new FileReader();
                               
                                                reader.onload = function(){
                                                        var profilePic = document.getElementById('profilePic0');
                                                        profilePic.src = reader.result;
                                                };

                                                reader.readAsDataURL(this.form.image0);
  
                                                this.NewImageLoad0 = true;
                                        },
                                image1:
                                        function (e){
                                                var files = e.target.files[0];
                                                this.form.image1 = files;  
                                        
                                                var reader = new FileReader();
                               
                                                reader.onload = function(){
                                                        var profilePic = document.getElementById('profilePic1');
                                                        profilePic.src = reader.result;
                                                };

                                                reader.readAsDataURL(this.form.image1);
  
                                                this.NewImageLoad1 = true;
                                        
                                        
                                        },
                                image2:
                                        function (e){
                                            var files = e.target.files[0];
                                            this.form.image2 = files;  
                                            
                                                var reader = new FileReader();
                               
                                                reader.onload = function(){
                                                        var profilePic = document.getElementById('profilePic2');
                                                        profilePic.src = reader.result;
                                                };

                                                reader.readAsDataURL(this.form.image2);
  
                                                this.NewImageLoad2 = true;
                                        },
                                image3:
                                        function (e){
                                            var files = e.target.files[0];
                                            this.form.image3 = files;
                                            
                                                var reader = new FileReader();
                               
                                                reader.onload = function(){
                                                        var profilePic = document.getElementById('profilePic3');
                                                        profilePic.src = reader.result;
                                                };

                                                reader.readAsDataURL(this.form.image3);
  
                                                this.NewImageLoad3 = true;
                                        },
                                image4:
                                        function (e){
                                            var files = e.target.files[0];
                                            this.form.image4 = files;  
                                            
                                                var reader = new FileReader();
                               
                                                reader.onload = function(){
                                                        var profilePic = document.getElementById('profilePic4');
                                                        profilePic.src = reader.result;
                                                };

                                                reader.readAsDataURL(this.form.image4);
  
                                                this.NewImageLoad4 = true;
                                        },
                        getPostData(){
                                axios.get('/api/vue/post/'+this.$route.params.id ).then((response) => {  
                                                if(response.data.status == "success"){
                                                  this.post = response.data.post[0];
                                                    
                                          
                                                }
                
                                })
                        }
                },
               
                 created(){
                this.getPostData()
               
                }
        }

</script>