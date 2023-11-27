<template>
    <div v-if="submit || loading" class="pageMinFit d-flex flex-column align-items-center my-5 py-5">
        <p class="h2 loadingText"> Φόρτωση</p>
        <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else class="container shadow mb-5 bg-body bg-light border my-3 py-3 border rounded">
        <h1 class="text-center">
            Προσθέστε νέα αγγελία
        </h1>
        <form @submit.prevent="submitForm" id="CreatePost" enctype="multipart/form-data">
            <div class="row">
                <div class="col-12 form-group">
                    <label for="title">
                        Τίτλος
                    </label>
                    <input :maxlength="60" v-model="form.title" id="title" type="text" class="form-control" name="title"
                        autocomplete="title" autofocus required>
                </div>
                <div class="col-12 form-group">
                    <label for="description">Περιγραφή</label>
                    <textarea :maxlength="300" v-model="form.description" id="description" class="form-control"
                        name="description" autocomplete="description" autofocus required rows="3"></textarea>
                </div>
                <div class="col-md-4 col-sm-6 form-group">
                    <label for="category">Κατηγορία</label>
                    <select v-model="form.category" class="form-control" id="category" name="category"
                        aria-label="category">
                        <option value="Διάφορα" selected>Διάφορα</option>
                        <option v-for="category in categories" :v-if="category.title != 'Διάφορα'" v-bind:key="category.id"
                            :value="category.title">{{ category.title }}</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-6 form-group">
                    <label for="condition">Κατάσταση</label>
                    <select v-model="form.condition" class="form-control" id="condition" name="condition">
                        <option value="Καινούριο">Καινούριο</option>
                        <option value="Μεταχειρισμένο" selected>Μεταχειρισμένο</option>
                        <option value="Με φθορές">Με φθορές</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-12 form-group">
                    <label for="phone" class="text-truncate">Τηλέφωνο Επικοινωνίας <em
                            class="text-muted">(προαιρετικό)</em></label>
                    <input :maxlength="10" v-on:keypress="NumbersOnly" v-model="form.phone" id="phone" type="text"
                        class="form-control" name="phone" autocomplete="phone" autofocus>
                </div>
                <div class="col-md-12 col-sm-12 form-group">
                    <ClientOnly>
                        <PostAddressInput @placeSelected="onPlaceSelected" :postLocation="post ? post.fullAddress : null" :required="isUpdate ? false : true"/>
                    </ClientOnly>
                </div>
                <div class="col-12 form-group">
                    <label for="transferPref">Προτίμηση Ανταλλαγής</label>
                    <textarea :maxlength="300" v-model="form.transferPref" id="transferPref" class="form-control"
                        name="transferPref" autocomplete="transferPref" autofocus required rows="2"></textarea>
                </div>
                <div class="form-group col-12">
                    <input disabled v-model="form.premium" type="checkbox" name="premium" value="0" id="premium">
                    <label for="premium"> Προωθημένη Αγγελία <em>(μη διαθέσιμο ακόμα)</em></label><br>
                </div>
                <div class="text-center col-12">
                    <h2>Φωτογραφίες</h2>
                    <p>*Απαραίτητη Τουλάχιστον μια (1) φωτογραφία</p>
                </div>
                <div class="col-12 row justify-content-center">
                    <!-- IMAGE 0-->
                    <div
                        class="col-12 d-flex flex-column justify-content-center align-items-center border border-rounded my-2 py-2">
                        <!-- Preview Area -->
                        <div v-if="this.newImageLoad0 || (this.post && this.post.image0)" class="w-25">
                            <img :src="getPreviewPhotoUrl0" alt="Image Preview" class="w-100" />
                        </div>
                        <div class="text-center">
                            <p>
                                Φωτογραφία 1*
                            </p>
                            <input @change="image0" class="form-control" type="file" name="image" id="newProfilePhoto1"
                                accept="image/*" :required="isUpdate ? false : true"/>
                            <label for="newProfilePhoto1" class="upload-file-block">
                            </label>
                        </div>
                    </div>
                    <!-- IMAGE 1-->
                    <div
                        class="col-12 d-flex flex-column justify-content-center align-items-center border border-rounded my-2 py-2">
                        <!-- Preview Area -->
                        <div v-if="this.newImageLoad1  || (this.post && this.post.image1)" class="w-25">
                            <img :src="getPreviewPhotoUrl1" alt="Image Preview" class="w-100" />
                        </div>
                        <div class="text-center">
                            <p>
                                Φωτογραφία 2
                            </p>
                            <input @change="image1" class="form-control" type="file" name="image" id="newProfilePhoto1"
                                accept="image/*" />
                            <label for="newProfilePhoto1" class="upload-file-block">
                            </label>
                        </div>
                    </div>
                    <!-- IMAGE 2-->
                    <div
                        class="col-12 d-flex flex-column justify-content-center align-items-center border border-rounded my-2 py-2">
                        <!-- Preview Area -->
                        <div v-if="this.newImageLoad2 || (this.post && this.post.image2)" class="w-25">
                            <img :src="getPreviewPhotoUrl2" alt="Image Preview" class="w-100" />
                        </div>
                        <div class="text-center">
                            <p>
                                Φωτογραφία 3
                            </p>
                            <input @change="image2" class="form-control" type="file" name="image" id="newProfilePhoto1"
                                accept="image/*" />
                            <label for="newProfilePhoto1" class="upload-file-block">
                            </label>
                        </div>
                    </div>
                    <!-- IMAGE 3-->
                    <div
                        class="col-12 d-flex flex-column justify-content-center align-items-center border border-rounded my-2 py-2">
                        <!-- Preview Area -->
                        <div v-if="this.newImageLoad3 || (this.post && this.post.image3)" class="w-25">
                            <img :src="getPreviewPhotoUrl3" alt="Image Preview" class="w-100" />
                        </div>
                        <div class="text-center">
                            <p>
                                Φωτογραφία 4
                            </p>
                            <input @change="image3" class="form-control" type="file" name="image" id="newProfilePhoto1"
                                accept="image/*" />
                            <label for="newProfilePhoto1" class="upload-file-block">
                            </label>
                        </div>
                    </div>
                    <!-- IMAGE 4-->
                    <div
                        class="col-12 d-flex flex-column justify-content-center align-items-center border border-rounded my-2 py-2">
                        <!-- Preview Area -->
                        <div v-if="this.newImageLoad4 || (this.post && this.post.image4)" class="w-25">
                            <img :src="getPreviewPhotoUrl4" alt="Image Preview" class="w-100" />
                        </div>
                        <div class="text-center">
                            <p>
                                Φωτογραφία 5
                            </p>
                            <input @change="image4" class="form-control" type="file" name="image" id="newProfilePhoto1"
                                accept="image/*" />
                            <label for="newProfilePhoto1" class="upload-file-block">
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <button type="submit" class="btn btn-primary">Εκχώρηση</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default defineNuxtComponent({
    props: ['user', 'post', 'isUpdate'],
    setup() {
        const config = useRuntimeConfig();
        return { config }
    },
    data() {
        return {
            loading: true,
            form: {
                title: '',
                description: '',
                adlocation: '',
                fullPlace: {},
                category: 'Διάφορα',
                condition: 'Μεταχειρισμένο',
                phone: '',
                transferPref: '',
                premium: '',
                image0: null,
                image1: null,
                image3: null,
                image2: null,
                image4: null,
            },
            categories: {},
            submit: false,
            newImageLoad0: false,
            newImageLoad1: false,
            newImageLoad2: false,
            newImageLoad3: false,
            newImageLoad4: false
        }
    },
    async asyncData() {
        const { data: categoriesData } = await useFetch('/api/categories');
        const categories = categoriesData.value?.categories ?? [];
        // console.log(categories);
        return {
            categories
        };

    },
    computed: {
        getPreviewPhotoUrl0 (){
            return (this.post && this.post.image0 && !this.newImageLoad0) ? `${this.post.imageURL0 ?? ''}` : this.newImageLoad0;
        },
        getPreviewPhotoUrl1 (){
            return (this.post && this.post.image1 && !this.newImageLoad1) ? `${this.post.imageURL1 ?? ''}` : this.newImageLoad1;
        },
        getPreviewPhotoUrl2 (){
            return (this.post && this.post.image2 && !this.newImageLoad2) ? `${this.post.imageURL2 ?? ''}` : this.newImageLoad2;
        },
        getPreviewPhotoUrl3 (){
            return (this.post && this.post.image3 && !this.newImageLoad3) ? `${this.post.imageURL3 ?? ''}` : this.newImageLoad3;
        },
        getPreviewPhotoUrl4 (){
            return (this.post && this.post.image4 && !this.newImageLoad4) ? `${this.post.imageURL4 ?? ''}` : this.newImageLoad4;
        },
    },
    methods: {
        onPlaceSelected(place) {
            this.form.fullPlace = place
        },
        async checkSession() {
            if (this.user) {
                const response = await $fetch(`/api/checkSession?token=${this.user.auth_token}`)
                if (response && response.sessionResponse && response.sessionResponse.session) {
                    this.loading = false;
                }
                if (response && response.sessionResponse && response.sessionResponse.expired) {
                    this.$emit('sessionExpired')
                }
            }
        },
        image0(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.form.image0 = file;
                const reader = new FileReader();
                reader.onload = () => {
                    this.newImageLoad0 = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Handle invalid file type (not an image)
                // You can display an error message to the user or take appropriate action.
                console.error('Invalid file type. Please select an image.');
            }
        },
		async getImage(path) {
			try {
				const response = await $fetch(`/api/image?image=${path}`);
				const imageRes = response.imageRes; 

				if (imageRes) {
					return `data:image/jpeg;base64,${imageRes}`;
				}
			} catch (error) {
				console.error('Error fetching image:', error);
			}
		},
        image1(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.form.image1 = file;
                const reader = new FileReader();
                reader.onload = () => {
                    this.newImageLoad1 = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Handle invalid file type (not an image)
                // You can display an error message to the user or take appropriate action.
                console.error('Invalid file type. Please select an image.');
            }
        },
        image2(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.form.image2 = file;
                const reader = new FileReader();
                reader.onload = () => {
                    this.newImageLoad2 = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Handle invalid file type (not an image)
                // You can display an error message to the user or take appropriate action.
                console.error('Invalid file type. Please select an image.');
            }
        },
        image3(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.form.image3 = file;
                const reader = new FileReader();
                reader.onload = () => {
                    this.newImageLoad3 = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Handle invalid file type (not an image)
                // You can display an error message to the user or take appropriate action.
                console.error('Invalid file type. Please select an image.');
            }
        },
        image4(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                this.form.image4 = file;
                const reader = new FileReader();
                reader.onload = () => {
                    this.newImageLoad4 = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Handle invalid file type (not an image)
                // You can display an error message to the user or take appropriate action.
                console.error('Invalid file type. Please select an image.');
            }
        },
        async submitForm(e) {
            this.submit = true;
            let data = new FormData();
            data.append('title', this.form.title);
            data.append('description', this.form.description);
            data.append('category', this.form.category);
            data.append('condition', this.form.condition);
            data.append('phone', this.form.phone);
            data.append('transferPref', this.form.transferPref);
            data.append('premium', this.form.premium);

            data.append('address_locality', this.form.fullPlace.locality);
            data.append('address_country', this.form.fullPlace.country);
            data.append('address_latitude', this.form.fullPlace.latitude);
            data.append('address_longitude', this.form.fullPlace.longitude);
            
            if (this.form.image0 != null || !this.isUpdate) { data.append('image0', this.form.image0); }

            if (this.form.image1 != null) { data.append('image1', this.form.image1); }

            if (this.form.image2 != null) { data.append('image2', this.form.image2); }

            if (this.form.image3 != null) { data.append('image3', this.form.image3); }

            if (this.form.image4 != null) { data.append('image4', this.form.image4); }
            
            var url = `/api/postStore/${this.user.auth_token}`
            var method = 'POST'
            if (this.isUpdate) {
                data.append('_method', 'PATCH');
                url = `/api/postUpdate/${this.post.id}/${this.user.auth_token}`
            }
            const response = await fetch(url, {
                method: method,
                body: data,
            })
            const response_data = await response.json();
            if (response_data.status === 'success') {
                this.$router.push({ path: '/posts/mine', query: { id: this.user.id } });
            } else {
                console.error(data)

                console.error(response_data.errors)
            }
            this.submit = false;

            e.preventDefault();
        },
        NumbersOnly(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
        hasImages() {
            return this.post &&
                (this.post.image0
                || this.post.image1
                || this.post.image2
                || this.post.image3
                || this.post.image4)
        },
        async setPost() {
            this.form.title = this.post.title ?? '';
            this.form.description = this.post.description ?? '';
            this.form.adlocation = this.post.adlocation ?? '';
            this.form.fullPlace = this.post.fullAddress ?? {};
            this.form.category = this.post.category ?? 'Διάφορα';
            this.form.condition = this.post.condition ?? 'Μεταχειρισμένο';
            this.form.phone = this.post.phone ?? '';
            this.form.transferPref = this.post.transferPref ?? '';
            this.form.premium = this.post.premium ?? '';
            if (this.hasImages()) {
                if (this.post.image0) {
                    this.post.imageURL0 = await this.getImage(this.post.image0)
                }
                if (this.post.image1) {
                    this.post.imageURL1 = await this.getImage(this.post.image1)
                }
                if (this.post.image2) {
                    this.post.imageURL2 = await this.getImage(this.post.image2)
                }
                if (this.post.image3) {
                    this.post.imageURL3 = await this.getImage(this.post.image3)
                }
                if (this.post.image4) {
                    this.post.imageURL4 = await this.getImage(this.post.image4)
                }
            }
        }
    },
    created() {
        this.user ?? this.$emit('sessionExpired')
        this.checkSession();
        this.post ? this.setPost() : '';
    }
})
</script>