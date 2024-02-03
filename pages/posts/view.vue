<template>
	<div v-if="loaded || post" class="container">
		<div class="row justify-content-center m-2 bg-white shadow p-3 mb-5 bg-body border py-4 rounded pageMinFit">
			<div class="col-md-10 col-12">
				<p class="font-italic text-center alert alert-warning p-0" style="font-size:0.8rem">
					* Καλή προηγούμενη ενημέρωση μεταξύ των χρηστών και φυσική παρουσία κατά την ανταλλαγή των αντικειμένων διασφαλίζει την ικανοποίηση όλων.
				</p>
			</div>
			<div class="col-12 row">
				<div class="col-md-12 col-lg-4 text-center">
					<div v-if="!isImagesLoaded" class="d-flex justify-content-center align-items-center" style="width: 100%; height: 150px;">
						<div class="spinner-grow" style="color: #e4e3e3; width: 75px; height: 75px;" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
					<div v-else class="my-2">
						<viewer :images="post_images"
							@inited="inited"
							:options="viewerOptions"
							class="viewer"
							ref="viewer"
						>
							<template #default>
								<div class="row justify-content-center my-2">
									<div class="row justify-content-center">
										<div class="col-12 border rounded" v-if="post_images.length > 0">
											<img :key="post_images[0]" :src="post_images[0]" style="max-height: auto; width: 100%" />
										</div>
									</div>
									<div class="row justify-content-center my-2">
										<div v-for="image in post_images.slice(1, 5)" :key="image" class="col-3 border rounded">
											<img :src="image" style="height: auto; width: 100%" />
										</div>
									</div>
								</div>
							</template>
						</viewer>
					</div>
				</div>
				<div class="col-md-12 col-lg-8 text-center text-lg-start">
					<p class="postText">
						<strong>{{ post.title }}</strong>
						<span v-if="post.done" class="badge bg-success">ΟΛΟΚΛΗΡΩΜΕΝΗ</span>
						<span v-if="post.verified == 0" class="text-danger"><i> ( ΔΕΝ ΕΧΕΙ ΕΓΚΡΙΘΕΙ ΑΚΟΜΑ )</i></span>
					</p>
					<div v-if="post.reEdit == 1" class="border m-3 border-danger rounded">
						<p class="text-center">
							Η Αγγελία σας δεν πληρεί τα κριτήρια για δημοσίευση,<br />
							παρακαλούμε προβείτε σε διαμορφώσεις των πληροφορίων της
							αγγελίας
							και θα την επαναξετάσουμε
						</p>
						<div v-if="loggedin && user.id == post.user_id" class="text-center">
							<p>
								<router-link class="btn btn-outline-primary text-center"
									:to="{ path: '/posts/edit', query: { id: post.id } }">Επεξεργασία</router-link>
							</p>
						</div>
						<p class="small text-center">
							<i>*Μετά απο μεγάλο χρονικό διάστημα χωρίς τροποποίηση
								πληροφοριών
								η αγγελία σας θα διαγραφεί</i>
						</p>
					</div>
					<p class="postText">
						<small><strong> Περιγραφή : </strong>{{ post.description }}</small>
					</p>
					<p class="postText">
						<small><strong>Περιοχή:</strong> {{ post.fullAddress.name_el }}</small>
					</p>
					<p class="postText">
						<small><strong>Κατηγορία:</strong> {{ post.category }}</small>
					</p>
					<p class="postText">
						<small><strong>Κατάσταση:</strong> {{ post.condition }}</small>
					</p>
					<p class="postText">
						<small><strong>Ανταλλαγή για:</strong> {{ post.transferPref }}</small>
					</p>
					<p class="postText">
						<small><strong>Του Χρήστη:</strong><router-link :to="'/profile?id=' + post.user_id">
								{{ post.username
								}}<img v-if="post.userimage_loaded" :src="post.userimage_loaded" class="rounded-circle ml-2"
									style="width: 50px; height: auto" /></router-link></small>
					</p>
					<p class="postText">
						<small><strong>Email:</strong> {{ post.email }}</small>
					</p>
					<p class="postText">
						<small><strong>Τηλέφωνο:</strong> {{ post.phone }}</small>
					</p>
					<p class="postText">
						<small><strong>Ημερομηνία:</strong> {{ post.date.slice(0, 10) }}</small>
					</p>
					<div v-if="loggedin && user.id == post.user_id" class="text-center">
						<div>
							<button v-if="!post.done" @click="postCompleted(post.id, user)"
								class="btn btn-outline-success ml-3 mx-1">
								Ολοκληρώθηκε
							</button>
							<button v-if="!post.done"
								@click="() => { $router.push({ path: '/posts/edit', query: { id: post.id } }) }"
								class="btn btn-outline-primary ml-3 mx-1">
								Επεξεργασία
							</button>
							<button type="submit" @click="deletePost(post.id, user)"
								class="btn btn-outline-danger ml-3 mx-1">
								Διαγραφή
							</button>
						</div>
					</div>
					<div v-else>
						<ClientOnly>
							<p class="postText">
								<small>
									<strong>
										Εντόπισες κάποιο λάθος;
									</strong>
									<Report 
										:user="user"
										:object_type="'POST'"
										:object_id="post.id"
										@sessionExpired="$emit('sessionExpired')"
									/>
								</small>
							</p>
						</ClientOnly>
					</div>
				</div>
			</div>
		</div>
		<PostRelated :post="post" :key="post.id" />
	</div>
