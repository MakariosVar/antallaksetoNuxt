<template>
    <div class="col-md-8">
        <div class="card mb-3 text-center">
            <h1 class="m-3 pt-3">{{ profileUser.name }}</h1>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <h5>Περιγραφή:</h5>
                    </div>
                    <div class="col-md-9 text-secondary">
                        <span v-if="!showDescriptionInput">
                            <div v-if="!profile.description">
                                <div v-if="isMine">
                                    <a href="#" @click="openDescriptionInput">Προσθέστε Πληροφοριές</a>
                                </div>
                            </div>
                            <div v-else>
                                {{ profile.description }}
                                <font-awesome-icon
                                    v-if="isMine"
                                    @click="openDescriptionInput"
                                    :icon="['fas', 'edit']" class="me-2 text-primary"
                                />
                            </div>
                        </span>
                        <span v-else>
                            <form @submit.prevent="updateDescription" class="mb-3">
                                <textarea
                                    v-model="descriptionInput"
                                    @input="onDescriptionInput"
                                    class="form-control"
                                    rows="2"
                                >
                                </textarea>
                                <button class="btn btn-primary">Αποθήκευση</button>
                            </form> 
                        </span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-3">
                        <h5>Εmail:</h5>
                    </div>
                    <div class="col-md-9 text-secondary">
                        {{ profileUser.email }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['profileUser', 'profile', 'isMine', 'user'],
    data() {
        return {
            showDescriptionInput: false,
            descriptionInput: ''
        }
    },
    setup() {
        const config = useRuntimeConfig();
        return {config}
    },
    methods: {
        onDescriptionInput (e) {
            this.descriptionInput = this.descriptionInput.substr(0, 600)
        },
        openDescriptionInput () {
            this.descriptionInput = this.profile.description ? this.profile.description : '';
            this.showDescriptionInput = true;
        },
        async updateDescription () {
            try {
            const response = await fetch(`${this.config.public.apiUrl}/profile/${this.user.auth_token}`, {
                method: 'POST',
                body: new URLSearchParams({
                    description: this.descriptionInput,
                })
            });
            const data = await response.json();

            if (data.status === 'success') {
                this.profile.description = this.descriptionInput;
            } else if (data.expired) {
                this.$emit('sessionExpired', true);
            }
            } catch (error) {
                console.error('An error occurred:', error);
            }
            this.showDescriptionInput = false;
        }
    }

}
</script>