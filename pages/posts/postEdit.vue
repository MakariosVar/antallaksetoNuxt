<template>
  
        
<div class="container">

        <form @submit="checkForm" enctype="multipart/form-data" id="EditPost" >
   
      <!--  @method('PATCH')-->

        <div class='row'>
                <div class="col-8 offset-2">
                        <div class="row text-center">
                                <h1>Διαμόρφωση Πληροφοριών Αγγελίας</h1>
                        </div>

                        <div class="form-group row">
                    <label for="title" class="col-md-4 col-form-label">Τίτλος</label>

                    <input id="title" 
                            type="text"
                            class="form-control" 
                            name="title"
                            autocomplete="title" 
                            
                            :value="this.post.title"
                            autofocus>

       
                    <span class="invalid-feedback" role="alert">
                        <strong> message </strong>
                    </span>

         
                </div>   
                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label"> Περιγραφή </label>

                    <input id="description" 
                            type="text"
                            class="form-control" 
                            name="description"
                            autocomplete="description"
                            :value="this.post.description"
                            autofocus>

                
                    <span class="invalid-feedback" role="alert">
                        <strong> message </strong>
                    </span>
        
                 
                </div>   
                <div class="form-group row">
                    <label for="adlocation" class="col-md-4 col-form-label"> Τοποθεσία</label>

                    <input id="adlocation" 
                            type="text"
                            class="form-control" 
                            name="adlocation"
                            autocomplete="adlocation"
                            :value="this.post.adlocation"
                            autofocus>

         
                    <span class="invalid-feedback" role="alert">
                        <strong> message </strong>
                    </span>
                
                
                </div>  
                <div class="form-group row">
                        <label for="category" class="col-md-4 col-form-label">Κατηγορία</label>
                        <select  id="category" name="category"  aria-label="category">
                            <option :value="this.post.category" selected>{{ this.post.category }}</option>
                            <option v-for="category in categories" v-bind:key="category.id"  :value="category.title">{{ category.title}}</option>
                        </select>
                </div> 
 
                <div class="form-group row">
                    <label for="condition" class="col-md-4 col-form-label">Κατάσταση</label>

                        <select   id="condition" name="condition">
                            <option value="Καινούριο">Καινούριο</option>
                            <option value="Μεταχειρισμένο" selected>Μεταχειρισμένο</option>
                            <option value="Με φθορές">Με φθορές</option>
                        </select>
                </div>  

                <div class="form-group row">
                    <label for="phone" class="col-md-4 col-form-label">Τηλέφωνο Επικοινωνίας</label>

                    <input id="phone" 
                            type="text"
                            class="form-control" 
                            name="phone"                
                            autocomplete="phone"
                            :value="this.post.phone" 
                            autofocus>

               
                    <span class="invalid-feedback" role="alert">
                        <strong> message </strong>
                    </span>
               
                
                </div>  
                <div class="form-group row">
                    <label for="transferPref" class="col-md-4 col-form-label">Προτίμηση Ανταλλαγής </label>

                    <input id="transferPref" 
                            type="text"
                            class="form-control" 
                            name="transferPref"
                            autocomplete="transferPref"
                            :value="this.post.transferPref" 
                            autofocus>

         
                    <span class="invalid-feedback" role="alert">
                        <strong> message </strong>
                    </span>
                  
                
                </div> 

        
                
              
               



                   
                <div class="row pt-4">
                    <button class="btn btn-primary ">Εκχώρηση</button>
                </div> 
            
                </div>
        </div>
        </form>


</div>
</template>
  

<script>
        export default {
        data(){
            return{
           
             post: {},
             categories: {},
            }
        },
        mounted() {
        
        },
        
        methods:{

        getPostData(){
                            
                                axios.get('/api/vue/post/'+this.$route.params.id ).then((response) => {  
                                                if(response.data.status == "success"){
                                                  this.post = response.data.post[0];
                                                    
                                          
                                                }
                
                                })
                        },
    
        checkForm: 
                function (e) {
                    
                        
                        
                        let dataForUpdate = jQuery("#EditPost").serialize();
                      
                  
                           
                           
                       
                          
                        axios.patch('/api/p/'+this.post.id, dataForUpdate).then(
                            
                           this.$router.push('/p/'+this.post.id));
                        e.preventDefault();
                }, 
                getCategories(){
                        axios.get('/api/vue/categories').then((response) => {
                                this.categories = response.data
                        });
                }
        }, 
        created(){
                this.getPostData()
                this.getCategories()
        }
    }
</script>