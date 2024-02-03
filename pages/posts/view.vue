<template>
	<div v-if="!post" :key="post.id"
		class="pageMinFit  d-flex flex-column align-items-center my-5 py-5">
		<p class="h2 loadingText"> Φόρτωση</p>
		<div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
	<div v-else class="container">
		<div v-if="!loaded" class="pageMinFit d-flex flex-column text-center">
			<div class="spinner-border text-dark" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<div v-else class="row justify-content-center m-2 bg-white shadow p-3 mb-5 bg-body border py-4 rounded pageMinFit">
			<div class="col-md-10 col-12">
				<p class="font-italic text-center alert alert-warning p-0" style="font-size:0.8rem">
					* Καλή προηγούμενη ενημέρωση μεταξύ των χρηστών και φυσική παρουσία κατά την ανταλλαγή των αντικειμένων διασφαλίζει την ικανοποίηση όλων.
				</p>
			</div>
			<div class="col-12 row">
				<div class="col-md-12 col-lg-5 text-center">
					<img v-if="post.image0_loaded" :src="post.image0_loaded" style="height: auto; width: 299px" />
					<div v-else-if="post.image0" class="d-flex justify-content-center align-items-center" style="width: 100%; height: 300px;">
						<div class="spinner-grow" style="color: #e4e3e3; width: 150px; height: 150px;" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
					<div>
						<img v-if="post.image2_loaded" :src="post.image2_loaded" style="height: auto; width: 147px" />
						<div v-else-if="post.image2" class="d-flex justify-content-center align-items-center" style="width: 100%; height: 150px;">
							<div class="spinner-grow" style="color: #e4e3e3; width: 75px; height: 75px;" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
						<img v-if="post.image1_loaded" :src="post.image1_loaded" style="height: auto; width: 147px" />
					</div>
					<div>
						<img v-if="post.image3_loaded" :src="post.image3_loaded" style="height: auto; width: 147px" />
						<img v-if="post.image4_loaded" :src="post.image4_loaded" style="height: auto; width: 147px" />
					</div>
				</div>
				<div class="col-md-12 col-lg-7 text-center text-lg-start">
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
<script setup>

const config = useRuntimeConfig();
const post = ref({});
const loaded = ref(false);
const route = useRoute();
const router = useRouter();

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
		loaded.value = true;
	}
};
await getPostData();

const loadImages = async () => {
	if (post.value) {
		const imageKeys = ['image0', 'image1', 'image2', 'image3', 'image4', 'userimage'];

		const imagePromises = imageKeys.map(async (key) => {
			if (post.value[key]) {
				post.value[key+"_loaded"] = await getImage(post.value[key]);

			}
		});
		// Wait for all image loading Promises to complete
		await Promise.all(imagePromises);
	}
}

onMounted(async () => {
	await loadImages();
})

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

if (props.user && post.value && (post.value.reEdit || !post.value.verified) && (props.user.id !== post.value.user_id)) {
	console.log('Not Auth')
}

// Watch for changes in route.query.id and trigger getPostData accordingly
watch(() => route.query.id, async () => {
	await getPostData();
	await loadImages()
});


</script>
