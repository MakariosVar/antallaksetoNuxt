<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div data-bs-interval="10000" class="carousel-item active">
        <img src="~assets/images/NewLogoPNG.png" style="max-height: 70vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block bg-light py-4 rounded text-black">
          <h1 class="display-4">Καλωσορίσατε στο Ανταλλαξέτο.gr <br> Την κοινότητα όπου η ανταλλαγή γίνεται πραγματικότητα!</h1>
          <p class="lead">
            {{ `Στο Ανταλλαξέτο.gr, προσφέρουμε έναν χώρο όπου μπορείτε να ανακαλύψετε τον θησαυρό σας ή να μοιραστείτε 
            αυτά που δεν χρειάζεστε πια. Είναι η πλατφόρμα που σας δίνει τη δυνατότητα να βρείτε αυτό που ψάχνετε, ενώ 
            ταυτόχρονα μπορείτε να ανταλλάξετε αντικείμενα που θέλετε να δώσετε νέα ζωή.` }}
          </p>
        </div>
      </div>
      <div data-bs-interval="10000" class="carousel-item">
        <img src="~assets/images/bg.jpg" style="max-height: 70vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <div class="container bg-light py-4 rounded text-black">
            <h1 class="display-4">Πως Λειτουργεί:</h1>
            <p class="lead">
              Είναι πολύ απλό: δημιουργήστε μια αγγελία για το αντικείμενο που θέλετε να ανταλλάξετε ή αυτό που ψάχνετε.
               Αναζητήστε αντικείμενα που σας ενδιαφέρουν και επικοινωνήστε με άλλα μέλη για να συναλλαχθείτε. 
               Είναι ο τρόπος για να κάνετε οικονομία, να βρείτε σπάνια αντικείμενα και να συμβάλετε στην ανακύκλωση 
               και την επαναχρησιμοποίηση.
            </p>
            <router-link class="h2" :to="loggedin ? '/p/create' : '/login'">
              {{ loggedin ? 'Δημιουργήστε μια Αγγελία' : 'Δημιουργήστε μια Αγγελία' }}
            </router-link>
            <br>
            <router-link class="h2" to="/terms">Όροι και προϋποθέσεις χρήσης</router-link>
          </div>
        </div>
      </div>
      <div data-bs-interval="10000" class="carousel-item">
        <img src="~assets/images/sigmund-UorPU70_D60-unsplash.jpg" style="max-height: 70vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <div class="container bg-light py-4 rounded text-black">
            <p class="fs-5">Η ανταλλαγή αγαθών και προϊόντων είναι πολύ περισσότερο από απλά μια διαδικτυακή δραστηριότητα - είναι ένας τρόπος ζωής 
              που φέρνει μαζί ανθρώπους, δημιουργεί δεσμούς, και επιδρά θετικά στην κοινότητα και τον πλανήτη μας.
            </p>
            <ul class="text-start">
              <li>
                <span class="fw-bold">Βιώσιμοτητα:</span> 
                Η ανταλλαγή συμβάλλει στη μείωση της κατανάλωσης και των αποβλήτων. Όταν δίνουμε δεύτερη ευκαιρία σε αντικείμενα που δεν χρειαζόμαστε
                πλέον, μειώνουμε την ανάγκη για νέα παραγωγή.
              </li>
              <li>
                <span class="fw-bold">Οικονομία:</span> 
                Η ανταλλαγή επιτρέπει στους ανθρώπους να αποκτήσουν αντικείμενα χωρίς 
                να χρειάζεται να αγοράσουν κάτι καινούργιο. Αυτό μπορεί να είναι εξαιρετικά οικονομικό.
              </li>
              <li>
                <span class="fw-bold">Κοινότητα:</span> 
                Η ανταλλαγή ενισχύει τους δεσμούς στην κοινότητα. Όταν ανταλλάσσουμε αντικείμενα, 
                γνωρίζουμε τους γείτονές μας και δημιουργούμε αλληλεγγύη και αμοιβαία υποστήριξη.
              </li>
              <li>
                <span class="fw-bold">Δημιουργικότητα:</span> 
                Η ανταλλαγή ενθαρρύνει τη δημιουργικότητα και την ανακύκλωση. Κάτι που δεν έχει αξία για έναν άνθρωπο μπορεί να είναι θησαυρός για κάποιον άλλον, 
                ενισχύοντας την επαναχρησιμοποίηση και την δημιουργία νέων προϊόντων.
              </li>
              <li>
                <span class="fw-bold">Ευτυχία:</span> 
                Η ανταλλαγή μπορεί να προκαλέσει χαρά και ικανοποίηση, καθώς η ανακάλυψη και η προσφορά δώρων 
                μπορεί να είναι ευχάριστη και επιβραβευτική εμπειρία.
              </li>
            </ul>
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
