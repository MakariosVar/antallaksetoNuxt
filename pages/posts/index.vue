<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-2">
        <div class="d-flex flex-column align-items-center border bg-light  p-2">
          <h3>Όλες οι αγγελίες</h3>
          <ClientOnly>  
            <div>
              <a href="#" class="link-secondary" @click.prevent="onShowFiltersClick">
                Φίλτρα
                <font-awesome-icon v-if="!showFilters" :icon="['fas', 'caret-down']" class="me-2" />
                <font-awesome-icon v-else :icon="['fas', 'caret-up']" class="me-2" />
              </a>
            </div>
          </ClientOnly>
          <form v-if="showFilters" @submit.prevent="search" style="width: 70%;" class="border p-3">
            <div class="input-group mb-2">
              <input v-model="searchTitle" @blur="search" class="form-control form-control-sm" type="text" placeholder="Ψάχνω για..">
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
            <div class="row">
              <div class="col-12 col-md-6 mb-2">
                <ClientOnly>
                  <PostAddressInput @placeSelected="onPlaceSelected" @clearSearch="clearSearchPlace" :postLocation="addressInput" :isIndexPage="true"/>
                </ClientOnly>
              </div>
              <div class="col-12 col-md-6 mb-2">
                <select v-model="searchCategory" @change="search" id="category" class="form-select form-select-sm w-100" name="category">
                  <option value="all">Όλες οι Κατηγορίες</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.title"
                    >
                    {{ category.title + '(' + category.count + ')' }}
                  </option>
                </select>
              </div>
            </div>
            <div class="my-2 text-center">
              <button type="submit" class="btn btn-sm btn-primary">Αναζήτηση</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
          <Adsbygoogle id="ca-pub-5907299200218208" style="height:200px; width: 100%;"/>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <nuxt-link v-for="post in posts.data" :key="post.id" :to="{ path: '/posts/view', query: { id: post.id } }" class="col post">
        <div class="card h-100">
          <img v-if="post.imageURL" :src="post.imageURL" class="card-img-top" style="height: 300px;" alt="Post Image">
          <div v-else class="d-flex justify-content-center align-items-center" style="width: 100%; height: 300px;">
              <div class="spinner-grow" style="color: #e4e3e3; width: 150px; height: 150px;" role="status">
                  <span class="visually-hidden">Loading...</span>
              </div>
          </div>
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
  
  const showFilters = ref(false);
  const loadingMorePosts = ref(false);
  const searchTitle = ref(route?.query?.search ?? '');
  const addressInput = ref('');
  const placeObject = ref(route?.query?.place ?? '');
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

  const onPlaceSelected = (place) => {
    addressInput.value = place.fullAddress
    placeObject.value = place
  }

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
      let url = `/api/posts?page=${page.value}`;
      if (searchCategory.value) {
        url = url+`&category=${searchCategory.value}`
      }
      if (searchTitle.value) {
        url = url+`&q=${searchTitle.value}`
      }
      if (placeObject.value) {
        url = url+`&place=${JSON.stringify(placeObject.value)}`
      }
      const { data: postData } = await useFetch(url);
      const response = postData.value.posts_all;
      response.data.forEach(async (post) => {
        if (post.image0) {
            const imageURL = await getImage(post.image0);
            post.imageURL = imageURL 
        }
      })
      posts.value = response;
    } catch (error) {
      console.error(error);
    }
  };

  const clearSearchPlace = () => {
    placeObject.value = ""
    search();
  }
  const clearSearch = () => {
    searchTitle.value = ""
    search();
  }
  const clearCategory = () => {
    searchCategory.value = "all"
    search();
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
        let url = `/api/posts?page=${page.value}`;
        if (searchCategory.value) {
          url = url+`&category=${searchCategory.value}`
        }
        if (searchTitle.value) {
          url = url+`&q=${searchTitle.value}`
        }
        if (placeObject.value) {
          url = url+`&place=${JSON.stringify(placeObject.value)}`
        }
        const { data: postData } = await useFetch(url);
        const response = postData.value ? postData.value.posts_all : null;

        if (page.value === 1) {
          posts.value = response;
        }  else if (response && response.data.length > 0) {
          const scrollYAfterLoad = window.scrollY; // Calculate the new scroll position

          response.data.forEach(async (post) => {
            if (post.image0) {
                const imageURL = await getImage(post.image0);
                post.imageURL = imageURL 
            }
          })
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
  onMounted(() => {
    if(posts.value) {
      posts.value.data.forEach(async (post) => {
        if (post.image0) {
            const imageURL = await getImage(post.image0);
            post.imageURL = imageURL 
        }
      })
    }
  }) 

  // Fetch categories
  const { data: categoriesData } = await useFetch('/api/categories');
  const categories = categoriesData.value?.categories ?? [];
    // console.log(categories);
  

  const queryCaught = () => {
    // console.log(useRoute().query)
    if (useRoute().query.category) {
      searchCategory.value = useRoute().query.category;
      showFilters.value = true;
    }
    if (useRoute().query.search) {
      searchTitle.value = useRoute().query.search;
      showFilters.value = true;
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
  
  const onShowFiltersClick = () => {
    showFilters.value = !showFilters.value
  }

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