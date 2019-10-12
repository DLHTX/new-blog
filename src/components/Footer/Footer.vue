<template>
  <div class="social-list" >
    <p style="font-size: 10px;">Copyright © 2019 Bin 'Blog - DLHTX</p>
    <p id="binft"></p>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
    name: "Footer",
    components: {},
    data() {
        return {};
    },
    mounted() {
        this.binft(document.getElementById('binft'))
    },
    methods: {
        ...mapActions(["getGrxx", "checkLogin", "logout", "getPermissions"]),
        binft(r){
            function t() {
                return b[Math.floor(Math.random() * b.length)]
            }

            function e() {
                return String.fromCharCode(94 * Math.random() + 33)
            }

            function n(r) {
                for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
                    var l = document.createElement("span");
                    l.textContent = e(), l.style.color = t(), n.appendChild(l)
                }
                return n
            }

            function i() {
                var t = o[c.skillI];
                c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)
            }
            var l = "",
                o = ["我是天空里的一片云", "偶尔投影在你的波心","你不必讶异","更无须欢喜","在转瞬间消灭了踪影","你我相逢在黑夜的海上","在这交会时互放的光亮"].map(function (r) {
                    return r + "."
                }),
                a = 2,
                g = 1,
                s = 5,
                d = 75,
                b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
                c = {
                    text: "",
                    prefixP: -s,
                    skillI: 0,
                    skillP: 0,
                    direction: "forward",
                    delay: a,
                    step: g
                };
            i()
        }
    },
    computed: {
        ...mapGetters(["isLogin", "user","progress"])
    }
};
</script>

<style lang="less">
@import "../../assets/common.less";
.social-list{
    position: relative;
}
#binft{
    position: absolute;
    top: -37px;
    left: 50%;
    width: 10rem;
    transform: translateX(-5rem);
    font-size: 10px;
}
</style>
