<template>
    <div class="container">
        <div v-if="!loaded" class="d-flex justify-content-center align-items-center min-vh-100">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else class="m-2 justify-content-center">
            <div class="row text-center">
                <div class="col-12">
                    <h1>MHNYMATA</h1>
                </div>
                <div class="col-12">
                    <a @click="getMessages()" class="btn btn-outline-dark text-center">Ανανέωση</a>
                </div>
            </div>
            <div v-if="!unreadMessages || !readMessages" class="text-center">
                <h2>Κανένα Μήνυμα</h2>
                <nuxt-link class="h2" to="/home">Επιστροφή στην αρχική</nuxt-link>
            </div>
            <div v-else>
                <div v-for="message in unreadMessages" :key="message.id" class="row m-2">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header" data-bs-toggle="collapse"
                                :data-bs-target="'#messageCollapse' + message.id" @click="onClickMessage(message)">
                                <div class="row">
                                    <div class="col-6">
                                        <p class="small">{{ message.date }}</p>
                                        <p class="postText"><strong>{{ message.name }}</strong></p>
                                    </div>
                                    <div class="col-6 text-end">
                                    <font-awesome-icon v-if="!message.is_read" :icon="['fas', 'square-envelope']" class="text-warning" size="2x" />
                                    </div>
                                </div>
                            </div>
                            <div :id="'messageCollapse' + message.id" class="collapse">
                                <div class="card-body">
                                    <p class="postText"><small><strong>Email:</strong> {{ message.email }}</small></p>
                                    <p class="postText"><small><strong>Θέμα:</strong> {{ message.subject }}</small></p>
                                    <p class="postText h4"><small><strong>Μήνυμα:</strong> {{ message.message }}</small></p>
                                </div>
                                <div class="card-footer" v-if="user.role_id === 1">
                                    <form @submit.prevent="DeleteMessage(message.id)">
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-outline-danger btn-sm">Διαγραφή
                                                Μηνύματος</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="message in readMessages" :key="message.id" class="row m-2">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header" data-bs-toggle="collapse"
                                :data-bs-target="'#messageCollapse' + message.id">
                                <div class="row">
                                    <div class="col-12">
                                        <p class="small">{{ message.date }}</p>
                                        <p class="postText"><strong>{{ message.name }}</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div :id="'messageCollapse' + message.id" class="collapse">
                                <div class="card-body">
                                    <p class="postText"><small><strong>Email:</strong> {{ message.email }}</small></p>
                                    <p class="postText"><small><strong>Θέμα:</strong> {{ message.subject }}</small></p>
                                    <p class="postText h4"><small><strong>Μήνυμα:</strong> {{ message.message }}</small></p>
                                </div>
                                <div class="card-footer" v-if="user.role_id === 1">
                                    <form @submit.prevent="DeleteMessage(message.id)">
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-outline-danger btn-sm">Διαγραφή
                                                Μηνύματος</button>
                                        </div>
                                    </form>
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
export default defineNuxtComponent({
    props: ['user'],
    data() {
        return {
            loaded:false,
            unreadMessages : [],
            readMessages: [],
            totalUnreadMessages: 0
        }
    },
    setup() {
        const config = useRuntimeConfig();
        return { config }
    },
    methods: {
        async onClickMessage(message) {
            let data = await $fetch(`${this.config.public.apiUrl}/readMessage/${message.id}/${this.user.auth_token}`);
            // console.log(data);
            message.is_read = true;
        },
        async getMessages() {
            let data = await $fetch(`/api/getMessages?token=${this.user.auth_token}`);
            // console.log(data)
            if (data.response.status == 'success') {
                this.loaded = true;
                this.unreadMessages = data.response.unreadMessages;
                this.readMessages = data.response.readMessages;
                this.totalUnreadMessages = data.response.totalUnreadMessages;

            }
        },
        async DeleteMessage(param) {
            if (confirm("Πατόντας ΟΚ το μήνυμα θα διαγραφεί, είστε σίγουροι;")) {
                try {
                    const response = await $fetch(`/api/deleteMessage?id=${param}`, {
                        method: 'POST',
                    });

                    if (response.deleteResponse.status == "success") {
                        this.getMessages();
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    },
    async mounted() {
        await this.getMessages();
    }
})
</script>
