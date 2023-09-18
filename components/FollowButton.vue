<template>
    <div>
          <button class="btn btn-primary" @click="followUser" v-text="buttonText"></button>
    </div>
    
</template>

<script>
    export default {

        props: ['userId', 'follows'],

        data(){
            return{
                followtext:this.follows
            }
        },
       
        methods: {
            followUser(){
               axios.post('/api/follow/'+ this.userId)
               .then(response =>{

                   this.followtext = ! this.followtext;

            
                   
               })
               .catch(errors => {
                   if(errors.response.status == 401){
                       window.location = '/login';
                   }
               });
            }
            
        },
        computed:{
            buttonText(){
                return (this.followtext) ? 'Unfollow' : "Follow";
            }
        }
    }
</script>
