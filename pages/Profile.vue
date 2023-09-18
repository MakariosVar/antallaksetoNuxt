<template>
<div class="container pageMinFit">
   <div v-if="!(Loaded)" class="pageMinFit d-flex">
			<PreLoader ></PreLoader>
		</div>
    <div v-else class="row">
      <div class="col-md-4 mt-1">
        <div class="card text-center sidebar">
          <div class="card-body">
     
            <img :src="`/storage/${profile.image}`" class="rounded-circle" width="150">
            <div class="mt-3">
              
              <div v-if="!(user === null)">
                <router-link v-if="user.id == profile.user_id" :to="'/EditProfile/'+this.$route.params.id">Διαμόρφωση Προφίλ</router-link>
              </div>
              
               
                  <div v-if="!(user === null)" @click="followclick()">
                    <follow-button v-if="!(user.id == profile.user_id)"  :userId="profileUser.id" :follows="profile.follows"></follow-button>
                  </div> 
               
            <!--MAKE API FOR POST COUNT FOLOWERS COUNT -->
              <div  style=" text-align: center;"> Posts: <strong>{{profile.postCount}}</strong></div>
              <div  style=" text-align: center;">Followers: <strong>{{profile.followersCount}}</strong> </div>
              <div  style=" text-align: center;">Following: <strong>{{profile.followingCount}}</strong> </div>
           
            </div>
          </div> 
        </div> 
        <div v-if="!(user === null) && !(user.id == profile.user_id)" class="card text-center sidebar my-2">
          <div  class="card-body">
            <h1>Αφήστε Σχόλιο</h1>

          <form @submit="checkForm" id="Comment">
         
            <div class="form-group row  justify-content-center">
                    <label for="comment" class="col-md-4 col-form-label"></label>

                    <input id="comment" 
                            type="text"
                            class="form-control" 
                            name="comment"
                            autocomplete="comment" 
                            autofocus>

                
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ 'message' }}</strong>
                    </span>
                 
                    <div class="row pt-4">
                    <button type="submit" class="btn btn-dark">Εκχώρηση</button>
                </div> 
            </div> 
          </form>
             
           
          
          </div>
        </div>
      </div>
      <div class="col-md-8 mt-1">
        <div class="card mb-3 content text-center">
          <h1 class="m-3 pt-3"> {{ profileUser.name}}</h1>
           <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <h5>Περιγραφή: </h5>
              </div>
              <div v-if="profile.description == null">
                    <div v-if="!(user === null)">
                      <router-link v-if="user.id == profile.user_id" :to="'/EditProfile/'+this.$route.params.id">Προσθέστε Πληροφοριές</router-link>
                    </div>
              </div>
              <div v-else class="col-md-9 text-secondary">
              {{ profile.description}}
              </div>
            </div>
          <hr>
          <div class="row">
            <div class="col-md-3">
              <h5>Εmail: </h5>
            </div>
            <div class="col-md-9 text-secondary">
            {{ profileUser.email }}
            </div>
          </div>
    
        
      </div>
    </div>
    
      <div  class="mt-3">

        <div  style=" text-align: center; font-size:30px"><strong>Αγγελίες</strong>
        </div>
        <hr>
            
           
      </div>

      <div v-if="this.posts[0]"  class="card mb-3 content">
          <section class="post-list">

            <div v-for="post in filteredPosts" :key="post.id">
              <router-link :to="'/p/'+post.id" class="post">

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
            </div>


            <router-link to="/p/create" class="post">
 	    		    <figure class="post-image">
        			    <img src="/storage/profile/default.png">
      			  </figure>
       		    <span class="post-overlay">
         			  <p>
           				<span style="color:white;">Προσθήκη Νέας Αγγελίας</span>
       				  </p>
        		  </span>
 	    	    </router-link>


		      </section>
      </div>
      <div v-else class="text-center">
        <h3>Καμία αγγελία.</h3>
          
          <div v-if="!(user === null)">
                <router-link v-if="user.id == profile.user_id" to='/p/create'>Δημιουργήστε την πρώτη σας αγγελία.</router-link>
              </div>
      </div>
    
    <div v-if="this.comments[0]">
      <div class="mt-3">

        <div  style=" text-align: center; font-size:30px"><strong>Σχόλια</strong></div>
        <hr>
            
           
      </div>

   
      <div v-for="comment in comments" :key="comment.id" class="card mb-3 content text-center">
    
         <router-link :to="'/profile/'+comment.user_id"><h3 class="blue">{{comment.commentersname}}</h3></router-link>
          <p>
            <span >{{ comment.comment}}</span>
          </p>
          <span style="font-size:13px;">{{ comment.date }}</span>
 
							<form @submit.prevent="deletecomment(comment.id)" v-if="!(user === null)">
						   
								<button v-if="user.id == comment.user_id" type="submit" class="btn btn-link">Delete</button>
							</form>
		  </div>
	  </div>   	
  </div>
