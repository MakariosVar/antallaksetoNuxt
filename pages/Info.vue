<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body text-center">
        <img class="img-fluid mb-4" src="~assets/images/NewLogoPNG.png" alt="Logo">

        <h2 class="mb-4">H κοινότητα όπου η ανταλλαγή γίνεται πραγματικότητα!</h2>
        <p class="fs-5 mb-4 animated-text">
            Εδώ, η ανταλλαγή γίνεται πραγματικότητα. Ανακαλύψτε τον θησαυρό σας ή μοιραστείτε αυτά που δεν χρειάζεστε πια, και βοηθήστε στην ανακύκλωση και την επαναχρησιμοποίηση.        </p>
        
        <h3 class="mb-3">Πως Λειτουργεί:</h3>
        <p class="fs-5 mb-4 animated-text">
            Είναι απλό: δημιουργήστε μια αγγελία για το αντικείμενο που θέλετε να ανταλλάξετε ή αυτό που ψάχνετε. Αναζητήστε αντικείμενα που σας ενδιαφέρουν και επικοινωνήστε με άλλα μέλη για να συναλλαχθείτε.
        </p>

        <h3 class="mb-3">Η Ιδέα μας:</h3>
        <p class="fs-6 mb-4 animated-text">
            Η ανταλλαγή αγαθών και προϊόντων ενώνει ανθρώπους και επιδρά θετικά στην κοινότητα και τον πλανήτη μας.
        </p>

        <p class="fs-5 mb-4 animated-text">
          <strong>Βιώσιμοτητα:</strong> Η ανταλλαγή συμβάλλει στη μείωση της κατανάλωσης και των αποβλήτων. Όταν δίνουμε δεύτερη ευκαιρία σε αντικείμενα που δεν χρειαζόμαστε πλέον, μειώνουμε την ανάγκη για νέα παραγωγή.<br><br>
          <strong>Κοινότητα:</strong> Η ανταλλαγή ενισχύει τους δεσμούς στην κοινότητα. Όταν ανταλλάσσουμε αντικείμενα, γνωρίζουμε τους γείτονές μας και δημιουργούμε αλληλεγγύη και αμοιβαία υποστήριξη.<br><br>
          <strong>Δημιουργικότητα:</strong> Η ανταλλαγή ενθαρρύνει τη δημιουργικότητα και την ανακύκλωση. Κάτι που δεν έχει αξία για έναν άνθρωπο μπορεί να είναι θησαυρός για κάποιον άλλον, ενισχύοντας την επαναχρησιμοποίηση και τη δημιουργία νέων προϊόντων.
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.animated-text {
  animation: fadeInUp 1s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
