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
            <div class="container my-3">
                <h2 class="my-3">Κορυφαίες Κατηγορίες</h2>
                <CategoriesHorizontalList v-if="categories" :categories="categories" />
            </div>
        </section>
        <div class="text-center">
            <div class="text-center my-3">
                <nuxt-link to="/posts/" class="btn btn-lg pulse btn-outline-dark constant-tilt-shake">ΔΕΙΤΕ ΟΛΕΣ ΤΙΣ ΑΓΓΕΛΙΕΣ</nuxt-link>
            </div>
        </div>
        <section>
            <div class="container">
                <h2 class="text-center mb-3">Προωθημένες Αγγελίες</h2>
                <div class="row">
                    <div v-for="post in premiumPosts" :key="post.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <nuxt-link :to="{ path: '/posts/view', query: { id: post.id } }" class="text-decoration-none">
                            <div class="card shadow mb-5 bg-body h-100">
                                <img v-if="post.imageURL" :src="post.imageURL" class="card-img-top responsive-image" alt="Post Image">
                                <div v-else class="d-flex justify-content-center align-items-center" style="width: 100%; height: 300px;">
                                    <div class="spinner-grow" style="color: #e4e3e3; width: 150px; height: 150px;" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <p class="card-title h5">{{ post.title }}</p>
                                    <p class="card-text">
                                        {{ truncatedDescription(post.description) }}
                                    </p>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-light py-5">
            <div class="container">
                <h2 class="text-center mb-4">Πώς δουλεύει;</h2>
                <div class="row">
                    <div class="col-md-4 py-2">
                        <div class="card card-hover h-100 border-0 rounded-3 shadow-lg p-4">
                            <div class="text-center mb-3">
                                <ClientOnly>
                                    <font-awesome-icon icon="fa fa-user-plus" class="fa-3x mb-3" />
                                </ClientOnly>
                                <h5 class="mb-3">Δημιουργία δωρεάν λογαριασμού</h5>
                            </div>
                            <p class="text-muted text-center">
                                Αρχικά, δημιουργείτε έναν δωρεάν λογαριασμό στο Antallakseto.gr.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 py-2">
                        <div class="card card-hover h-100 border-0 rounded-3 shadow-lg p-4">
                            <div class="text-center mb-3">
                                <ClientOnly>
                                    <font-awesome-icon icon="fa fa-search" class="fa-3x mb-3" />
                                </ClientOnly>
                                <h5 class="mb-3">Δημιουργία αγγελίας ή αναζήτηση</h5>
                            </div>
                            <p class="text-muted text-center">
                                Στη συνέχεια, μπορείτε να δημιουργήσετε μια αγγελία ή να αναζητήσετε αντικείμενα που σας ενδιαφέρουν.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 py-2">
                        <div class="card card-hover h-100 border-0 rounded-3 shadow-lg p-4">
                            <div class="text-center mb-3">
                                <ClientOnly>
                                    <font-awesome-icon icon="fa fa-comments" class="fa-3x mb-3" />
                                </ClientOnly>
                                <h5 class="mb-3">Αναμονή επικοινωνίας</h5>
                            </div>
                            <p class="text-muted text-center">
                                Τέλος, απλά περιμένετε για επικοινωνία από άλλα μέλη ή επικοινωνήστε εσείς αν υπάρχει ενδιαφέρον για κάποιο αντικείμενο.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-light py-5">
            <div class="container">
                <h2 class="text-center mb-3">Γιατί να επιλέξετε το Antallakseto.gr;</h2>
                <div class="row">
                    <div class="col-md-4 py-2">
                        <div class="card card-hover h-100 border-0 rounded-3 shadow-lg p-4">
                            <div class="text-center mb-3">
                                <ClientOnly>
                                    <font-awesome-icon icon="fa fa-recycle" class="fa-3x mb-3" />
                                </ClientOnly>
                                <h5 class="mb-3">Προστασία του περιβάλλοντος</h5>
                            </div>
                            <p class="text-muted text-center">
                                Μειώνοντας τα απορρίμματα και προωθώντας την ανακύκλωση, συμβάλλουμε στην προστασία του περιβάλλοντος.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 py-2">
                        <div class="card card-hover h-100 border-0 rounded-3 shadow-lg p-4">
                            <div class="text-center mb-3">
                                <ClientOnly>
                                    <font-awesome-icon icon="fa fa-handshake" class="fa-3x mb-3" />
                                </ClientOnly>
                                <h5 class="mb-3">Ενίσχυση κοινωνικών δεσμών</h5>
                            </div>
                            <p class="text-muted text-center">
                                Μέσω των ανταλλαγών αντικειμένων, ενισχύουμε τις σχέσεις μεταξύ των ανθρώπων και δημιουργούμε ένα πιο ενωμένο κοινωνικό περιβάλλον.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4 py-2">
                        <div class="card card-hover h-100 border-0 rounded-3 shadow-lg p-4">
                            <div class="text-center mb-3">
                                <ClientOnly>
                                    <font-awesome-icon icon="fa fa-lightbulb" class="fa-3x mb-3" />
                                </ClientOnly>
                                <h5 class="mb-3">Προώθηση δημιουργικότητας</h5>
                            </div>
                            <p class="text-muted text-center">
                                Ανακαλύπτοντας νέους τρόπους αξιοποίησης των αντικειμένων που αποκτάτε, ενθαρρύνετε τη δημιουργικότητά σας και συνεισφέρετε στη διατήρηση του περιβάλλοντος.
                            </p>
                        </div>
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

.card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.home-container {
    padding: 6% 0 6% 0;
}

@keyframes tilt-shaking {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(0deg); }
  20% { transform: rotate(1deg); }
  30% { transform: rotate(0eg); }
  40% { transform: rotate(-1deg); }
  50% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
.constant-tilt-shake {
  animation: tilt-shaking 1s infinite;
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