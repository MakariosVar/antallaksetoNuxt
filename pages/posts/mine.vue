<template>
    <div :key="id">
        <div v-if="!posts" class="pageMinFit text-center">
            <div class="d-flex justify-content-center">
                <img src="~assets/images/NewLogoPNG.svg" class="imageNotFound">
            </div>
            <div style="font-size: 40px;">
                <strong>Δεν έχετε καταχωρήσει αγγελίες ακόμη</strong>
                <br>
                <nuxt-link to="/p/create" class="btn btn-primary mt-3">Προώθηση Αγγελίας</nuxt-link>
            </div>
        </div>
        <div v-else>
            <div class="mt-3 text-center">
                <h1 class="display-4">Οι Αγγελίες μου</h1>
            </div>
            <div class="mt-3 text-center p-3">
                <nuxt-link to="/p/create" class="btn btn-primary btn-lg">Προώθηση Αγγελίας</nuxt-link>
            </div>
            <div class="container">
                <div class="row">
                    <nuxt-link v-for="post in posts" :key="post.id" :to="{ path: '/posts/view', query: { id: post.id } }"
                        class="col-md-3 col-sm-6 mb-4">
                        <div class="card">
                            <img :src="`${config.public.storageUrl}/${post.image0}`" class="card-img-top" alt="Post Image">
                            <div class="card-body">
                                <p v-if="post.verified == 1" class="card-text">{{ post.title }}</p>
                                <p v-else class="card-text text-warning">ΠΡΟΣ ΕΓΚΡΙΣΗ</p>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>
  


<script setup>

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const id = route.query.id ? String(route.query.id) : ''
const posts = ref([])
var wrongId = false;

const props = defineProps({
  user: Object
})

let response; // Define response variable here

onMounted(async () => {
    if (props.user.id != id) {
        router.push({ path: '/posts/mine', query: { id: props.user.id } })
        wrongId = true;
    }
    try {
        if (wrongId) {
            response = await fetch(`${config.public.apiUrl}/vue/myposts/${props.user.id}`)
        } else {
            response = await fetch(`${config.public.apiUrl}/vue/myposts/${id}`)
        }
        if (!response.ok) {
            throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        posts.value = data.posts
    } catch (error) {
        console.error('Error fetching data:', error)
    }
})
</script>