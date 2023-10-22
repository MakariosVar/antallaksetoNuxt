<template>
	<div class="container">
		<div v-if="!loaded" class="pageMinFit d-flex flex-column align-items-center">
			<h2 class="loadingText">Φόρτωση</h2>
			<div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<div v-else class="col m-2 justify-content-center rounded pageMinFit">
			<h1 class="text-center">ΕΞΕΤΑΣΗ ΑΓΓΕΛΙΩΝ</h1>
			<div v-if="!posts[0]" class="col text-center">
				<h2>Καμία Αγγελία</h2>
				<h3>Δεν υπάρχουν προς το παρόν αγγελίες προς πιστοποίηση</h3>
				<router-link class="h2" to="/home">Επιστροφή στην αρχική</router-link>
				<br>
				<router-link class="h2" to="/admin">Ή επισκεφτείτε το Admin PANEL</router-link>
			</div>
			<div v-else>
				<div v-for="post in posts" :key="post.id" class="card mb-3">
					<div class="row g-0">
						<div class="col-md-4 d-flex align-items-center justify-content-center">
							<img v-if="post.image0" :src="`${config.public.storageUrl}/${post.image0}`"
								class="img-fluid w-75">
						</div>
						<div class="col-md-8">
							<div class="card-body">
								<nuxt-link :to="{ path: '/posts/view', query: { id: post.id } }">
									<h5 class="card-title">{{ post.title }}</h5>
								</nuxt-link>
								<p class="card-text m-0"><strong>Περιγραφή :</strong> {{ post.description }}</p>
								<p class="card-text m-0"><strong>Περιοχή:</strong> {{ `${post.fullAddress.locality},
																	${post.fullAddress.country}` }}</p>
								<p class="card-text m-0"><strong>Κατηγορία:</strong> {{ post.category }}</p>
								<p class="card-text m-0"><strong>Κατάσταση:</strong> {{ post.condition }}</p>
								<p class="card-text m-0"><strong>Ανταλλαγή για:</strong> {{ post.transferPref }}</p>
								<p class="card-text m-0"><strong>Του Χρήστη:</strong><router-link
										:to="'/profile?id=' + post.user_id">{{ post.username }}</router-link></p>
								<p class="card-text m-0"><strong>Email:</strong> {{ post.email }}</p>
								<p class="card-text m-0"><strong>Τηλέφωνο:</strong> {{ post.phone }}</p>
								<p class="card-text m-0"><strong>Ημερομηνία:</strong> {{ post.date }}</p>
							</div>
							<div class="card-footer text-center">
								<div class="btn-group" role="group">
									<button v-if="user.role_id != 2" @click="verificate(post.id)"
										class="btn btn-outline-success">
										ΕΓΚΡΙΣΗ
									</button>
									<button v-if="user.role_id != 2 && !post.reEdit" @click="reEditPost(post.id)" class="btn btn-outline-warning">
										Διαμόρφωσή και Επαναξέταση
									</button>
									<button v-else disabled class="btn btn-outline-warning text-dark">
										Στάλθηκε ειδοποίηση
									</button>
									<button v-if="user.role_id != 2" @click="deletePost(post.id)" class="btn btn-outline-danger">
										Διαγραφή Αγγελίας
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
  
  


<script>

export default {
	props: ['user'],
	data() {
		return {
			posts: {},
			loaded: false,
		}
	},
	setup() {
		const config = useRuntimeConfig();
		return { config };
	},
	methods: {
		async getPosts() {
			let response = await $fetch(`/api/postsToVerificate?token=${this.user.auth_token}`);
			this.posts = response.post;
			this.loaded = true
		},
		async verificate(param) {
			let id = param;
			if (confirm("Πατόντας ΟΚ η αγγελία θα εγκριθεί και θα δημοσιοποιηθεί , είστε σίγουροι;") == true) {
				let formData = new FormData();
            	formData.append('auth_token', this.user.auth_token);
				const response = await fetch(`${this.config.public.apiUrl}/verificatepost/${id}`, {
					method: 'POST',
					body: formData,
				})
				const data = await response.json();
				if (data.status == "success") {
					this.getPosts();
				} else {
					alert('Σφάλμα')
					console.error(data.message)
				}
			}
		},
		async  deletePost(param) {
		 	let id = param;

		 	if (confirm("Πατόντας ΟΚ η αγγελία θα διαγραφεί, είστε σίγουροι;") == true) {
				let formData = new FormData();
            	formData.append('auth_token', this.user.auth_token);

		 		const response = await fetch (`${this.config.public.apiUrl}/p/${id}/${this.user.auth_token}`, {
					method: 'DELETE',
					body: formData,
				});
				const data = await response.json();
				if (data.status == "success") {
					this.getPosts();
				}
		 	}
		},
		async reEditPost(param) {
			let id = param;

			if (confirm("Πατόντας ΟΚ η αγγελία θα περάσει το στάδιο διαμόρφωσης και επαναξέτασης , είστε σίγουροι;") == true) {
				let formData = new FormData();
            	formData.append('auth_token', this.user.auth_token);
				const response = await fetch(`${this.config.public.apiUrl}/toreedit/${id}`, {
					method: 'POST',
					body: formData,
				})
				const data = await response.json();
				if (data.status == "success") {
					this.getPosts();
				} else {
					alert('Σφάλμα')
					console.error(data.message)
				}
			}
		}
	},
	created() {
		this.getPosts();
	}
}

</script> 