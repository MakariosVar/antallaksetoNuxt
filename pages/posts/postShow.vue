<template>
	<div v-if="((post.reEdit && !(post.verified)) && (loggeduserid() != post.user_id ))" v-bind="NotReady()" class="pageMinFit">
        <div class="d-flex justify-content-center">
            <img src="/images/NewLogoPNG.svg" class="imageNotFound">
        </div>
    </div>   
 
        <div v-else class="container" > 
		<div v-if="!(Loaded)" class="pageMinFit d-flex flex-column text-center">
			<p class="h2 loadingText"> Φόρτωση</p>
			<PreLoader ></PreLoader>
			<div><router-link class="h2" to="/home">Αρχική </router-link></div>
			<div><router-link class="h2" to="/p">Όλες οι Αγγελίες </router-link></div>
              		<div v-if="this.$attrs.loggedin">
                  		<router-link class="h2" to="/p/create">Δημιουργήστε μια Αγγελία </router-link>
              		</div>
              		<div v-else>
                  		<router-link class="h2" to="/login">Δημιουργήστε μια Αγγελία </router-link>
              		</div>
		</div>    
        	<div v-else class="row m-2 rounded pageMinFit">
					<div class="row d-flex nowrap w-100 justify-content-center">
						<div >
							
							<img v-if="post.image0" :src="`/storage/${post.image0}`"  
							style=" height: auto;
  								width: 299px;" >
							<div>
							
								<img v-if="post.image1" :src="`/storage/${post.image1}`"  
								style=" height: auto;
  								width: 147px;" >
								
							
								<img v-if="post.image2" :src="`/storage/${post.image2}`" 
								style=" height: auto;
  								width: 147px;" >
							
							</div>
							<div>
							
								<img v-if="post.image3" :src="`/storage/${post.image3}`" 
								style=" height: auto;
  								width: 147px;" >
							
							
								<img v-if="post.image4" :src="`/storage/${post.image4}`"
								style=" height: auto;
  								width: 147px;" >
							
							</div>
							<div v-if="this.$attrs.loggedin && this.$attrs.user.id == post.user_id" >
								<p ><router-link :to="'/p/'+this.post.id+'/imageEdit'">Επεξεργασία Φωτογραφιών</router-link></p>
							</div>
						</div>

 
						<div class="w-100" style="position: relative; max-width: 700px;"> 

							
							<p class="postText"> <strong>{{ post.title}}</strong><span v-if="post.verified == 0" class="notVerfiedText"><i> (  ΔΕΝ ΕΧΕΙ ΕΓΚΡΙΘΕΙ ΑΚΟΜΑ  )</i></span></p>
							
							<div v-if="post.reEdit == 1" class="border m-3 border-danger rounded">
								<p class="text-center ">
									Η Αγγελία σας δεν πληρεί τα κριτήρια για δημοσίευση,<br>
									παρακαλούμε προβείτε σε διαμορφώσεις των πληροφορίων της αγγελίας και θα  την επαναξετάσουμε
								</p>
								<div v-if="this.$attrs.loggedin && this.$attrs.user.id == post.user_id" class="text-center"> 
									<p ><router-link class="text-center" :to="'/p/'+this.post.id+'/edit'">Επεξεργασία Πληροφοριών</router-link></p>
								</div>
								<div v-if="this.$attrs.loggedin && this.$attrs.user.id == post.user_id" class="text-center"> 
									<p ><router-link :to="'/p/'+this.post.id+'/imageEdit'">Επεξεργασία Φωτογραφιών</router-link></p>
								</div>  
								
								<p class="small text-center"><i>*Μετά απο μεγάλο χρονικό διάστημα χωρίς τροποποίηση πληροφοριών η αγγελία σας θα διαγραφεί</i></p>
							</div>
							

							<p class="postText"><small><strong> Περιγραφή  : </strong>{{ post.description}}</small></p>
						 
							<p class="postText"><small><strong>Περιοχή:</strong> {{ post.adlocation}}</small></p>
							<p class="postText"><small><strong>Κατηγορία:</strong> {{ post.category}}</small></p>
							<p class="postText"><small><strong>Κατάσταση:</strong> {{ post.condition}}</small></p>
							<p class="postText"><small><strong>Ανταλλαγή για:</strong> {{ post.transferPref }}</small></p>
							<p class="postText"><small><strong>Του Χρήστη:</strong><router-link :to="'/profile/'+post.user_id">  {{ post.username }}<img v-if="post.userimage" :src="`/storage/${post.userimage}`" class="rounded-circle ml-2" style="width: 50px; height: auto;"></router-link></small></p>  
							<p class="postText"><small><strong>Email:</strong>  {{ post.email }}</small></p>  
							<p class="postText"><small><strong>Τηλέφωνο:</strong>  {{ post.phone }}</small></p>
							<p class="postText"><small><strong>Ημερομηνία:</strong> {{ post.date }}</small></p>
						
							    
							<div v-if="this.$attrs.loggedin && this.$attrs.user.id == post.user_id" class="text-center"> 
								<p ><router-link class="text-center" :to="'/p/'+this.post.id+'/edit'">Επεξεργασία Πληροφοριών</router-link></p>
							</div>
									
	

							
							<form  v-if="this.$attrs.loggedin && this.$attrs.user.id == post.user_id" @submit="DeletePost">
								<div class="text-center">
									<button type="submit" class="btn btn-danger ml-3">Διαγραφή Αγγελίας</button>
								</div>
							</form>
						
                        			</div>
					</div>
        	</div>	
		
		  

	</div>
</template>

<script>
  export default {
	
          data() {
                        return {
                        post: {},
			Loaded:false,
				
				
                       	}
                },

                methods:{
			loggeduserid(){
					if(this.$attrs.user){
						return this.$attrs.user.id;
					}else{
						return 0
					}
			},
                        getPostData(){ 
                            
                                axios.get('/api/vue/post/'+this.$route.params.id ).then((response) => {  
                                                if(response.data.status == "success"){
                                                  this.post = response.data.post[0];
                                               	  this.Loaded = true
                                                }}).catch((error) => { 
    							console.log(error.response.data)  
							alert('Δεν βρέθηκε η αγγελία που ψάχνετε\nΜεταβείτε σε όλες τις αγγελίες')
							window.location.href='/p';
							
						}); 
			
				
                        },  
			DeletePost: function(e){

					if (confirm("Πατόντας ΟΚ η αγγελία θα διαγραφεί, είστε σίγουροι;") == true) {
						axios.delete('/api/p/'+this.$route.params.id).then(
							this.$router.push('/p'));
					}
                        		e.preventDefault();
 

			},
			NotReady(){
                    		alert('\n\n Η αγγελία δεν είναι έτοιμη για δημοσιοποίηση  \n Μεταβείτε στις αγγελίες \n\n Εάν η αγγελία είναι δική σας κάντε σύνδεση στο λογαριασμό σας')
                   			this.$router.push('/p');
               		} 
                },
                created(){ 
			
                        this.getPostData()
                }
        } 
        
</script>