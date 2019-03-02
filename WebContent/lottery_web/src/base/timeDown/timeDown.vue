<template>
  <div class="timeDown">
      {{_formatTimer(curTimeNum)}}
  </div>
</template>

<script>
import {formatTimer} from 'common/js/utils'

export default {
  name: 'timeDown',
  props:{
      time:{
          type: Number,
          default: 0
      },
      typeStr: {
          type: [String,Number],
          default: ':'
      }
  },
  data(){
      return {
          curTimeNum: 0,
          setTimeFunc: {}
      }
  },
  created(){
      this._timeDown();
  },
  methods:{

      _formatTimer(time){
          return formatTimer(time,this.typeStr);
      },

      _timeDown(){
          let _self = this;
          try{
            _self.curTimeNum = _self.time;
            if(_self.curTimeNum<=0) return 0;
            clearTimeout(_self.setTimeFunc);
            let _run = () => {
                _self.setTimeFunc =setTimeout(()=> {
                    _self.curTimeNum--;
                    if(_self.curTimeNum >0){
                        _run();
                    }else{
                        _self.$emit('callBackFunc');
                    }
                },1000);
            }
            _run();
          }
          catch(err){
              _self.$emit('callBackFunc');
          }
      }
  },
  watch:{
      time:function(){
          this._timeDown();
      }
  }
}
</script>
