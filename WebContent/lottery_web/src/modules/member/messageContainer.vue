<template>
  <div class="message " >
  	<HeaderNav :data="messageTitle" :currentIndex="pageIndex" @navSwitch="navSwitch"></HeaderNav>
  	<MessageManage  v-if="pageIndex == 0"></MessageManage>
  </div>
</template>

<script>

import HeaderNav from './components/headerNav'
import MessageManage from './components/message/messageManage'
import { mapMutations } from 'vuex'
import { ERR_OK } from "api/config";
export default {
  name: 'message',
  data () {
    return {
      messageTitle: ["消息管理"],
      activeIndex: 0,
      pageIndex: 0
    }
  },
  created(){
  	this.pageIndex = this.$route.params.pageIndex * 1;
  },
  methods: {
  	navSwitch(index){
		  this.changePage(index);
		  this.$router.push({path: '/member/message/' + index});
	  },
  	...mapMutations({
      changePage: 'm_gameRecord_changeIndex',
    }),

  },
  	watch: {
		'$route': function(){
			this.pageIndex = this.$route.params.pageIndex * 1;
		}
	},
  components: {
  	HeaderNav,
  	MessageManage
  }
  	
 
}
</script>

<style lang="sass" scoped>

</style>

