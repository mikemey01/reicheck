<template>
    <div class="break-container">
        
        <css-doodle ref="cssdoodle">
            
        </css-doodle>

    </div>
</template>

<script>

    export default{
        data: function(){
            return{
                width: window.innerWidth,
                height: window.innerHeight,
                doodle: null
            }
        },
        mounted(){
            this.doodle = this.$refs.cssdoodle;
            this.setDoodle();
        },
        created() {
            window.addEventListener("resize", this.resizeHandler);
            
        },
        destroyed() {
            window.removeEventListener("resize", this.resizeHandler);
        },
        methods:{
            resizeHandler(e){
                this.width = window.innerWidth;
                this.height = window.innerHeight;
                this.setDoodle();
            },
            setDoodle(){
                this.doodle.update(`
                    :doodle {
                        @grid: 60x1 / ${this.width}px 15em;
                    }
                    @size: 75.8% 1px;
                    justify-self: center;
                    background: #0b62a4;
                    opacity: calc(1 - @i() / @size());
                    transform:
                        rotate(0deg)
                        translateX(calc(@sin(@i() / 4) * @PI() * 10px));
                `);
            }
        }
    }

</script>

<style scoped>
    .break-container{
        width: 100vw;
        position: relative;
        left: calc(-1 * (100vw - 100%) / 2);
    }
</style>