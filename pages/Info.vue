<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div data-bs-interval="10000" class="carousel-item active">
        <img src="~assets/images/NewLogoPNG.png" style="height: 100vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption bg-light py-4 rounded text-black">
          <h1>Καλωσορίσατε στο Ανταλλαξέτο.gr <br> Την κοινότητα όπου η ανταλλαγή γίνεται πραγματικότητα!</h1>
          <p class="lead" style="font-size:0.9rem">
            {{ `Στο Ανταλλαξέτο.gr, προσφέρουμε έναν χώρο όπου μπορείτε να ανακαλύψετε τον θησαυρό σας ή να μοιραστείτε 
            αυτά που δεν χρειάζεστε πια. Είναι η πλατφόρμα που σας δίνει τη δυνατότητα να βρείτε αυτό που ψάχνετε, ενώ 
            ταυτόχρονα μπορείτε να ανταλλάξετε αντικείμενα που θέλετε να δώσετε νέα ζωή.` }}
          </p>
        </div>
      </div>
      <div data-bs-interval="10000" class="carousel-item">
        <img src="~assets/images/bg.jpg" style="height: 100vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption">
          <div class="container bg-light py-4 rounded text-black">
            <h1>Πως Λειτουργεί:</h1>
            <p class="lead" style="font-size: 0.9rem;">
              Είναι πολύ απλό: δημιουργήστε μια αγγελία για το αντικείμενο που θέλετε να ανταλλάξετε ή αυτό που ψάχνετε.
               Αναζητήστε αντικείμενα που σας ενδιαφέρουν και επικοινωνήστε με άλλα μέλη για να συναλλαχθείτε. 
               Είναι ο τρόπος για να κάνετε οικονομία, να βρείτε σπάνια αντικείμενα και να συμβάλετε στην ανακύκλωση 
               και την επαναχρησιμοποίηση.
            </p>
            <router-link class="text-black" :to="loggedin ? '/p/create' : '/login'">
              {{ loggedin ? 'Δημιουργήστε μια Αγγελία' : 'Δημιουργήστε μια Αγγελία' }}
            </router-link>
            <br>
            <router-link class="text-black" to="/terms">Όροι και προϋποθέσεις χρήσης</router-link>
          </div>
        </div>
      </div>
      <div data-bs-interval="10000" class="carousel-item">
        <img src="~assets/images/sigmund-UorPU70_D60-unsplash.jpg" style="height: 100vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption">
          <div class="container bg-light py-4 rounded text-black">
            <p style="font-size: 0.8rem;" class="fw-bold">Η ανταλλαγή αγαθών και προϊόντων είναι πολύ περισσότερο από απλά μια διαδικτυακή δραστηριότητα - είναι ένας τρόπος ζωής 
              που φέρνει μαζί ανθρώπους, δημιουργεί δεσμούς, και επιδρά θετικά στην κοινότητα και τον πλανήτη μας.
            </p>

              <p style="font-size: 0.7rem">
                <u>Βιώσιμοτητα:</u><br>
                Η ανταλλαγή συμβάλλει στη μείωση της κατανάλωσης και των αποβλήτων. Όταν δίνουμε δεύτερη ευκαιρία σε αντικείμενα που δεν χρειαζόμαστε
                πλέον, μειώνουμε την ανάγκη για νέα παραγωγή.<br>

                <u>Κοινότητα:</u><br> 
                Η ανταλλαγή ενισχύει τους δεσμούς στην κοινότητα. Όταν ανταλλάσσουμε αντικείμενα, 
                γνωρίζουμε τους γείτονές μας και δημιουργούμε αλληλεγγύη και αμοιβαία υποστήριξη.<br>

                <u>Δημιουργικότητα:</u><br> 
                Η ανταλλαγή ενθαρρύνει τη δημιουργικότητα και την ανακύκλωση. Κάτι που δεν έχει αξία για έναν άνθρωπο μπορεί να είναι θησαυρός για κάποιον άλλον, 
                ενισχύοντας την επαναχρησιμοποίηση και την δημιουργία νέων προϊόντων.<br>
              </p> 
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    loggedin: Boolean,
  },
};
</script>
