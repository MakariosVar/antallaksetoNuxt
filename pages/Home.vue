<template>
  <div id="homepage">
    <section class="text-center bg-image">
      <div class="container">
        <h1 class="display-4">Ανταλλαξέ το</h1>
        <h2 class="subtitle">Δώσε ο,τι δεν χρειάζεσαι</h2>
        <div class="d-flex justify-content-center mt-4">
          <nuxt-link v-if="loggedin" to="/p/create" class="btn btn-primary">ΠΡΟΣΘΗΚΗ ΑΓΓΕΛΙΑΣ</nuxt-link>
          <nuxt-link v-else to="/login" class="btn btn-primary">ΠΡΟΣΘΗΚΗ ΑΓΓΕΛΙΑΣ</nuxt-link>
        </div>
        <div class="text-center mt-3">
          <h2 class="text-white">Βρες ο,τι χρειαζεσαι</h2>
        </div>
        <div class="d-flex justify-content-center mt-4">
          <form @submit.prevent="handleSearchSubmit" class="w-50">
            <div class="input-group">
              <input v-model="searchInputValue" class="form-control form-control-lg" type="text" placeholder="Αναζήτηση...">
              <button type="submit" class="btn btn-primary">Αναζήτηση</button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section class="text-center">
      <div class="container">
        <h2 class="display-4">Κορυφαίες Κατηγορίες</h2>
        <PreLoader v-if="Object.keys(categories).length === 0"></PreLoader>
        <div v-else class="row">
          <div v-for="category in categories" :key="category.id" class="col-md-4">
            <nuxt-link @click="onClickCategory" :to="{ path: '/p', query: { category: category.title }}" class="text-decoration-none">
              <div class="card mb-4">
                <div class="card-body">
                  <span class="text-primary" v-html="category.svg"></span>
                  <h5 class="card-title">{{ category.title }}</h5>
                  <p class="card-text">{{ category.count }} Αγγελίες</p>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
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
            <nuxt-link :to="'/p/' + post.id" class="text-decoration-none">
              <div class="card h-100">
                <img :src="`/storage/${post.image0}`" class="card-img-top" alt="Post Image">
                <div class="card-body">
                  <h5 class="card-title">{{ post.title }}</h5>
                  <p class="card-text">{{ post.description }}</p>
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


<script>
       export default {
        
        props:['loggedin'],

        data() {
            return {
                premiumPosts: {},
                categories: {},
                searchInputValue: '',
            }
        },
        methods:{
          handleSearchSubmit (e) {
            e.preventDefault();
            this.$router.push({ path: '/p' , query: { search: this.searchInputValue } });
          },
          onClickCategory() {
            window.scrollTo(0, 0);
          },
          getPremiumPosts(){
            console.log('getPremiumPosts')

                  // axios.get('/api/vue/premiumPosts').then((response) => {
                  // this.premiumPosts = response.data
                  // })
          },
          getCategories(){
            console.log('getCategories')
                  // axios.get('/api/vue/categories').then((response) => {
                  // this.categories = response.data
                  // })
          }
          },
          created(){
                this.getPremiumPosts()
                this.getCategories()
          }
        }
</script>