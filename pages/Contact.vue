<template>
  <section class="bg-light bg-gradient">
    <div class="container">
      <h1 class="text-center">Επικοινωνήστε μαζί μας</h1>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <form @submit.prevent="sendMessage" id="Message" class="mb-4">
            <div class="mb-3">
              <input :maxlength="25" type="text" placeholder="Όνομα" id="name" name="name" class="form-control" required>
            </div>
            <div class="mb-3">
              <input :maxlength="320" type="text" placeholder="Email" id="email" name="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <input :maxlength="15" type="text" placeholder="Θέμα" id="subject" name="subject" class="form-control" required>
            </div>
            <div class="mb-3">
              <textarea :maxlength="1300" placeholder="Μήνυμα" rows="10" id="message" name="message" class="form-control" required></textarea>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary">Αποστολή</button>
            </div>
          </form>
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-md-6 mb-4">
              <h5>Social</h5>
              <a title="facebook" target="_blank" href="https://www.facebook.com/%CE%91%CE%BD%CF%84%CE%B1%CE%BB%CE%BB%CE%B1%CE%BE%CE%AD%CE%A4%CE%BFgr-109427185179999">
                <font-awesome-icon :icon="['fab', 'facebook']" class="me-2" />
              </a>
              <a title="instagram" target="_blank" href="https://www.instagram.com/antallaxeto.gr/">
                <font-awesome-icon :icon="['fab', 'instagram']" class="me-2" />
              </a>
              <a title="twitter" target="_blank" href="https://twitter.com/antallaxe">
                <font-awesome-icon :icon="['fab', 'twitter']" class="me-2" />
              </a>
              <a target="_blank" href="https://discord.gg/6DR43sZ27V" title="discord">
                <font-awesome-icon :icon="['fab', 'discord']" class="me-2" />
              </a>
            </div>
            <div class="col-md-6 mb-4">
              <h5>Email</h5>
              <p>
                <a href="mailto:antallaxeto.gr@gmail.com">antallaxeto.gr@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup () {
      const config = useRuntimeConfig();
      return { config }
  },
  methods: {
    async sendMessage() {
      const form = new FormData(document.getElementById('Message'));
      try {
        const response = await fetch(this.config.public.apiUrl+'/sendMessage', {
          method: 'POST',
          body: form,
        });
        if (response.status === 200) {
          console.log('Successfully message sent');
          this.$router.push('/home');
          alert('Το Μήνυμα Στάλθηκε Επιτυχώς');
        } else {
          console.error('Failed');
          if (window.confirm('Παρουσιάστηκε αναπάντεχο πρόβλημα. Δοκιμάστε να επικοινωνήσετε στέλνοντα email στο antallaxeto.gr@gmail.com')) {
            window.location.href = 'mailto:antallaxeto.gr@gmail.com';
          }
        }
      } catch (error) {
        console.error('Failed', error);
      }
    },
  },
};
</script>