<template>
	<div v-if="post && (post.reEdit || !post.verified) && user && user.id != post.user_id" :key="post.id"
		class="pageMinFit  d-flex flex-column align-items-center my-5 py-5">
		<p class="h2 loadingText"> Φόρτωση</p>
		<div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
	<div v-else-if="post" class="container">
		<div v-if="!loaded" class="pageMinFit d-flex flex-column text-center">
			<div class="spinner-border text-dark" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<div v-else class="row m-2 bg-light border py-4 rounded pageMinFit">
			<div class="row">
				<div class="col-md-12 col-lg-5 text-center">
					<img v-if="post.image0" :src="`${$config.public.storageUrl}/${post.image0}`"
						style="height: auto; width: 299px" />
					<div>
						<img v-if="post.image1" :src="`${$config.public.storageUrl}/${post.image1}`"
							style="height: auto; width: 147px" />
						<img v-if="post.image2" :src="`${$config.public.storageUrl}/${post.image2}`"
							style="height: auto; width: 147px" />
					</div>
					<div>
						<img v-if="post.image3" :src="`${$config.public.storageUrl}/${post.image3}`"
							style="height: auto; width: 147px" />
						<img v-if="post.image4" :src="`${$config.public.storageUrl}/${post.image4}`"
							style="height: auto; width: 147px" />
					</div>
				</div>
				<div class="col-md-12 col-lg-7 text-center text-lg-start">
					<p class="postText">
						<strong>{{ post.title }}</strong><span v-if="post.verified == 0" class="text-danger"><i> ( ΔΕΝ ΕΧΕΙ
								ΕΓΚΡΙΘΕΙ ΑΚΟΜΑ
								)</i></span>
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
						<small><strong>Περιοχή:</strong> {{ `${post.fullAddress.locality}, ${post.fullAddress.country}`
						}}</small>
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
								}}<img v-if="post.userimage" :src="`${$config.public.storageUrl}/${post.userimage}`"
									class="rounded-circle ml-2" style="width: 50px; height: auto" /></router-link></small>
					</p>
					<p class="postText">
						<small><strong>Email:</strong> {{ post.email }}</small>
					</p>
					<p class="postText">
						<small><strong>Τηλέφωνο:</strong> {{ post.phone }}</small>
					</p>
					<p class="postText">
						<small><strong>Ημερομηνία:</strong> {{ post.date }}</small>
					</p>
					<div v-if="loggedin && user.id == post.user_id" class="text-center">
						<div>
							<button @click="() => { $router.push({ path: '/posts/edit', query: { id: post.id } }) }"
								class="btn btn-outline-primary ml-3 mx-1">
								Επεξεργασία
							</button>
							<button type="submit" @click="deletePost" class="btn btn-outline-danger ml-3 mx-1">
								Διαγραφή
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<PostRelated :post="post" :key="post.id" />
	</div>
</template>
<script>
	export default {
		props: ['loggedin', 'user'],
	}
</script>
<script setup>

const config = useRuntimeConfig();
const post = ref({});
const loaded = ref(false);
const route = useRoute();
const router = useRouter();

const getPostData = async () => {
	const response = await $fetch("/api/post?id=" + route.query.id);
	const data = response.post;
	if (data.status == "success") {
		post.value = data.post;
		loaded.value = true;
	}
};
await getPostData();

const deletePost = async () => {
	if (confirm("Πατόντας ΟΚ η αγγελία θα διαγραφεί, είστε σίγουροι;") == true) {
		const response = await fetch(`${config.value.public.apiUrl}/p/${post.value.id}/${props.user.auth_token}`, {
			method: 'DELETE',
		});
		const data = await response.json();
		if (data.status === 'success') {
			router.push({ name: 'Profile', query: { id: props.user.id } });
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

// Watch for changes in route.query.id and trigger getPostData accordingly
watch(() => route.query.id, () => {
  getPostData();
});


</script>
