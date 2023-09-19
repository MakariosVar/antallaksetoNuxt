<template>
  <!-- <section id="carousel_00c7" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
    <ol class="carousel-indicators">
      <li data-bs-target="#carousel_00c7" data-bs-slide-to="0" class="active"></li>
      <li data-bs-target="#carousel_00c7" data-bs-slide-to="1"></li>
      <li data-bs-target="#carousel_00c7" data-bs-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="container">
          <h1 class="display-4">Πως Λειτουργεί:</h1>
          <p class="lead">
            Δημιουργήστε τις δικές σας αγγελίες δίνοντας τα απαραίτητα στοιχεία επικοινωνίας
            ή κάντε αναζήτηση ό,τι ψάχνετε στις διαθέσιμες αγγελίες.
          </p>
          <router-link class="h2" :to="loggedin ? '/p/create' : '/login'">
            {{ loggedin ? 'Δημιουργήστε μια Αγγελία' : 'Δημιουργήστε μια Αγγελία' }}
          </router-link>
          <router-link class="h2" to="/terms">Όροι και προϋποθέσεις χρήσης</router-link>
          <p class="text-warning font-italic">
            * Προτείνουμε οι ανταλλαγές να γίνονται έπειτα από αρκετή συνεννόηση
            και με φυσική παρουσία από εσάς ή κάποιον έμπιστο εκπρόσωπό σας ώστε να
            υπάρξει σωστή αξιολόγηση των αντικειμένων προτού προβείτε σε ανταλλαγή.
          </p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carousel_00c7" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carousel_00c7" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </section> -->
  <div id="carouselExampleCaptions" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="~assets/images/bg.jpg" style="max-height: 70vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <div class="container bg-dark mb-5 py-4 rounded">
            <h1 class="display-4">Πως Λειτουργεί:</h1>
            <p class="lead">
              Δημιουργήστε τις δικές σας αγγελίες δίνοντας τα απαραίτητα στοιχεία επικοινωνίας
              ή κάντε αναζήτηση ό,τι ψάχνετε στις διαθέσιμες αγγελίες.
            </p>
            <router-link class="h2" :to="loggedin ? '/p/create' : '/login'">
              {{ loggedin ? 'Δημιουργήστε μια Αγγελία' : 'Δημιουργήστε μια Αγγελία' }}
            </router-link>
            <br>
            <router-link class="h2" to="/terms">Όροι και προϋποθέσεις χρήσης</router-link>
            <p class="text-warning font-italic">
              * Προτείνουμε οι ανταλλαγές να γίνονται έπειτα από αρκετή συνεννόηση
              και με φυσική παρουσία από εσάς ή κάποιον έμπιστο εκπρόσωπό σας ώστε να
              υπάρξει σωστή αξιολόγηση των αντικειμένων προτού προβείτε σε ανταλλαγή.
            </p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img src="~assets/images/mak.png" style="max-height: 70vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="~assets/images/sigmund-UorPU70_D60-unsplash.jpg" style="max-height: 70vh;" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
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
