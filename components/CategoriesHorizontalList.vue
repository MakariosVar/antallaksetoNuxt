<template>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="row">
            <div class="col-1">
                <button class="carousel-control-prev me-auto" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <span class="btn btn-secondary carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
            </div>
            <div class="col-10">
                <div class="carousel-inner">
                    <div :class="['carousel-item', index === 0 ? 'active' : '']" :key="index"
                        v-for="(categoryChunk, index) in categoryChunks">
                        <div class="row d-flex flex-nowrap">
                            <div v-for="category in categoryChunk" :key="category.id" class="col-sm-3 col-6  mb-3">
                                <nuxt-link :to="{ path: '/posts', query: { category: category.title } }"
                                    class="text-decoration-none">
                                    <div class="card shadow p-3 mb-5 bg-body h-100 d-flex flex-column align-items-center py-2">
                                        <span class="text-primary card-img-top" style="max-width:  5vw;"
                                            v-html="category.svg"></span>
                                        <div class="card-body" style="height:100px">
                                            <p class="card-text text-muted" style="font-size:0.8rem">{{ category.count }} Αγγελίες</p>
                                            <h5 class="card-title">{{ category.title }}</h5>
                                        </div>
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-1">
                <button class="carousel-control-next me-auto" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <span class="btn btn-secondary carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
const { categories } = defineProps(['categories'])
const isMobile = ref(false);
const chunkSize = ref(4);
const categoryChunks = ref([]);

const adjustChunkSize = () => {
    if (process.client) {
        isMobile.value = window.innerWidth < 572;
    }
    chunkSize.value = isMobile.value ? 2 : 4;
    categoryChunks.value = [];
    for (let i = 0; i < categories.length; i += chunkSize.value) {
        categoryChunks.value.push(categories.slice(i, i + chunkSize.value));
    }
};

adjustChunkSize();
onMounted(() => {
    if (process.client) {
        window.addEventListener('resize', adjustChunkSize);
    }
});

onBeforeUnmount(() => {
    if (process.client) {
        window.removeEventListener('resize', adjustChunkSize);
    }
});
</script>
  
  
  