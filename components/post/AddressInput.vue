<template>
    <div>
        <label v-if="!isIndexPage" for="location">Τοποθεσία</label>
        <v-select 
            v-model="selectedPlace"
            placeholder="Στην πόλη..."
            label="text"
            :options="formatedPlaces"
        />
    </div>
</template>

<script>
    export default defineNuxtComponent({
        props: ['postLocation', 'required', 'isIndexPage', 'places'],
        data() {
            return {
                selectedPlace: null,
                googleLoaded: false,
            }
        },
        async setup() {
            // Fetch places
            const { data: placesData } = await useFetch('/api/places');
            const places = placesData.value?.places ?? [];
            return {places}
        },
        computed: {
            formatedPlaces() {
                let places = [];
                Object.entries(this.places).forEach(([id, place]) => {
                    places.push({ id: id, text: place });
                });
                return places;
            }
        },
        watch: {
            selectedPlace: function (val) {
                if (val && val.id) {
                    this.$emit('placeSelected', val.id);
                    return;
                }
                this.$emit('placeSelected', '');
            }
        },
        methods: {
            onPlaceChanged(place) {
                this.selectedPlace = place;
                this.$emit('placeSelected', place);
            },
        },
        mounted() {
            if (this.postLocation) {
                this.selectedPlace = {id: this.postLocation.id, text: this.postLocation.name_el}
            }
        }
    });
</script>
