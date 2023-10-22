<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-3">
        <div class="d-flex flex-column align-items-center border bg-light mx-5 p-2">
          <h3>Αναζήτηση</h3>
          <form @submit.prevent="search" style="width: 70%;">
            <div class="input-group mb-3">
              <input v-model="searchTitle" @blur="search" class="form-control" type="text" placeholder="Ψάχνω για..">
              <span v-if="searchTitle" class="input-group-text p-0">
                <ClientOnly>
                  <font-awesome-icon
                   :icon="['fas', 'times']"
                   class="btn" 
                   @click="clearSearch"
                  />
                </ClientOnly>
              </span>
            </div>
            <div class="input-group mb-3">
              <select v-model="searchCategory" @change="search" id="category" class="form-select form-select-sm" name="category">
                <option value="all">Όλες οι Κατηγορίες</option>
                <option
                v-for="category in categories"
                :key="category.id"
                :value="category.title"
                >
                {{ category.title + '(' + category.count + ')' }}
              </option>
            </select>
            <span v-if="searchCategory && searchCategory != 'all'" class="input-group-text p-0">
              <ClientOnly>
                <font-awesome-icon
                  :icon="['fas', 'times']"
                  class="btn" 
                  @click="clearCategory"
                />
              </ClientOnly>
            </span>
          </div>
            <div class="">
              <button type="submit" class="btn btn-primary">Αναζήτηση</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <nuxt-link v-for="post in posts.data" :key="post.id" :to="{ path: '/posts/view', query: { id: post.id } }" class="col post">
        <div class="card h-100">
          <img :src="`${$config.public.storageUrl}/${post.image0}`" class="card-img-top" style="height: 300px;" alt="Post Image">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">Περιοχή: {{ `${post.fullAddress.locality}, ${post.fullAddress.country}` }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
  const posts = ref({
    data: [],
    current_page: 1,
    last_page: 1,
  });
  const route = useRoute();

  const loadingMorePosts = ref(false);
  const searchTitle = ref(route?.query?.search ?? '');
  const searchCategory = ref(route?.query?.category ?? 'all');
  const page = ref(0);

  const fetchPosts = async () => {
    page.value++;

      try {
        const { data: postData } = await useFetch(`/api/posts?page=${page.value}&category=${searchCategory.value}&q=${searchTitle.value}`);
        const response = postData.value.posts_all;

        if (page.value === 1) {
          posts.value = response;
        } 

      } catch (error) {
        console.error(error);
      }
  };

  const search = async () => {
    page.value = 1;
    const router = useRouter();
    const queryParams = {
      page: page.value,
      category: searchCategory.value,
      search: searchTitle.value
    };
    router.push({ query: queryParams });

    // Reset page value to 1 when performing a new search.
    try {
      const { data: postData } = await useFetch(`/api/posts?page=${page.value}&category=${searchCategory.value}&q=${searchTitle.value}`);
      const response = postData.value.posts_all;
      posts.value = response;
    } catch (error) {
      console.error(error);
    }
  };

  const clearSearch = () => {
    searchTitle.value = ""
    search();
  }
  const clearCategory = () => {
    searchCategory.value = "all"
    search();
  }

  const fetchMorePosts = async () => {
    if (loadingMorePosts.value) {
      return;
    }

    const scrollYBeforeLoad = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollYBeforeLoad + windowHeight >= documentHeight - 100) {
      loadingMorePosts.value = true;
      page.value++;

      try {
        const { data: postData } = await useFetch(`/api/posts?page=${page.value}&category=${searchCategory.value}&q=${searchTitle.value}`);
        const response = postData.value ? postData.value.posts_all : null;

        if (page.value === 1) {
          posts.value = response;
        }  else if (response && response.data.length > 0) {
          const scrollYAfterLoad = window.scrollY; // Calculate the new scroll position

          posts.value.data = [...posts.value.data, ...response.data];
          posts.value.current_page = response.current_page;
          posts.value.last_page = response.last_page;

          // Calculate the difference in scroll position and adjust
          const scrollPositionDiff = window.scrollY - scrollYAfterLoad;
          window.scrollTo(0, scrollYBeforeLoad - scrollPositionDiff);
        }
      } catch (error) {
        console.error(error);
      }

      loadingMorePosts.value = false;
    }
  };
  await fetchPosts();

  // Fetch categories
  const { data: categoriesData } = await useFetch('/api/categories');
  const categories = categoriesData.value.categories;
  // console.log(categories);
  

  const queryCaught = () => {
    // console.log(useRoute().query)
    if (useRoute().query.category) {
      searchCategory.value = useRoute().query.category;
      
    }
    if (useRoute().query.search) {
      searchTitle.value = useRoute().query.search;
    }
  };
  watch(
      () => route.query,
      (newQuery) => {
        if (newQuery.search) {
          searchTitle.value = newQuery.search;
          search();
        }
      }
    );
  
  
  onMounted(async() => {
    const router = useRouter();
    await router.isReady();
    queryCaught();
    window.addEventListener('scroll', fetchMorePosts);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', fetchMorePosts);
  });
</script>