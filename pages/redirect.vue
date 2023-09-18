 <template>
        <div  class="pageMinFit">
                <div class="d-flex justify-content-center">
                        <img src="/images/NewLogoPNG.svg" class="imageNotFound">
                </div>
                <div  style=" text-align: center; font-size:40px; "><strong>NOT FOUND 404</strong>
                        
                </div>
        </div>
 </template>
 
 <script>
 export default{
                created(){
                        alert('Υπήρξε λάθος στην Διεύθυνση (URL), προσπαθήστε ξανά');
                        this.$router.push('/home')
                }

        }
 </script>