</template>
<script  setup>

const post = ref({});
const isImagesLoaded = ref(false);
const route = useRoute();
const router = useRouter();

const post_images = ref([]);

const props = defineProps({
	user: {
		type: Object,
	},
	loggedin: {
		type: Number
	},
	loaded: {
		type: Boolean
	}
})

const getImage = async (path) => {
	try {
		const response = await $fetch(`/api/image?image=${path}`);
		let imageRes = response.imageRes;

		if (imageRes) {
			return `data:image/jpeg;base64,${imageRes}`;
		}
	} catch (error) {
		console.error('Error fetching image:', error);
	}
};
const getPostData = async () => {
	const response = await $fetch("/api/post?id=" + route.query.id);
	const data = response.post;
	if (data.status == "success") {
		post.value = data.post;
	}
};
await getPostData();

const loadImages = async () => {
	post_images.value = []
	isImagesLoaded.value = false;
	if (post.value) {
		const imageKeys = ['image0', 'image1', 'image2', 'image3', 'image4', 'userimage'];

		const imagePromises = imageKeys.map(async (key) => {
			if (post.value[key]) {
				post.value[key+"_loaded"] = await getImage(post.value[key]);
				post_images.value.push(post.value[key+"_loaded"])
			}
		});
		// Wait for all image loading Promises to complete
		await Promise.all(imagePromises);
		isImagesLoaded.value = true;
	}
}

onMounted(async () => {
	await loadImages();
})
const viewerOptions = ref({
	toolbar: {
    zoomIn: 0,
    zoomOut: 0,
    oneToOne: 0,
    reset: 0,
    prev: 4,
    play: {
      show: 0,
      size: 'large',
    },
    next: 4,
    rotateLeft: 0,
    rotateRight: 0,
    flipHorizontal: 0,
    flipVertical: 0,
  },
});
let $viewer = null
const inited = (viewer) => {
	$viewer = viewer
}

const postCompleted = async (id, user) => {
	if (confirm("Πατόντας ΟΚ η αγγελία θα επισημοποιηθεί ως ολοκληρωμένη, είστε σίγουροι;") == true) {
		const response = await $fetch(`/api/postDone?id=${id}&auth_token=${user.auth_token}`);
		const data = response.doneResponse
		if (data.status === 'success') {
			router.push({ name: 'Profile', query: { id: user.id } });
		}
		if (data.unauthorized) {
			$emit('sessionExpired');
		}
		if (data.expired) {
			$emit('sessionExpired');
		}
		if (data.post_not_found) {
			router.push({ name: 'Home' });
		}
	}
}

const deletePost = async (id, user) => {
	if (confirm("Πατόντας ΟΚ η αγγελία θα διαγραφεί, είστε σίγουροι;") == true) {
		const response = await $fetch(`/api/deletePost?id=${id}&auth_token=${user.auth_token}`);
		const data = response.deleteResponse
		if (data.status === 'success') {
			router.push({ name: 'Profile', query: { id: user.id } });
		}
		if (data.unauthorized) {
			$emit('sessionExpired');
		}
		if (data.expired) {
			$emit('sessionExpired');
		}
		if (data.post_not_found) {
			router.push({ name: 'Home' });
		}
	}
};

if (post.value && (post.value.reEdit || !post.value.verified) && (!props.user || (props.user.id !== post.value.user_id))) {
	await navigateTo({name:'Home'})
}

// Watch for changes in route.query.id and trigger getPostData accordingly
watch(() => route.query.id, async () => {
	await getPostData();
	await loadImages()
});


</script>
