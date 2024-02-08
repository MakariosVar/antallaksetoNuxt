<template>
  <div class="container" :key="useRouter().query">
    <div class="row">
      <div class="col-12 py-2">
        <div class="d-flex flex-column align-items-center border bg-white shadow-sm mb-5 bg-body p-2">
          <h3>Όλες οι αγγελίες</h3>
            <div>
              <a href="#" class="link-secondary" @click.prevent="onShowFiltersClick">
                Φίλτρα
                <ClientOnly>  
                  <font-awesome-icon v-if="!showFilters" :icon="['fas', 'caret-down']" class="me-2" />
                  <font-awesome-icon v-else :icon="['fas', 'caret-up']" class="me-2" />
                </ClientOnly>
              </a>
            </div>
          <form v-if="showFilters" @submit.prevent="search" style="width: 70%;" class="border p-3">
            <div class="input-group mb-2">
              <input v-model="searchTitle" @blur="search" class="form-control form-control" type="text" placeholder="Ψάχνω για..">
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
                <PostAddressInput @placeSelected="onPlaceSelected" @clearSearch="clearSearchPlace" :placeId="place_id" :postLocation="addressInput" :isIndexPage="true"/>
              </div>
              <div class="col-12 col-md-6 mb-2">
                <v-select 
                  v-model="searchCategory"
                  placeholder="Όλες οι κατηγορίες..."
                  label="text"
                  :options="formattedCategories"
                />
              </div>
            </div>
            <div class="my-2 text-center">
              <button type="submit" class="btn btn-sm btn-outline-secondary">Αναζήτηση</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
          <Adsbygoogle id="ca-pub-5907299200218208" style="max-height:200px; width: 100%;"/>
      </div>
    </div>
    <div class="d-flex" style="height: 100%;" v-if="noResultsFlag">
      <div class="m-auto text-center">
          <img style="max-height: 150px;" src="~assets/images/NewLogoPNG.png" alt="Logo">
          <h2>Ούπς!</h2>
          <h4>
              Δέν βρέθηκαν αγγελίες
          </h4>
        <a href="#" class="btn btn-outline-secondary" @click.prevent="resetSearchQuery">Αφαίρεση φίλτρων</a>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div v-for="(post, index) in combinedPostsAndAds" :key="index" class="col post">
        <!-- <Adsbygoogle v-if="post.isAd" :id="'ca-pub-5907299200218208'" class="card shadow p-3 mb-5 bg-body h-100" style="height: 300px; width: 100%;" /> -->
        <nuxt-link :to="{ path: '/posts/view', query: { id: post.id } }" class="h-100">
          <div class="card shadow bg-body h-100">
            <img v-if="post.imageURL" :src="post.imageURL" class="card-img-top" style="height: 300px;" alt="Post Image">
            <div v-else class="d-flex justify-content-center align-items-center" style="width: 100%; height: 300px;">
                <div class="spinner-grow" style="color: #e4e3e3; width: 150px; height: 150px;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <nuxt-link :to="{path:`/posts`, query: {place: post.fullAddress.id}}" @click.prevent.stop class="card-text link-secondary">{{ `${post.fullAddress.name_el}` }}</nuxt-link>
            </div>
          </div>
        </nuxt-link>
      </div>
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
  
  const showFilters = ref(true);
  const noResultsFlag = ref(false);
  const loadingMorePosts = ref(false);
  const searchTitle = ref(route?.query?.search ?? '');
  const addressInput = ref('');
  const place_id = ref(route?.query?.place ?? '');
  const placeObject = ref(route?.query?.place ?? '');
  const searchCategory = ref(route?.query?.category ?? '');
  const page = ref(0);
  
  const fetchPosts = async () => {
    page.value++;
      try {
        const { data: postData } = await useFetch(`/api/posts?page=${page.value}&category=${searchCategory.value}&q=${searchTitle.value}&place=${place_id.value}`);
        const response = postData.value.posts_all;

        if (response && response.length === 0) {
          noResultsFlag.value = true;
        } else {
          noResultsFlag.value = false;
        }
        if (page.value === 1) {
          posts.value = response;
        } 

      } catch (error) {
        console.error(error);
      }
  };
  await fetchPosts();

  const onPlaceSelected = (place) => {
    place_id.value = place
    search()
    // addressInput.value = place.fullAddress
    // placeObject.value = place
  }

  const formattedCategories = computed(() => {
    let formatted = [];
    categories.forEach((category) => {

      formatted.push({ id: category.title, text: category.title });
    });
    return formatted;
  });

  const combinedPostsAndAds = computed(() => {
    return posts.value.data;

    // const combined = [];
    // const adFrequency = 5; // Display ad every 5 posts
    // let postCounter = 0;

    // for (let i = 0; i < posts.value.data.length; i++) {
    //   if (postCounter === adFrequency) {
    //     combined.push({ isAd: true });
    //     postCounter = 0;
    //   }
    //   combined.push({ isAd: false, post: posts.value.data[i] });
    //   postCounter++;
    // }

    // return combined;
  });

  watch(
    () => searchCategory.value,
    (value) => {
        if (value && value.id) {
          searchCategory.value = value.id;
          search();
          return;
        }
        searchCategory.value = null;
        search();
    }
  );

  const search = async () => {
    page.value = 1;
    const router = useRouter();
    const queryParams = {
      category: searchCategory.value,
      search: searchTitle.value,
      place: place_id.value
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

      if (place_id.value) {
        url = url+`&place=${place_id.value}`
      }
      // if (placeObject.value) {
      //   url = url+`&place=${JSON.stringify(placeObject.value)}`
      // }
      const { data: postData } = await useFetch(url);
      const response = postData.value.posts_all;
      if (response && response.data.length === 0) {
        noResultsFlag.value = true;
      } else {
        noResultsFlag.value = false;
      }
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
    searchCategory.value = null
    search();
  }

  const resetSearchQuery = () => {
    place_id.value = ""
    searchTitle.value = ""
    searchCategory.value = null
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
        if (place_id.value) {
          url = url+`&place=${place_id.value}`
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
    var filterSet = false;
    if (useRoute().query.category && useRoute().query.category != searchCategory.value) {
      searchCategory.value = useRoute().query.category;
      showFilters.value = true;
      filterSet = true;

    }
    if (useRoute().query.place && useRoute().query.place != place_id.value) {
      place_id.value = useRoute().query.place;
      showFilters.value = true;
      filterSet = true;
    }
    if (useRoute().query.search && useRoute().query.search != searchTitle.value) {
      searchTitle.value = useRoute().query.search;
      showFilters.value = true;
      filterSet = true;
    }

    if (filterSet) {
      search();
    }
  };
  watch(
    () => route.query,
    (newQuery) => {
      var filterSet = false;

      if (newQuery.search && newQuery.search != searchTitle.value) {
        searchTitle.value = newQuery.search;
        filterSet = true;
      }
      if (newQuery.place && newQuery.place != place_id.value) {
        place_id.value = newQuery.place;
        filterSet = true;
      }
      if (newQuery.category && newQuery.category != searchCategory.value) {
        searchCategory.value = newQuery.category;
        filterSet = true;
      }
      if (filterSet) {
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