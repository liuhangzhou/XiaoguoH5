<template>
    <div class="toast" v-if="showToast">
        <div class="toast-content">
            <div class="toast-icon" v-if="type">
                <img src="" alt="">
            </div>
            <div class="toast-p1">
                {{text}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'toast',
    props: {
        show: Boolean,
        text: String,
        duration: {
            type: Number,
            default: 3000
        },
        type: String
    },
    created(){
        if(this.duration !== 0) {
            setTimeout(()=>{
                console.log(1111)
                this.$emit('update:show',false);
            },this.duration)
        }
    },
    computed:{
        showToast(){
            return this.show
        }
    },
}
</script>

<style scoped>
.toast {
    padding: .24rem;
    background: rgba(0, 0, 0, .75);
    overflow: hidden;
    border-radius: .16rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    text-align: center;
    z-index: 999;
}

.toast-icon{
    width: .75rem;
    height: .75rem;
}

.toast-p1 {
    color: #fff;
    font-size: .30rem;
    font-weight: 400;
}

</style>
