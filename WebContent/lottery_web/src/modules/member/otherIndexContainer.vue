<template>
  <div class="member-content">
  	<div class="pageWidth help-inner">
  		<img src="./charge_banner.png" alt="">
        <router-view/>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'member-content'
}
</script>
    
<style lang="sass" scoped>
img
  display: block
  width: 100%
.member-content
	background: url(./bg.png)
.help-inner
    min-height: 200px
    margin: 0 auto
    padding-bottom: 2px
    box-sizing: border-box
</style>
