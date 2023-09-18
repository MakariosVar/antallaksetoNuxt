<template>
        

    <section class="u-clearfix u-grey-5 u-section-2" id="carousel_8dd6">
      <div class="u-clearfix u-sheet u-sheet-1 ">
        <div class="u-align-centeru-grey-70 black bg-light bg-gradient">
          <div class="u-container-layout u-valign-middle-xl u-valign-middle-xs u-container-layout-2">
            <h1 class="u-text   text-center"> Επικοινωνήστε μαζί μας</h1>
            <div class="u-align-left u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-form u-form-2">
            
            
            <form @submit.prevent="sendMessage" id="Message" class="u-clearfix u-form-spacing-28 u-form-vertical u-inner-form">
                <div class="u-form-group u-form-name u-form-group-2">
                 
                  <input :maxlength="25" type="text" placeholder="Όνομα" id="name" name="name" class=" u-hover-grey-light-3 u-input u-input-rectangle u-white" required>
                </div>
                  <div class="u-form-subject u-form-group u-form-group-2">
                
                  <input :maxlength="320" type="text" placeholder="email" id="email" name="email" class=" u-hover-grey-light-3 u-input u-input-rectangle u-white" required>
                </div>
                <div class="u-form-subject u-form-group u-form-group-2">
                
                  <input :maxlength="15" type="text" placeholder="Θέμα" id="subject" name="subject" class=" u-hover-grey-light-3 u-input u-input-rectangle u-white" required>
                </div>
                <div class="u-form-group u-form-message u-form-group-3">
                  
                  <textarea :maxlength="1300" placeholder="Μήνυμα" rows="10" cols="50" id="message" name="message" class=" u-hover-grey-light-3 u-input u-input-rectangle u-white" required></textarea>
                </div> 
                <div class="u-align-center u-form-group u-form-submit u-form-group-4">
             
                  <input type="submit" class="u-active-yellow u-border-2 u-border-black u-btn u-btn-submit u-button-style u-hover-black u-none u-text-hover-white u-text-black u-btn-1" wfd-invisible="true">
                </div>  
            </form> 
            
            
            </div>
          </div>
        </div>
        <div>
          <div class="u-repeater u-repeater-2">
            <div class="u-align-center u-container-style u-list-item u-repeater-item u-white u-list-item-2">
              <div class="u-container-layout u-similar-container u-valign-top u-container-layout-2"><span class="u-file-icon u-icon u-icon-2"><img src="/images/978012.png" alt=""></span>
                <h5 class="u-text u-text-2">Social</h5>
                <p class="u-text u-text-3">FB:<br>INST:<br>TWT:<br>LNKD:
                </p>
              </div>
            </div>
            <div class="u-align-center u-container-style u-list-item u-repeater-item u-white u-list-item-2">
              <div class="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                <span class="u-icon u-icon-circle u-text-black u-icon-2">
                  <svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 512 512" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-9f82"></use></svg><svg class="u-svg-content" viewBox="0 0 512 512" x="0px" y="0px" id="svg-9f82" style="enable-background:new 0 0 512 512;"><g><g><path d="M507.49,101.721L352.211,256L507.49,410.279c2.807-5.867,4.51-12.353,4.51-19.279V121    C512,114.073,510.297,107.588,507.49,101.721z"></path>
                                </g></g><g><g><path d="M467,76H45c-6.927,0-13.412,1.703-19.279,4.51l198.463,197.463c17.548,17.548,46.084,17.548,63.632,0L486.279,80.51    C480.412,77.703,473.927,76,467,76z"></path>
                                </g></g><g><g><path d="M4.51,101.721C1.703,107.588,0,114.073,0,121v270c0,6.927,1.703,13.413,4.51,19.279L159.789,256L4.51,101.721z"></path>
                                </g></g><g><g><path d="M331,277.211l-21.973,21.973c-29.239,29.239-76.816,29.239-106.055,0L181,277.211L25.721,431.49    C31.588,434.297,38.073,436,45,436h422c6.927,0,13.412-1.703,19.279-4.51L331,277.211z"></path>
                                </g></g>
                    </svg>
                </span>
                <h5 class="u-text u-text-4">Email</h5>
                <p class="u-text u-text-5">
                  <a href="mailto:antallaxeto.gr@gmail.com" class="u-active-none u-border-1 u-border-palette-2-base u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-2-base u-btn-2">antallaxeto.gr@gmail.com</a>
                </p>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </section>
</template>

<script>
  export default{
    methods:{
      sendMessage(){
        let form = jQuery("#Message").serialize();
      
        axios.post('/api/sendMessage', form).then((response) =>{
      
         if(response.data.status == "success"){                                  
            console.log('succefully message send');
            this.$router.push('/home');
            alert('Το Μήνυμα Στάλθηκε Επιτυχώς')
          }else{
            console.log('FAILED');
            
            if (window.confirm('Παρουσιαστηκε αναπάντεχο πρόβλημα. Δοκιμάστε να επικοινωνήσετε στέλνοντα email στο antallaxeto.gr@gmail.com')) 
            {
              window.location.href='mailto:antallaxeto.gr@gmail.com';
            };
          }
        }) 
      }

    } 
  }  
</script> 