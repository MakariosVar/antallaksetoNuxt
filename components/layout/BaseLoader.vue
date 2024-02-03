<template>
    <div class="loader-overlay" v-if="!loaded">
        <div class="loader-container">
        </div>
    </div>
</template>
<script>
export default {
    name: 'BaseLoader',
    props: ['loaded'],
}
</script>
  
<style>

.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    opacity:.95;
    background: radial-gradient(rgb(36, 36, 36), rgb(56, 56, 56));
    /* semi-transparent white overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* Adjust the z-index to ensure it's above your main content */
}

.loader-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #242424;
    background-image: url('/NewLogoPNG.svg');
    background-size: 50% auto;
    background-position: center center;
    background-repeat: no-repeat;
    animation: changeColors 9s linear infinite;

}


@keyframes changeColors {
    0% {
        background-color: #131313;
        opacity: 1;

    }

    33.33% {
        background-color: #b4b4b4;
        opacity: 0.5;

    }

    50% {
        background-color: #ffffff;

        opacity: 0;
    }

    66.66% {
        background-color: #b4b4b4;
        opacity: 0.5;
    }

    100% {
        background-color: #131313;
        opacity: 1;
    }
}
</style>
  