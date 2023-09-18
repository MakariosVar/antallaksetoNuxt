<template>
        <div v-if="!(Loaded)" class="d-flex pageMinFit">
                <PreLoader></PreLoader>
        </div>
        <div v-else >
                        
        <div v-if="!(this.posts[0])" class="pageMinFit">
                <div class="d-flex justify-content-center">
                        <img src="/images/NewLogoPNG.svg" class="imageNotFound">
                </div>
                <div  style=" text-align: center; font-size:40px; "><strong>Δεν έχετε καταχωρήσει αγγελίες ακόμη</strong>
                        <br>
                        <router-link to="/p/create" class="big">Προώθηση Αγγελίας</router-link>   
                </div>
        </div>
        <div v-else>
	        <div class="mt-3">
	        	<div  style=" text-align: center; font-size:40px;"><strong>Οι Αγγελίες μου</strong>
		        </div>      
	        </div>
	       
               <div class="mt-3 text-center p-3">
		        <router-link to="/p/create" class="big">Προώθηση Αγγελίας</router-link>     
	        </div>
                <PreLoader v-if="!(Loaded)"></PreLoader>
 
	        <div class="card mb-3 content p-5" style="min-height:700px;">
                <section class="row">
                        
	    	        <router-link v-for="post in posts" :key="post.id" :to="'/p/'+post.id" class="col-3 post">
 	    		        <figure class="post-image">
        		        	<img :src="`/storage/${post.image0}`">
      			        </figure>
       		                <span class="post-overlay">
         			        <p v-if="post.verified == 1">
                                                <span style="color:white;">{{ post.title}}</span>
          			        </p>
                                        <p v-else>
                                                <span style="color:white;">ΠΡΟΣ ΕΓΚΡΙΣΗ</span>
                                                <PreLoader></PreLoader>
                                        </p>
        		        </span>
                        </router-link>
		
	  
                </section>
	        </div>
        </div>
</div>
	  
</template>

<script>

        export default {

                props: [ 'user'],

                data() {
                        return {
                                posts: {},
                                Loaded: false
                        }
                },

                methods:{
                      
                        getPosts(){
                            
                                axios.get('/api/vue/myposts/'+this.$route.params.id ).then((response) => {  
                                  if(response.data.status == "success"){
                                        this.posts = response.data.posts;
                                        this.Loaded = true;
                                  }
                                });
                        }
                      
                },
                mounted(){
                        if (!(this.$route.params.id == this.user.id)) {
                                this.$router.push('/myposts/'+this.user.id)
                        }
                        this.getPosts()
                       
                        
              }
        }
        
</script>