</div>



</div>






</template>


<script>
        export default {

                props: [ 'user'],

                data() {
                        return {
                        profile: {},
                        profileUser: {},
                        comments: {}, 
                        posts: {},
                        Loaded: false
                        }
                },

                methods:{
                  deletecomment(id){
                    axios.post('/api/deletecomment/'+id).then((response) => {
                      if(response.data.status == "success"){
                              this.getComments();
                      }
                    });
                  }, 
                  getProfileData(){                            
                    axios.get('/api/vue/profile/'+this.$route.params.id, this.user ).then((response) => {  
                      if(response.data.status == "success"){
                        this.profile = response.data.profile[0];
                        
                        if(this.profile.image == null)
                        {
                          this.profile.image = "/profile/default.png"
                        }
                      this.Loaded = true;
                      }
                    }).catch((error) => { 
                        alert('Δεν βρέθηκε το προφίλ που ψάχνετε\nΜεταβείτε στην Αρχική')
                        this.$router.push('/home')
                    });
                  },
                followclick(){
                    if(!(this.profile.follows))
                    {
                      console.log('follow');  
                      this.profile.follows = true;
                      this.profile.followersCount += 1;
                    }else{
                      console.log('unfollow');
                        this.profile.follows = false;
                        this.profile.followersCount -= 1; 
                    } 
                  }, 
                  getProfileUser(){
                    axios.get('/api/vue/getuser/'+this.$route.params.id ).then((response) => {  
                      if(response.data.status == "success"){
                        this.profileUser = response.data.user[0];
                      }
                    });
                  },
                  getComments(){
                    axios.get('/api/vue/getcomments/'+this.$route.params.id ).then((response) => {  
                      if(response.data.status == "success"){
                        this.comments =response.data.comments;
                      }
                    });
                  },
                  getPosts(){
                    if(this.profileUser){
                      axios.get('/api/vue/myposts/'+this.$route.params.id ).then((response) => {  
                        if(response.data.status == "success"){
                          this.posts =response.data.posts;
                        }
                      });
                    }
                  },
                  checkForm: function (e) {
                    var formContents = jQuery("#Comment").serialize();
                    axios.post('/api/c/store', formContents).then((response) => {  
                      if(response.data.status == "success"){
                    
                      this.getComments()
                      
                      }
                      else
                      {
                          alert(' Προσπαθήστε ξανά')
                      }
                    }, 
                    function() 
                    {
                            console.log('failed');
                    });
                    e.preventDefault();
                  }  
                },
                computed: {
                  filteredPosts() {
                    return this.posts.filter(post => {
                      return this.user && (this.user.id === post.user_id || post.verified === 1);
                    });
                  },
                },
                created(){
                  this.getProfileData()
                  this.getProfileUser()
                  this.getPosts()
                  this.getComments()
              }
               
        }
        

</script>