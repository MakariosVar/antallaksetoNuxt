<template>
    <div id="homepage">
        <section class="text-center text-white bg-image backgroundImage">
            <div class="container home-container">
                <div class="rounded py-2 mx-3">
                    <h1 class="display-1">Ανταλλαξέ το</h1>
                    <h2 class="subtitle display-5">Δώσε ο,τι δεν χρειάζεσαι</h2>
                    <div class="d-flex justify-content-center mt-4">
                        <nuxt-link v-if="loggedin" to="/posts/create" class="btn btn-light">ΠΡΟΣΘΗΚΗ ΑΓΓΕΛΙΑΣ</nuxt-link>
                        <nuxt-link v-else to="/login" class="btn btn-light">ΠΡΟΣΘΗΚΗ ΑΓΓΕΛΙΑΣ</nuxt-link>
                    </div>
                    <div class="d-flex flex-column align-items-center mt-3">
                        <h2 class="display-5">Βρες ο,τι χρειαζεσαι</h2>
                        <form @submit.prevent="handleSearchSubmit" class="input-group mb-3 w-50">
                            <input v-model="searchInputValue" type="text" class="form-control" aria-label="Sizing example input"
                                placeholder="Αναζήτηση..." aria-describedby="inputGroup-sizing-default">
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <section class="text-center">
            <div class="container">
                <h2 class="display-4">Κορυφαίες Κατηγορίες</h2>
                <CategoriesHorizontalList v-if="categories" :categories="categories" />
                <div class="text-center my-3">
                    <nuxt-link to="/posts/" class="btn btn-outline-secondary">ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΑΓΓΕΛΙΕΣ</nuxt-link>
                </div>
            </div>
        </section>
        <section>
            <div class="container">
                <h2 class="text-center">Προωθημένες Αγγελίες</h2>
                <div class="row">
                    <div v-for="post in premiumPosts" :key="post.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <nuxt-link :to="{ path: '/posts/view', query: { id: post.id } }" class="text-decoration-none">
                            <div class="card h-100">
                                <img v-if="post.imageURL" :src="post.imageURL" class="card-img-top" style="height: 300px;" alt="Post Image">
                                <div v-else class="d-flex justify-content-center align-items-center" style="width: 100%; height: 300px;">
                                    <div class="spinner-grow" style="color: #e4e3e3; width: 150px; height: 150px;" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">{{ post.title }}</h5>
                                    <p class="card-text">
                                        {{ truncatedDescription(post.description) }}
                                    </p>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                    <!-- <div class="col-md-3 mb-4">
            <nuxt-link to="#" class="text-decoration-none">
              <div class="card h-100">
                <img src="~assets/images/premium.png" class="card-img-top" alt="Post Image">
                <div class="card-body">
                  <h5 class="card-title">ΠΡΟΩΘΗΣΕ ΤΗΝ ΑΓΓΕΛΙΑ ΣΟΥ</h5>
                  <p class="card-text">Πατήστε εδώ για να επιλέξετε ή να προσθεσετε μια νέα</p>
                </div>
              </div>
            </nuxt-link>
          </div> -->
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



<script setup>
    const { loggedin } = defineProps(['loggedin'])
    const searchInputValue = ref('')

    const handleSearchSubmit = () => {
        // Change the router's view programmatically
        const router = useRouter();
        router.push({ path: '/posts', query: { search: searchInputValue.value } });
    }

    const truncatedDescription = (description) => {
        let n = 100;
        return description.length > n ? description.slice(0, n - 1) + '...' : description;
    }

    const getImage = async (path) => {
        try {
            const response = await $fetch(`/api/image?image=${path}`);
            const imageRes = response.imageRes;

            if (imageRes) {
                return `data:image/jpeg;base64,${imageRes}`;
            }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    // Fetch premiumPosts
    const { data: premiumPostsData } = await useFetch('/api/premiumPosts');
    const premiumPosts = premiumPostsData.value?.posts ?? [];
    onMounted(() => {
        premiumPosts.forEach(async (post) => {
            if (post.image0) {
                const imageURL = await getImage(post.image0);
                post.imageURL = imageURL
            }
        })
    })
    // console.log(premiumPosts);

    // Fetch categories
    const { data: categoriesData } = await useFetch('/api/categories');
    const categories = categoriesData.value?.categories ?? [];
    // console.log(categories);

</script>