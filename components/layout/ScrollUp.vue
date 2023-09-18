<template>
        <transition name="fade">
                <div id="pagetop" class="scrollup" v-show="scY > 300" @click="toTop">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                                 stroke="#4a5568"
                                stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
                                <path d="M18 15l-6-6-6 6"/>
                        </svg> 
                </div>
         </transition>
</template>

<style>
        .scrollup{position:fixed;right:0;bottom:0;}
</style>


<script>
export default{
        data() {
                return {
                        scTimer: 0,
                        scY: 0,
                }
        },
        mounted() {

                window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
                handleScroll: function () {
                        if (this.scTimer) return;
                        this.scTimer = setTimeout(() => {
                                this.scY = window.scrollY;
                                clearTimeout(this.scTimer);
                                this.scTimer = 0;
                        }, 100);
                },
                toTop: function () {
                        window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                        });
                }
        }
}
  

</script>