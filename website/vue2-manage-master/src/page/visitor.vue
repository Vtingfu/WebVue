<template>
    <div class="video1">
        <head-top></head-top>
        <img id =“img1” src="http://192.168.2.77:5000/video_feed">
        <img id =“img2” src="../assets/img/guard.gif">
        <img id =“img3” src="../assets/img/guard.gif">
        <img id =“img4” src="../assets/img/guard.gif">

    </div>

</template>

<script>
import headTop from '../components/headTop'

export default {
    name: "",
    data() {
        return {
        };
    },
    components: {
        headTop
    },
    methods: {

    },
    mounted() {
    }
};
</script>
<style>
img{
    height: 370px;
    width: 600px;
}
.video1{
    height: 100%;
    min-width: 100%;
    background: #2b2b2b;
    margin: auto;
}
</style>
