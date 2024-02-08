<template>
    <div>
        <label v-if="!isIndexPage" for="location">Τοποθεσία</label>
        <v-select 
            v-model="selectedPlace"
            placeholder="Στην πόλη..."
            label="text"
            :options="formattedPlaces"
        />
    </div>
</template>

<script>
    export default defineNuxtComponent({
        props: ['postLocation', 'required', 'isIndexPage', 'places', 'placeId'],
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
            formattedPlaces() {
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
                } else {
                    this.$emit('placeSelected', '');
                }
            },
            placeId(placeId) {
                let placeObj = this.formattedPlaces.find(obj => obj.id === placeId);
                if (placeObj) {
                    this.selectedPlace = { id: placeObj.id, text: placeObj.text };
                } else {
                    this.selectedPlace = null
                }
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
            if (this.placeId) {
                let placeObj = this.formattedPlaces.find(obj => obj.id === this.placeId);
                if (placeObj) {
                    this.selectedPlace = { id: placeObj.id, text: placeObj.text };
                }
            }
        }
    });
</script>
