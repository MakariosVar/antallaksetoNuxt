<template>
    <div class="card shadow bg-body mb-3 text-center">
        <h3 class="m-3 pt-3">{{ profileUser.name }}</h3>
        <div class="card-body">
            <span v-if="profile.description || isMine">
                <div class="row">
                    <div class="col-md-3">
                        <p>Περιγραφή:</p>
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
            </span>
            <div class="row">
                <div class="col-md-3">
                    <p>Εmail:</p>
                </div>
                <div class="col-md-9 text-secondary">
                    <a :href="`mailto:${ profileUser.email }`">{{ profileUser.email }}</a>
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
            const response = await $fetch(`/api/updateProfileDescription?auth_token=${this.user.auth_token}&descriptionInput=${this.descriptionInput}`);
            const data = await response.commentsResponse;

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