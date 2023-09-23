<template>
    <div class="card text-center">
        <div class="card-body">
            <input type="file" ref="imageInput" class="d-none" @change="handleImageUpload">
            <span v-if="isMine" @click="selectImageToUpload" class="profile-image-container">
                <span v-if="updating">

                </span>
                <span v-else>
                    <img :src="`${config.public.storageUrl}/${profile.image}`" class="rounded-circle mine-profile-image" width="150">
                    <span class="overlay-text">Επιλέξε Φωτογραφία</span>
                </span>
            </span>
            <span v-else>
                <img :src="`${config.public.storageUrl}/${profile.image}`" class="rounded-circle" width="150">
            </span>
            <div class="mt-3">
                <div v-if="user && user.id === profile.user_id">
                    <nuxt-link :to="'/EditProfile/' + this.$route.query.id">Διαμόρφωση Προφίλ</nuxt-link>
                </div>
                <div v-if="user && user.id !== profile.user_id" @click="followclick()">
                    <follow-button :userId="profileUser.id" :follows="profile.follows"></follow-button>
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
        </div>
    </div>
</template>

<script>
    export default {
        props: ['profile', 'profileUser', 'user', 'isMine'],
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
            async handleImageUpload(event) {
                // Get the selected file
                const selectedFile = event.target.files[0];
                
                // Create a FormData object to send the file
                const formData = new FormData();
                formData.append('image', selectedFile);

                try {
                    this.updating = true;
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
                        this.$emit('updateProfileImage', data.image_url)
                    }
                    console.log(data);
                    this.updating = false;
                } catch (error) {
                    console.error('Image upload error:', error);
                }
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
