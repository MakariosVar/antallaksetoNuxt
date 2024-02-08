<script setup lang="ts">
    import type { NuxtError } from '#app'

    const props = defineProps({
        error: Object as () => NuxtError
    })
    console.error(props.error?.message)
</script>
<template>
    <div class="d-flex" style="height: 100vh;">
        <div class="m-auto text-center">
            <img style="max-height: 150px;" src="~assets/images/NewLogoPNG.png" alt="Logo">
            <h2>Ούπς!</h2>
            <h4>
                Κάτι Πήγε στραβά
            </h4>
            <h6>
                Η Σελίδα δεν βρέθηκε
            </h6>
            <nuxt-link to="/" class="btn btn-outline-secondary">Επιστροφή στην Αρχική</nuxt-link>
        </div>
    </div>
</template>