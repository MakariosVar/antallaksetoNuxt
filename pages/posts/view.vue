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
		<div v-else class="row justify-content-center m-2 bg-light border py-4 rounded pageMinFit">
			<div class="col-md-10 col-12">
				<p class="font-italic text-center alert alert-warning p-0" style="font-size:0.8rem">
					* Προτείνουμε οι ανταλλαγές να γίνονται έπειτα από αρκετή συνεννόηση
					και με φυσική παρουσία από εσάς ή κάποιον έμπιστο εκπρόσωπό σας ώστε να
					υπάρξει σωστή αξιολόγηση των αντικειμένων προτού προβείτε σε ανταλλαγή.
				</p>
			</div>
			<div class="col-12 row">
				<div class="col-md-12 col-lg-5 text-center">
					<img v-if="post.image0" :src="post.image0"
						style="height: auto; width: 299px" />
					<div>
						<img v-if="post.image1" :src="post.image1"
							style="height: auto; width: 147px" />
						<img v-if="post.image2" :src="post.image2"
							style="height: auto; width: 147px" />
					</div>
					<div>
						<img v-if="post.image3" :src="post.image3"
							style="height: auto; width: 147px" />
						<img v-if="post.image4" :src="post.image4"
							style="height: auto; width: 147px" />
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
								}}<img v-if="post.userimage" :src="post.userimage"
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
							<button v-if="!post.done" @click="postCompleted(post.id, user)"
								class="btn btn-outline-success ml-3 mx-1">
								Ολοκληρώθηκε
							</button>
							<button v-if="!post.done" @click="() => { $router.push({ path: '/posts/edit', query: { id: post.id } }) }"
								class="btn btn-outline-primary ml-3 mx-1">
								Επεξεργασία
							</button>
							<button type="submit" @click="deletePost(post.id, user)" class="btn btn-outline-danger ml-3 mx-1">
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
		if (data.post.image0) {
			data.post.image0 = await getImage(data.post.image0)
		}
		if (data.post.image1) {
			data.post.image1 = await getImage(data.post.image1)
		}
		if (data.post.image2) {
			data.post.image2 = await getImage(data.post.image2)
		}
		if (data.post.image3) {
			data.post.image3 = await getImage(data.post.image3)
		}
		if (data.post.image4) {
			data.post.image4 = await getImage(data.post.image4)
		}
		if (data.post.userimage) {
			data.post.userimage = await getImage(data.post.userimage)
		}
		
		post.value = data.post;
		loaded.value = true;
	}
};
await getPostData();

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

// Watch for changes in route.query.id and trigger getPostData accordingly
watch(() => route.query.id, () => {
  getPostData();
});


</script>
