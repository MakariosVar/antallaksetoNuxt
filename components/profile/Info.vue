<template>
    <div class="card text-center">
        <div class="card-body">
            <input type="file" ref="imageInput" class="d-none" @change="handleImageUpload">
            <span v-if="isMine" @click="selectImageToUpload" class="profile-image-container">
                <span v-if="updating">
                    <div class="spinner-border text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else>
                    <img v-if="!profileImage" src="~assets/images/default.png" class="rounded-circle" width="150">
                    <img v-else :src="profileImage" :key="profileImage" class="rounded-circle mine-profile-image" width="150">
                    <span class="overlay-text">Επιλέξε Φωτογραφία</span>
                </span>
            </span>
            <span v-else>
                <img v-if="!profileImage" src="~assets/images/default.png" class="rounded-circle" width="150">
                <img v-else :src="profileImage" class="rounded-circle" width="150">
            </span>
            <div class="mt-3">
                <div v-if="user && user.id !== profile.user_id">
                    <ProfileFollowButton 
                        :profileId="profileUser.id"
                        :follows="profile.follows"
                        :user="user"
                        @followClick="followClick()"
                        @sessionExpired="sessionExpired()"
                    />
                </div>
                <div class="text-center">
                    <strong>Posts:</strong> {{ profile.postCount }}
                </div>
                <div class="text-center">
                    <strong>Followers:</strong> {{ profile.followersCount }}
                </div>
                <div class="text-center">
                    <strong>Following:</strong> {{ profile.followingCount }}
                </div>
            </div>
            <div class="text-center" v-if="user && user.id === profileUser.id">
                <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteConfirmModal"
                    class="text-danger fst-italic"
                    title="Διαγραφή Λογαριασμού"
                    style="font-size: 0.7rem;"
                >
                    Διαγραφή Λογαριασμού
                </a>
            </div>
            <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteConfirmModalLabel">Διαγραφή Λογαριασμού</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Είστε σίγουροι ότι θέλετε να διαγράψετε τον λογαριασμό σας;
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ακύρωση</button>
                        <button type="button" class="btn btn-danger" @click="deleteUser()">Επιβεβαίωση</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['profile', 'profileUser', 'user', 'isMine', 'profileImage'],
        data() {
            return {
                updating: false
            }
        },
        setup() {
            const config = useRuntimeConfig();
            return { config };
        },
        methods: {
            selectImageToUpload() {
                // Trigger the file input click event
                this.$refs.imageInput.click();
            },
            followClick () {
                this.$emit('followClick')
            },
            sessionExpired () {
                this.$emit('sessionExpired')
            },
            async deleteUser() {
                if (this.user && this.user.id) {
                    try {
                        const response = await $fetch(`/api/deleteUser?id=${this.user.id}&auth_token=${this.user.auth_token}`);
                        console.log(response)
                        const data = response.deleteResponse
                        if (data.status === 'success') {
                            if (process.client) {
                                location.replace('/home');
                            }
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            },
            async handleImageUpload(event) {
                // Get the selected file
                const selectedFile = event.target.files[0];
                
                // Create a FormData object to send the file
                const formData = new FormData();
                formData.append('image', selectedFile);

                try {
                    // Send a POST request to your backend API to save the image
                    const response = await fetch(`${this.config.public.apiUrl}/profile/${this.user.auth_token}`, {
                        method: 'POST',
                        body: formData, // Set the FormData object as the request body
                    });

                    if (!response.ok) {
                        throw new Error(`API request failed with status ${response.status}`);
                    }

                    const data = await response.json();
                    if (data.image_url) {
                        this.updating = true;
                        this.$emit('updateProfileImage', data.image_url)
                    }
                } catch (error) {
                    console.error('Image upload error:', error);
                }
                this.updating = false;
            },
        },
    };
</script>
<style>
    .profile-image-container {
        position: relative;
        display: inline-block;
    }

    .overlay-text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background color */
        color: white; /* Text color */
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0; /* Initially hidden */
        transition: opacity 0.3s; /* Transition effect for opacity */
        border-radius: 50%; /* Make the background rounded */
    }


    .profile-image-container:hover .overlay-text {
        opacity: 0.8; /* Show the text on hover */
    }
</style>
