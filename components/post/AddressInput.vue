<template>
    <div>
      <label for="location">Τοποθεσία</label>
      <vue-google-autocomplete
        class="form-control"
        v-if="googleLoaded"
        id="location"
        @placechanged="onPlaceChanged"
        v-model="selectedPlace"
        :placeholder="placeholder"
        :options="autocompleteOptions"
        :country="['gr']"
        :required="required"
        ref="address"
        types="(cities)"
      />
    </div>
  </template>
<script>
    export default defineNuxtComponent({
        props: ['postLocation', 'required'],
        data() {
            return {
                selectedPlace: {}
            }
        },
        computed: {
            googleLoaded() {
                if (process.client) {
                    return window.google;
                }
                return false;
            },
            placeholder(){
                if (this.postLocation) {
                    return `${this.postLocation.locality}, ${this.postLocation.country}`
                }
                return 'Διαλέξτε Περιοχή';
            }
        },
        methods: {
            onPlaceChanged(place) {
                this.selectedPlace = place;
                console.log(place)
                this.$emit('placeSelected', place);
            },
        },
        mounted() {
            if (this.postLocation) {
                var savedLocation = {
                    locality: this.postLocation.locality,
                    country: this.postLocation.country,
                    latitude: parseFloat(this.postLocation.latitude),
                    longitude: parseFloat(this.postLocation.longitude)
                };
                this.onPlaceChanged(savedLocation);
                this.$refs.address.update(`${savedLocation.locality}, ${savedLocation.country}`);
            }
        }
    });
</script>
