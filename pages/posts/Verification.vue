<template>
        <div class="container"  >
		
		<div  v-if="!(this.Loaded)" class="pageMinFit d-flex flex-column text-center">  
  			<p class="h2 loadingText"> Φόρτωση</p> 
   			<PreLoader></PreLoader> 
 		</div> 
        	<div v-else class="col m-2 justify-content-center rounded pageMinFit">
 
                                <h1 class="text-center">ΕΞΕΤΑΣΗ ΑΓΓΕΛΙΩΝ</h1> 
                                        <div v-if="!(posts[0])" class="col text-center">
                                                <h2> Καμία Αγγελία</h2>
                                                <h3>Δεν υπάρχουν προς το παρόν αγγελίες προς πιστοποίηση</h3>
					
						<router-link class="h2" to="/home">Επιστροφή στην αρχική </router-link>
						<br>
						<a href="/admin" class="h2">Ή επισκεφτείτε το	 Admin PANEL </a> 
              
					
                                        </div>
					<div v-else v-for="post in posts" :key="post.id" class="row d-flex u-border-1 pb-5 nowrap w-100 justify-content-center">
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
							
						</div>
 
 
						<div class="w-100" style="position: relative; max-width: 700px;">

							
							<p class="postText"> <strong>{{ post.title}}</strong></p>

							

							<p class="postText"><small><strong> Περιγραφή  : </strong>{{ post.description}}</small></p>
						
							<p class="postText"><small><strong>Περιοχή:</strong> {{ post.adlocation}}</small></p>
							<p class="postText"><small><strong>Κατηγορία:</strong> {{ post.category}}</small></p>
							<p class="postText"><small><strong>Κατάσταση:</strong> {{ post.condition}}</small></p>
							<p class="postText"><small><strong>Ανταλλαγή για:</strong> {{ post.transferPref }}</small></p>
							<p class="postText"><small><strong>Του Χρήστη:</strong><router-link :to="'/profile/'+post.user_id">  {{ post.username }}</router-link></small></p>
							<p class="postText"><small><strong>Email:</strong>  {{ post.email }}</small></p>
							<p class="postText"><small><strong>Τηλέφωνο:</strong>  {{ post.phone }}</small></p>
							<p class="postText"><small><strong>Ημερομηνία:</strong> {{ post.date }}</small></p>
						
							    
							
						</div>
									
	

							
							<form @submit.prevent="verificate(post.id)"  v-if="user.role_id != 2" >								
								<div class="text-center">
									<button type="submit" class="btn btn-outline-success ml-3">ΕΓΚΡΙΣΗ</button>
								</div>
							</form>
							<form  v-if="user.role_id != 2 && !(post.reEdit)" @submit.prevent="ReEditPost(post.id)">
								<div class="text-center">
									<button type="submit" class="btn btn-outline-warning ml-3">Διαμόρφωσή και Επαναξέταση</button>
								</div>
							</form>  
							<div class="ml-3" v-else><h4 class="text-center">Στάλθηκε ειδοποίηση</h4></div>
                                                        <form  v-if="user.role_id != 2" @submit.prevent="DeletePost(post.id)">
								<div class="text-center">
									<button type="submit" class="btn btn-outline-danger ml-3">Διαγραφή Αγγελίας</button>
								</div>
							</form>  
						
                        		</div>
		</div>
        	
 	 

	</div> 
</template>


<script>

        export default{
                props: ['user'],

                data(){
                        return{
                                posts:{},
                                Loaded:false,
                                id:'',
                        }
                },
                methods:{
                        getPosts(){ 
                                axios.get('/api/vue/toverificate').then((response) => {
                                        this.posts = response.data;
                                        this.Loaded = true
                                })
                        },
                        verificate(param){
                                this.id = param;
                                
				if (confirm("Πατόντας ΟΚ η αγγελία θα εγκριθεί και θα δημοσιοποιηθεί , είστε σίγουροι;") == true) {
                                	axios.post('/api/verificatepost/'+this.id).then((response) =>{
                                        	if(response.data.status == "success"){
                                                	this.getPosts();
                                        	} 
                                	})
				}
                        },
                        DeletePost(param){
                                this.id = param;

				if (confirm("Πατόντας ΟΚ η αγγελία θα διαγραφεί, είστε σίγουροι;") == true) {
					axios.post('/api/deletepost/'+this.id).then((response) => {
					 	if(response.data.status == "success"){
                                                	this.getPosts();
                                        	}
                                	});
				}
                        		
			},
			ReEditPost(param){
				this.id = param;

				if (confirm("Πατόντας ΟΚ η αγγελία θα περάσει το στάδιο διαμόρφωσης και επαναξέτασης , είστε σίγουροι;") == true) {
					axios.post('/api/deletepost/'+this.id).then((response) => {
					 	if(response.data.status == "success"){
                                                	this.getPosts();
                                        	}
                                	});
				}
			}
                },
                created(){ 
                        this.getPosts();
                }
        }

</script> 