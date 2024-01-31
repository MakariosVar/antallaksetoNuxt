<template>
    <div>
        <label v-if="!isIndexPage" for="location">Τοποθεσία</label>
        <vue-google-autocomplete
            :class="{'form-control-sm': isIndexPage }"
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
        props: ['postLocation', 'required', 'isIndexPage'],
        data() {
            return {
                selectedPlace: null,
                googleLoaded: false,
            }
        },
        computed: {
            placeholder(){
                if (this.postLocation) {
                    return `${this.postLocation.locality}, ${this.postLocation.country}`
                }
                return 'Διαλέξτε Περιοχή';
            }
        },
        watch: {
            selectedPlace: function (val) {
                if (val == "") {
                    this.$emit('clearSearch');
                }
                if (!(typeof this.selectedPlace === 'object')) {
                    this.$emit('placeSelected', {locality: this.selectedPlace});
                }
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
            if (typeof google === 'undefined') {
                // Wait for it to load
                var self = this;
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${this.$config.public.googleApiKey}&libraries=places`;
                script.async = true;
                script.defer = true;

                script.onload = () => {
                    if (self.postLocation) {
                        var savedLocation = {
                            locality: self.postLocation.locality,
                            country: self.postLocation.country,
                            latitude: parseFloat(self.postLocation.latitude),
                            longitude: parseFloat(self.postLocation.longitude)
                        };
                        self.onPlaceChanged(savedLocation);
                        self.$refs.address.update(`${savedLocation.locality}, ${savedLocation.country}`);
                    }
                    this.googleLoaded = true;

                };
                if (process.client) {
                    document.head.appendChild(script);
                }
            } else {
                this.googleLoaded = true;
            }
        }
    });
</script>
