<template>
  <div id="homepage">
    <section class="text-center text-white bg-image backgroundImage">
      <div class="container home-container">
        <h1 class="display-1">Ανταλλαξέ το</h1>
        <h2 class="subtitle display-5">Δώσε ο,τι δεν χρειάζεσαι</h2>
        <div class="d-flex justify-content-center mt-4">
          <nuxt-link v-if="loggedin" to="/posts/create" class="btn btn-light">ΠΡΟΣΘΗΚΗ ΑΓΓΕΛΙΑΣ</nuxt-link>
          <nuxt-link v-else to="/login" class="btn btn-light">ΠΡΟΣΘΗΚΗ ΑΓΓΕΛΙΑΣ</nuxt-link>
        </div>
        <div class="d-flex flex-column align-items-center mt-3">
          <h2 class="display-5">Βρες ο,τι χρειαζεσαι</h2>
          <form  @submit.prevent="handleSearchSubmit" class="input-group mb-3 w-50">
            <input v-model="searchInputValue" type="text" class="form-control" aria-label="Sizing example input" placeholder="Αναζήτηση..." aria-describedby="inputGroup-sizing-default">
          </form>
        </div>
      </div>
    </section>

    <section class="text-center">
      <div class="container">
        <h2 class="display-4">Κορυφαίες Κατηγορίες</h2>
        <CategoriesHorizontalList />
        <div class="text-center mt-3">
          <nuxt-link to="/posts/" class="btn btn-outline-secondary">ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΑΓΓΕΛΙΕΣ</nuxt-link>
        </div>
      </div>
    </section>

    <ads></ads>

    <section>
      <div class="container">
        <h2 class="text-center">Προωθημένες Αγγελίες</h2>
        <div class="row">
          <div v-for="post in premiumPosts" :key="post.id" class="col-md-3 mb-4">
            <nuxt-link :to="{ path: '/posts/view', query: { id: post.id } }" class="text-decoration-none">
              <div class="card h-100">
                <img :src="`${$config.public.storageUrl }/${post.image0}`" class="card-img-top" style="height: 300px;" alt="Post Image">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">
                    {{ truncatedDescription(post.description) }}
                  </p>
                </div>
              </div>
            </nuxt-link>
          </div>
          <div class="col-md-3 mb-4">
            <nuxt-link to="#" class="text-decoration-none">
              <div class="card h-100">
                <img src="~assets/images/premium.png" class="card-img-top" alt="Post Image">
                <div class="card-body">
                  <h5 class="card-title">ΠΡΟΩΘΗΣΕ ΤΗΝ ΑΓΓΕΛΙΑ ΣΟΥ</h5>
                  <p class="card-text">Πατήστε εδώ για να επιλέξετε ή να προσθεσετε μια νέα</p>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
  .backgroundImage {
    background-image: url("/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 100%;
  }

  .home-container {
    padding: 6% 0 6% 0;
  }
</style>

<script>
      export default defineNuxtComponent({
        props:['loggedin'],
        setup() {
          const config = useRuntimeConfig();
          return { config }
        },
        async asyncData () {
          const config = useRuntimeConfig();

          return {
            premiumPosts: await $fetch(`${config.public.apiUrl}/vue/premiumPosts`)
          }
        },
        methods: {
          handleSearchSubmit() {
            // Change the router's view programmatically
            this.$router.push({ path: '/posts/' , query: { search: this.searchInputValue } });
          },
          truncatedDescription(description) {
            let n = 100;
            return (description.length > n) ? description.slice(0, n-1) + '...' : description;
          },
        }
      })
</script>