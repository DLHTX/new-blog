<template>
    <div class="aniBox">
        <lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"
            style=' width: 600px;height: 600px;overflow: hidden;margin: 0px auto;top: 50%;left: 50%;transform: translate(-300px, -300px);position: absolute;' />
    </div>

</template>

<script>

import animationData from '../../assets/loading-animation.json';
export default {
    name: 'lottieLoading',
    data() {
        return {
            defaultOptions: { animationData: animationData },
            animationSpeed: 1,
            anim: {}
        }
    },
    methods: {
        handleAnimation(anim) {
            this.anim = anim;
            console.log(anim); //这里可以看到 lottie 对象的全部属性
        },
    },

}
</script>

<style lang="" scoped>
.aniBox {
    height: 100%;
    position: fixed;
    width: 100%;
    z-index: 999;
    background: white;
    overflow-y: hidden;
    bottom: 0;
    left: 0;
}
.animate {
}
</style>