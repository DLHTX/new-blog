<template>
    <div>
        我是尾
    </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios'

export default {
  name: 'Footer',
  components: {
  },
  data(){
	return{
		
	}
  },
  created(){

  },
  methods:{
        ...mapActions([
            'getGrxx',
            'checkLogin',
            'logout',
            'getPermissions'
        ]),
  },
  computed:{
      ...mapGetters([
          'isLogin',
          'user',
      ]),
      
  }
}
</script>

<style lang="less">
@import "../../assets/common.less";

</style>
