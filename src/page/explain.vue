<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p class="explain_text">{{msg}}</p>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
	    data(){
	        return{
                msg:''
            }
        },
    	components: {
    		headTop,
    	},
        methods:{
    	    async getData(){
    	        let data = await getMsg()
                console.log(data)
                this.msg = data.msg
            }

        },
        mounted() {
	        this.getData()
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
