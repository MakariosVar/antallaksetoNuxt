<template>
<section id="carousel_00c7" class="u-carousel u-slide u-block-6788-1" data-u-ride="carousel" data-interval="5000">
      <ol class="u-absolute-hcenter u-carousel-indicators u-block-6788-2">
        <li data-u-target="#carousel_00c7" data-u-slide-to="0" class="u-active u-grey-30"></li>
        <li data-u-target="#carousel_00c7" class="u-grey-30" data-u-slide-to="1"></li>
        <li data-u-target="#carousel_00c7" class="u-grey-30" data-u-slide-to="2"></li>
      </ol>
      <div class="u-carousel-inner" role="listbox">
        <div class="skrollable skrollable-between u-active u-align-center u-carousel-item u-clearfix u-image u-shading u-section-1-1" src="" data-image-width="1080" data-image-height="1080">
          <div class="u-clearfix u-sheet u-sheet-1">
            <h1 class="u-text u-text-1 infotext">Πως Λειτουργεί:</h1>
              <p class="u-large-text u-text u-text-variant u-text-2 infotext">
                   Δημιουργήστε τις δικές σας αγγελίες δίνοντας τα απαραίτητα στοιχεία επικοινωνίας 
                   ή κάντε αναζήτηση ό,τι ψάχνετε στις διαθέσιμες αγγελίες.
              </p>
              <router-link class="h2" to="/p">Όλες οι Αγγελίες </router-link>
              <div v-if="loggedin">
                  <router-link class="h2" to="/p/create">Δημιουργήστε μια Αγγελία </router-link>
              </div>
              <div v-else>
                  <router-link class="h2" to="/login">Δημιουργήστε μια Αγγελία </router-link>
              </div>
              <router-link class="h2" to="/terms">Όροι και προϋποθέσεις χρήσης </router-link>
              <p class="u-text  u-text-2 text-warning font-italic">
                  * Προτείνουμε οι ανταλλαγές να γίνονται έπειτα απο αρκετοί συνεννόηση  
                  και με φυσική παρουσία απο εσάς ή κάποιον έμπιστο εκπρόσωπό σας ώστε να 
                  υπάρξει σωστή αξιολόγηση των αντικειμένων πρωτού προβείτε σε ανταλλαγή
              </p>
          </div>
        </div>
        <div class="skrollable skrollable-between u-align-center u-carousel-item u-clearfix u-image u-shading u-section-1-2" src="" data-image-width="1600" data-image-height="1479">
          <div class="u-clearfix u-sheet u-sheet-1">
            <h1 class="u-text u-text-1 infotext">Χρήσιμες πληροφορίες</h1>
            <p class="u-large-text u-text u-text-variant u-text-2 infotext infotext">Simple Text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum.<br>
              <br>Integer tincidunt nibh vel lectus tristique iaculis. Fusce congue est nibh, non dignissim ligula placerat iaculis. Integer eu lectus sed massa mollis aliquet. Nam placerat vestibulum elit, sit amet commodo tortor hendrerit nec. Duis volutpat nulla a mauris tincidunt blandit. Donec sed risus pulvinar, suscipit sapien id, volutpat sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque ut sapien ut augue maximus scelerisque ut vitae tortor. Morbi congue vulputate nisl, in condimentum nunc. Suspendisse potenti. Morbi feugiat justo risus, accumsan ullamcorper ante fermentum et. Ut convallis, erat aliquam tincidunt auctor, massa nisi mattis risus, et tempor justo orci sed urna. Duis lobortis vulputate scelerisque.<br>
            </p>
          </div>
        </div>
        <div class="skrollable skrollable-between u-align-center u-carousel-item u-clearfix u-image u-shading u-section-1-3" src="" data-image-width="4108" data-image-height="3318">
          <div class="u-clearfix u-sheet u-sheet-1">
            <h1 class="u-text u-text-1 infotext">Σχετικά με εμάς</h1>
            <p class="u-large-text u-text u-text-variant u-text-2 infotext">Simple Text. Lorem ipsum dSed rutrum dolor sit amet consequat rhoncus. Nam porta hendrerit vestibulum. Nam sed diam lectus. Etiam at dui urna. Donec consequat ante dolor, in lobortis ipsum molestie sed. Ut purus diam, ullamcorper et libero quis, efficitur accumsan ante. Fusce luctus, lacus sollicitudin dignissim varius, quam nulla venenatis augue, ac posuere orci ipsum id enim. Curabitur efficitur elit sit amet lorem tempus semper. Aliquam libero mauris, gravida eu mattis ut, tincidunt ornare arcu.<br>Proin ac elit at tellus viverra posuere vitae id urna<br>. Maecenas iaculis quam neque,<br>et auctor magna consequat<br>a. Interdumolor sit amet, consectetur adipiscing elit. Curabitur id suscipit ex. Suspendisse rhoncus laoreet purus quis elementum.
            </p>
          </div>
        </div>
      </div>
      <a class="u-absolute-vcenter u-carousel-control u-carousel-control-prev u-text-body-alt-color u-block-6788-3" href="#carousel_00c7" role="button" data-u-slide="prev">
        <span aria-hidden="true">
          <svg viewBox="0 0 477.175 477.175"><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                    c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"></path></svg>
        </span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="u-absolute-vcenter u-carousel-control u-carousel-control-next u-text-body-alt-color u-block-6788-4" href="#carousel_00c7" role="button" data-u-slide="next">
        <span aria-hidden="true">
          <svg viewBox="0 0 477.175 477.175"><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"></path></svg>
        </span>
        <span class="sr-only">Next</span>
      </a>
    </section>
    
   


        
</template>
<script>
    export default{
      data(){
        return{
          loggedin:this.$attrs.loggedin
        }
      }
        
    }
    
</script>