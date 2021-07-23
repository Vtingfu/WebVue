<template>
    <div class="video">
        <video
            id="vPull"
            controls
            autoplay
            muted
            width="100%"
            height="100%">
        </video>
    </div>
</template>

<script>
import flv from "flv.js";

export default {
    name: "",
    data() {
        return {
            player: null,
        };
    },
    methods: {
        play(urls) {
            let video = document.getElementById("vPull"); //定义播放路径
            if (flv.isSupported()) {
                this.player = flv.createPlayer(
                    {
                        type: "flv",
                        isLive: true,
                        url: urls,
                    },
                    {
                        enableWorker: false, //不启用分离线程
                        enableStashBuffer: false, //关闭IO隐藏缓冲区
                        isLive: true,
                        lazyLoad: false,
                    }
                );

            } else {
                console.log("不支持的格式");
                return;
            }
            this.player.attachMediaElement(video);
            this.player.load();
            this.player.play();
        },
        destruction() {
            //销毁对象
            if (this.player) {
                this.player.pause();
                this.player.destroy();
                this.player = null;
            }
        },

    },
    mounted() {
        this.play('http://1011.hlsplay.aodianyun.com/demo/game.flv');
    }
};
</script>
