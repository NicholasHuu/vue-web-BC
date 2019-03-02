<template>
  <div>
    <!-- 活动内容弹窗 -->
    <div class="popupActive" v-show="popupStatus&&curImgUrl==0">
      <div class="shadow" @click="closeActivesPop"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动详情</p>
            <div
              class="popupActiveConten"
            >对于忠实的新老会员，我们从不会忘却，为了您的满意，我们一直努力着----为答谢广大新老玩家长期以来对我们的支持与信赖，我们倾情大回馈，让您能在游戏过程中感受到乐趣，宾至如归！活动时间：2018年12月20日00:01正式开始，结束时间:以官网通知为准。</div>
            <p class="popupActivedital">对应转运金</p>
            <table class="popupActiveTable">
              <tr>
                <td>周负盈利额</td>
                <td>1001</td>
                <td>3001</td>
                <td>5001</td>
                <td>10001</td>
                <td>30001</td>
                <td>50001</td>
                <td>100001</td>
                <td>300001</td>
                <td>500001</td>
                <td>1000001</td>
              </tr>
              <tr>
                <td>可获转运金</td>
                <td>18</td>
                <td>38</td>
                <td>88</td>
                <td>168</td>
                <td>388</td>
                <td>688</td>
                <td>1388</td>
                <td>2888</td>
                <td>6888</td>
                <td>13888</td>
              </tr>
            </table>
            <p class="popupActivedital">活动要求</p>
            <div class="popupActiveConten">
              <p>1：会员应扣除优惠与返点的实际输赢为亏损计算做标准。</p>
              <p>2：每周期为每星期一12:00至第二个星期一11:59（北京时间）。</p>
              <p>3：会员需在每星期五前申请上一周期的负盈利额，逾期视为无效和自动放弃此优惠。</p>
              <p>4：所获得的转运金只需要进行全额有效投注，即可申请提款。注：详细规则请联系24小时在线客服或登录PC端查看完整活动。</p>
            </div>
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==1">
      <div class="shadow" @click="closeActivesPop"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动方案</p>
            <div
              class="popupActiveConten"
            >即日起(结束时间以官网通知为准)会员以本站进行AG捕鱼王游戏，按照美东时间计算当日亏损1000元以上，次日即可申请相应加油彩金，每日最高可获得1888元转运彩金。</div>
            <p class="popupActivedital">对应转运金</p>
            <table class="popupActiveTable">
              <tr>
                <td>当日亏损</td>
                <td>加油彩金</td>
                <td>加油彩金</td>
              </tr>
              <tr>
                <td>1000元或以上</td>
                <td>38元</td>
                <td class="tdValignM" rowspan="5">一倍流水</td>
              </tr>
              <tr>
                <td>3000元或以上</td>
                <td>88元</td>
              </tr>
              <tr>
                <td>10000元或以上</td>
                <td>388元</td>
              </tr>
              <tr>
                <td>30000元或以上</td>
                <td>888元</td>
              </tr>
              <tr>
                <td>60000元或以上</td>
                <td>1888元</td>
              </tr>
              <tr>
                <td colspan="3">例：当日在AG捕鱼王亏损10000元则次日可申请领取388元彩金</td>
              </tr>
            </table>
            <p class="popupActivedital">申请方式</p>
            <div class="popupActiveConten">
              <p>符合申请条件的会员请在每天中午12：01至次日11:59（北京时间）</p>
              <p>发送邮件至本公司邮箱，邮箱号请联系在线客服索取。</p>
            </div>
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==2">
      <div class="shadow" @click="closeActivesPop"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动内容</p>
            <div class="popupActiveConten">“逢一必送”活动是针对每月1号，11号，21号进行存款的会员，根据不同等级的累计存款金额赠送相应礼金，多存多送。</div>
            <table class="popupActiveTable">
              <tr>
                <td>累积存款</td>
                <td>赠送礼金</td>
                <td>流水要求</td>
              </tr>
              <tr>
                <td>1888+</td>
                <td>18元</td>
                <td class="tdValignM" rowspan="7">一倍流水</td>
              </tr>
              <tr>
                <td>3888+</td>
                <td>38元</td>
              </tr>
              <tr>
                <td>5888+</td>
                <td>58元</td>
              </tr>
              <tr>
                <td>15888+</td>
                <td>158元</td>
              </tr>
              <tr>
                <td>38888+</td>
                <td>388元</td>
              </tr>
              <tr>
                <td>58888+</td>
                <td>588元</td>
              </tr>
              <tr>
                <td>138888+</td>
                <td>1388元</td>
              </tr>
            </table>
            <p class="popupActivedital">申请方式</p>
            <div class="popupActiveConten">
              <p>符合申请条件的会员请联系在线客服申请，我们将在第一时间受理并派送彩金（由于申请人数较多，如有耽搁延误敬请谅解）。</p>
            </div>
            <p class="popupActivedital">活动说明</p>
            <div class="popupActiveConten">
              <p>1：活动当天，每个会员只能申请一次，且必须在当天内申请，逾期自动放弃。</p>
              <p>2：每个会员，每个IP，只能申请一次，如出现同IP或多账号现象，视为同一人，此IP下的所有会员均有权拒送彩金。</p>
              <p>3：此活动不可以与当天内的任何存送活动同时进行。</p>
            </div>
            <p class="popupActivedital">规则条款</p>
            <div class="popupActiveConten">
              <p>1：所有优惠活动必须严格按照活动说明进行申请。</p>
              <p>2：所有优惠以人民币(CNY)为结算货币，以北京时间为计时区间。</p>
              <p>3：每位玩家，用户，同一地址，同一邮箱，同一电话号码，相同的支付方式以及IP地址等只能享受一次优惠。</p>
              <p>4：若会员重复申请或注册多账号行为，公司保留取消或收回会员优惠彩金的权利。</p>
              <p>5：头彩所有优惠特为玩家而设，如发现任何团体或个人以不诚实方式套取优惠的行为，公司有权保留冻结，取消该团体或个人账户及账户余额的权利。</p>
              <p>6：头彩将保留对活动的最终解释权，在任何情况下都可以随时更改，停止，取消优惠活动的权利。</p>
            </div>
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==3">
      <div class="shadow" @click="popupStatus"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动详情</p>
            <div style="padding:10px 0px;">
              <p style="text-align:center;padding:5px 0px;color:yellow;">天降财运神秘彩金随机派发 无需申请直接划入会员银行卡</p>
              <p style="text-align:center;padding:5px 0px;">开启时间:即刻开启 结束时间：留意官网公告</p>
            </div>

            <p class="popupActivedital">活动详情</p>
            <div class="popupActiveConten">
              <p>本公司将不定期派发神秘彩金给予新老会员。彩金没有门槛限制不设金额上限，只要您在我们的官网注册过账号，只要您曾经登录过，只要您有绑定准确的银行卡，都有可能收到我们随机派发的惊喜彩金。</p>
            </div>
            <p class="popupActivedital">备注</p>
            <div
              class="popupActiveConten"
            >凡是获得神秘彩金的会员，我们将会在彩金存入对应银行账号后，通过您注册时预留的电话号码给您联系，彩金金额随机发放，祝您成为下一个彩金得主。</div>
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==4">
      <div class="shadow" @click="popupStatus"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动详情</p>
            <div style="padding:10px 0px;line-height:150%;">
              <span
                style="padding:5px 0px;color:yellow;"
              >新老会员通过（网银，ATM，手机银行转账，支付宝，微信转账或到柜台存到公司账户）进行游戏充值，即可享受充值金额1.0%的返利。</span>
              <span style="padding:5px 0px;">银行卡入款的会员无需申请，系统将自动增加优惠返利到会员账户（次次存，次次送）无上限。</span>
            </div>

            <p class="popupActivedital">活动规则</p>
            <div class="popupActiveConten">
              <p>1:每次存款需与【在线客服】联系索取公司银行账号，确认该账号是否在使用。若入款前未先与客服进行银行转账确认，误入公司已经停用的银行账号，恕不负责。</p>
              <p>2:公司若发现会员利用非法程序下注或是下注套利等行为，公司有权为将过往所得优惠全数取回，并取消会员制账号。</p>
              <p>3:此活动可与其他优惠活动同时进行。</p>
              <p>4:本公司拥有此活动的最终解释权，并保留随时修改，终止活动的权利。</p>
            </div>
            <!-- <div class="bottomCoin"></div> -->
            <div class="btn" @click="closeActivesPop"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==5">
      <div class="shadow" @click="popupStatus"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">代理简介</p>
            <div
              class="popupActiveConten"
            >“头彩娱乐”投注平台属于多元化的产品，沿用最公平、公正、公开的系统，配备全新最优代理合作模式，支持个人或者团队合作，零风险，零成本，高收益。以投注金额为基础方式计算，不必担心输赢，只要您的下级会员进行投注，上级就可实时获得返点佣金，免流水，随时提现！无论您拥有的是网路资源，或者是人脉资源，我们竭诚欢迎您加入合作伙伴的行列，绝对是您最理智的选择！</div>
            <p class="popupActivedital">上下级返点差值</p>
            <p
              class="popupActiveConten"
            >您注册个会员账号，您既可以是玩家也可以是代理。您既可以体验平台的操作便捷及购彩乐趣，也可以体验平台独具一格、一劳永逸的“金字塔-无限裂变”终极代理模式。记住了，代理佣金返点百分比是以下级投注流水计算的，下级投注流水是不计输赢的，发展下级是不伤人脉的，代理分润即秒结实时到账，可无条件随时提现。</p>
            <p
              style="padding:5px 0px;color:yellow;font-size:12px;line-height:150%;"
            >例：代理自身返点8.0，给予下级返点7.0，您的返点差值是8-7=1，您将能获得所有下级投注流水1%的代理分润，不论输赢，以此类推，下级会员投注大小将决定于代理获利多少。</p>
            <p
              style="padding:5px 0px;color:yellow;font-size:12px;line-height:150%;"
            >（注：建议返点差值不要超过1点，下级返点太低不利于下级二次开发代理，保持下级继续发展的利润空间）</p>
            <p class="popupActivedital">如何为下级开户</p>
            <div
              class="popupActiveConten"
            >登陆代理账号点击右上角【会员中心】→“代理中心”→“推广链接”→选择下级开户类型“代理”→“调整下级返点”（如自身返点8.0，设置下级返点6.0，差值2.0将是您的代理获利佣金）→“生成推广链接”→“复制推广链接（代理）”发送给下级注册开户即可。</div>
            <p class="popupActivedital">所有下级投注流水</p>
            <div
              class="popupActiveConten"
            >所有下级的投注流水等于所有下级投注的注单金额总和，所有注单流水是不计输赢的，只要下级进行投注娱乐即实时累计注单流水。</div>
            <p
              style="padding:5px 0px;color:yellow;font-size:12px;line-height:150%;"
            >如：所有下级投注赢的注单流水总和是50 0000元，输的注单流水总和50 0000元，所有下级的注单流水总和是投注赢的注单50 0000元+投注输的注单50 0000元=所有下级投注流水100 0000元。</p>
            <p class="popupActivedital">代理分润</p>
            <p
              class="popupActiveConten"
            >代理分润等于所有下级投注流水×上下级返点的差值，如所有的下级投注流水100 0000元×上下级返点差值1%=代理分润10000元。（注：因为所有下级流水是不计输赢的，所以发展下级是不伤人脉的，只需您的下级随时进行娱乐投注，不论输赢，上级都可实时获得代理返点佣金，而且都是秒结到账，代理分润可无条件随时提现）</p>
            <p class="popupActivedital">无限裂变</p>
            <p
              class="popupActiveConten"
            >一劳永逸的“金字塔-无限裂变”终极代理模式：A推荐10个B，B推荐10个C，C推荐10个D，可无限裂变，即A代理裂变的所有下级数量为：10×10×10=1000个。</p>
            <p
              style="padding:5px 0px;color:yellow;font-size:12px;line-height:150%;"
            >如：所有下级平均每天的个人投注流水为1000元（注：一个下级每天保守充值100元起，流水也能打到1000元，此处空间无限大），上下级返点差值为1，A代理每天最少可获得代理分润为：1000个人×投注流水1000元×返点差值1%=10000元。（注：每个人的圈子无限大，简单一次邀请即可实现几何倍增，“金字塔-无限裂变”的代理模式超乎您的想象，给下级多一点空间，细水长流才能一劳永逸，您才可以实现躺着就可以赚钱）</p>
            <p class="popupActivedital">如何管理下级</p>
            <div class="popupActiveConten">
              <p>①点击会员中心>> 点击团队管理；</p>
              <p>②点击团队盈亏>>操作>> 查看代理的发展情况；</p>
            </div>
            <p class="popupActivedital">如何查看自身返点和赔率</p>
            <div class="popupActiveConten">
              <p>①点击个人资料>> 查看自身返点；</p>
            </div>
            <p class="popupActivedital">温馨提示</p>
            <div class="popupActiveConten">
              <p>建议为下级开设的“推广链接”类型为代理，无论下级能再发展几级代理，您都能获得代理分润；</p>
              <p>为下级设置的返点不同赔率也不同，返点越低，赔率就越低，建议为下级设置的返点不要过低，以便下级继续发展下级；</p>
              <p>建议发展下级为代理类型，如果为下级开设的“邀请码”是玩家类型，那么您的下级注册开户只能投注，不能再发展下级，也看不到代理中心；</p>
            </div>
            <p
              style="padding:5px 0px;color:yellow;font-size:12px;line-height:150%;"
            >注：头彩娱乐保留上述条列之最终更改权</p>
            <p
              style="padding:5px 0px;color:yellow;font-size:12px;line-height:150%;"
            >请谨记任何使用不诚实方法以骗取返点佣金将会永久冻结账户，返点一律不予发送。</p>
            <!-- <div style="padding:10px 0px;">
              <p
                style="text-align:center;padding:5px 0px;color:yellow;"
              >注册代理账号>开通代理线路>扩展推广途径>推广发展下线>结算获取佣金</p>
            </div>

            <p class="popupActivedital">代理规则</p>
            <div class="popupActiveConten">
              <table class="popupActiveTable">
                <tr>
                  <td>当月盈利</td>
                  <td>当月最低有效会员</td>
                  <td>当月退佣比：真人-电子</td>
                  <td>当月退佣比：彩票</td>
                  <td>体育投注</td>
                </tr>
                <tr>
                  <td>1-50000</td>
                  <td>5或以上</td>
                  <td>30%</td>
                  <td class="tdValignM" rowspan="5">0.1%</td>
                  <td class="tdValignM" rowspan="5">10%</td>
                </tr>
                <tr>
                  <td>50001-500000</td>
                  <td>10或以上</td>
                  <td>35%</td>
                </tr>
                <tr>
                  <td>500001-8000001</td>
                  <td>30或以上</td>
                  <td>40%</td>
                </tr>
                <tr>
                  <td>800001-1000000</td>
                  <td>50或以上</td>
                  <td>45%</td>
                </tr>
                <tr>
                  <td>1000001以上</td>
                  <td>100或以上</td>
                  <td>50%</td>
                </tr>
              </table>
              <p>注：请谨记使用任何不诚实方式骗取代理佣金者将取消代理资格并永久冻结账号，佣金一律不予派发。</p>
              <p>代理专员邮箱：huiyinggongli@gmail.com（代理灵儿）。</p>
              <p>代理QQ:228855（代理灵儿）。</p>
            </div>-->
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==6">
      <div class="shadow" @click="popupStatus"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动范围</p>
            <div class="popupActiveConten">
              <p>活动时间：即日起</p>
              <p>活动对象：网站所有会员</p>
              <p>活动范围:电子游戏</p>
            </div>

            <p class="popupActivedital">活动内容</p>
            <div class="popupActiveConten">
              <table class="popupActiveTable">
                <tr>
                  <td>亏损金额</td>
                  <td>可获赠救援金</td>
                  <td>流水要求</td>
                  <td>救援金上限</td>
                </tr>
                <tr>
                  <td>500元及以上</td>
                  <td>2.0%</td>
                  <td>一倍流水</td>
                  <td>8888元</td>
                </tr>
                <tr>
                  <td>5000元及以上</td>
                  <td>2.5%</td>
                  <td>一倍流水</td>
                  <td>8888元</td>
                </tr>
                <tr>
                  <td>10000元及以上</td>
                  <td>3.0%</td>
                  <td>一倍流水</td>
                  <td>8888元</td>
                </tr>
              </table>
              <p>即日起，凡投注电子游戏产品的会员，当天内亏损500元以上即可申请救援基金，让您重获信心，玩转电子游戏</p>
              <p>注：救援彩金每位会员每天仅限申请一次，周期结算按照美东时间结算。</p>
            </div>
            <p class="popupActivedital">活动示例</p>
            <div class="popupActiveConten">
              <p>当日在电子游戏中亏损500元，次日即可申请彩金为500*2.0%=10元</p>
              <p>当日在电子游戏中亏损5000元，次日即可申请彩金为5000*2.5%=125元</p>
              <p>当日在电子游戏中亏损10000元，次日即可申请彩金为10000*3.0%=300元</p>
            </div>
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==7">
      <div class="shadow" @click="popupStatus"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动详情</p>
            <div class="popupActiveConten">
              <p
                style="text-align:center;padding:5px 0px;color:yellow;"
              >会员在一个自然周内，只要签到指定天数和完成周有效投注，即可申请一定的奖勤彩金</p>
              <table class="popupActiveTable">
                <tr>
                  <td>每日存款金额</td>
                  <td>周有效投注</td>
                  <td>可获得奖金</td>
                  <td>流水要求</td>
                </tr>
                <tr>
                  <td>500+</td>
                  <td>1.8万+</td>
                  <td>88元</td>
                  <td class="tdValignM" rowspan="7">1倍</td>
                </tr>
                <tr>
                  <td>1000+</td>
                  <td>3.8万+</td>
                  <td>188元</td>
                </tr>
                <tr>
                  <td>5000+</td>
                  <td>18万+</td>
                  <td>588元</td>
                </tr>
                <tr>
                  <td>50000+</td>
                  <td>120万+</td>
                  <td>1888元</td>
                </tr>
                <tr>
                  <td>100000+</td>
                  <td>320万+</td>
                  <td>3888元</td>
                </tr>
                <tr>
                  <td>500000+</td>
                  <td>1200万+</td>
                  <td>8888元</td>
                </tr>
                <tr>
                  <td>3000000+</td>
                  <td>3200万+</td>
                  <td>18888元</td>
                </tr>
              </table>
            </div>

            <p class="popupActivedital">申请条件</p>
            <div class="popupActiveConten">
              <p>活动要求：每周7天，至少要有5天的每日存款要求，并且要达到当周指定的有效投注。</p>
              <p>申请方式：当周内达到要求时，即可联系在线客服申请。</p>
            </div>
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==8">
      <div class="shadow" @click="popupStatus"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动内容</p>
            <div class="popupActiveConten">
              <p>新会员首次入款，即送18元彩金，多存多送，最高达18888元。头彩欢迎新会员加入我们，现在起只要您加入我们并完成首次充值100元以上，即可获得派送的幸运彩金，存越多赠送越多，老品牌值得信赖。</p>
              <table class="popupActiveTable">
                <tr>
                  <td>首次存款</td>
                  <td>赠送彩金</td>
                  <td>流水要求</td>
                </tr>
                <tr>
                  <td>100+</td>
                  <td>18</td>
                  <td class="tdValignM" rowspan="8">3倍</td>
                </tr>
                <tr>
                  <td>500+</td>
                  <td>38</td>
                </tr>
                <tr>
                  <td>1000+</td>
                  <td>68</td>
                </tr>
                <tr>
                  <td>10000+</td>
                  <td>388</td>
                </tr>
                <tr>
                  <td>50000+</td>
                  <td>888</td>
                </tr>
                <tr>
                  <td>100000+</td>
                  <td>1888</td>
                </tr>
                <tr>
                  <td>500000+</td>
                  <td>8888</td>
                </tr>
                <tr>
                  <td>1000000+</td>
                  <td>18888</td>
                </tr>
              </table>
              <p>示例：新会员注册后，首次存款100元，获得彩金18元，则有效投注需达到（100+18）*3=354元即可申请</p>
            </div>

            <p class="popupActivedital">申请方式</p>
            <div
              class="popupActiveConten"
            >符合申请条件的会员请在成功存款之后未进行投注前联系在线客服申请，我们将在第一时间受理并派送幸运彩金（由于申请人数较多，如有耽搁延误敬请谅解）。</div>
            <p class="popupActivedital">活动说明</p>
            <div class="popupActiveConten">
              <p>1：符合申请条件的会员请在成功存款之后未进行投注前提出申请，如已进行投注，则申请视为无效。</p>
              <p>2：每个会员，每个IP，只能申请一次，如出现同IP或多账号现象，视为同一人，此IP下的所有会员公司均有权拒送彩金。</p>
              <p>3：此活动可与其他优惠同时进行。</p>
            </div>
            <p class="popupActivedital">规则与条款</p>
            <div class="popupActiveConten">
              <p>1:所有优惠活动必须严格按活动说明进行申请。</p>
              <p>2:每位玩家，每户，同一地址，同一邮箱，同一电话号码，相同的支付方式以及IP地址等视为同一用户，若用户重复申请或注册多账号行为，以不诚实方式套取优惠的行为，公司有权保留冻结，取消该团队或个人账户及账户余额的权利。</p>
              <p>3:头彩将保留对活动的最终解释权，在任何情况下都可以随时更改，停止，取消优惠活动的权利。</p>
            </div>
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
    <div class="popupActive" v-show="popupStatus&&curImgUrl==9">
      <div class="shadow" @click="popupStatus"></div>
      <div class="main">
        <div class="inner">
          <div class="box">
            <p class="activeExplain">
              <span>活动说明</span>
            </p>
            <p class="popupActivedital">活动内容</p>
            <div
              class="popupActiveConten"
            >为了感恩广大彩民一路以来的依赖与支持，即日起凡是通过支付宝，微信这两种方式转账至公司银行卡，额外赠送1%入款优惠。支付宝，微信转账通道稳定，到账及时，全程担保，大额无忧。</div>
            <p class="popupActivedital">充值方式</p>
            <div class="popupActiveConten">
              <p>1：登录会员账号后，点击充值，选择公司入款栏目，然后点击“支付宝微信转银行卡”查看银行账号。</p>
              <p>2：然后通过以下方式进行转账：</p>
              <p>(一)支付宝转账到银行卡</p>
              <p>步骤：打开支付宝，点击【转账】-【转账到银行卡】，输入我司入款银行账号进行转账，1-3分钟即可到账。</p>
              <p>(二)微信转账到银行卡</p>
              <p>步骤：打开微信，点击【我】-【钱包】-【收付款】-【转账到银行卡】，输入我司入款银行账号进行转账，1-3分钟即可到账。</p>
              <p>注意：微信转账到银行卡，北京时间23:00-02:00期间银行业务结算，到账会出现延迟，期间建议使用支付宝或网银转账到银行卡进行入账。</p>
              <p>3：待转账成功后，在“支付宝微信转银行卡”页面中填写汇款信息提交审核（其中的“汇款方式”选择“支付宝转账”或“微信转账”）。</p>
              <p>4：我们将根据您提交的汇款信息进行审核，确认到账后立刻为您账户充值。</p>
            </div>
            <p class="popupActivedital">活动说明</p>
            <div class="popupActiveConten">
              <p>1:通过以上方式进行充值，存款优惠会自动添加到您的账号中。</p>
              <p>2:此活动可与其他优惠同时进行。</p>
            </div>
            <p class="popupActivedital">规则与条款</p>
            <div class="popupActiveConten">
              <p>1:所有优惠活动必须严格按活动说明进行申请。</p>
              <p>2:每位玩家，每户，同一地址，同一邮箱，同一电话号码，相同的支付方式以及IP地址等视为同一用户，若用户重复申请或注册多账号行为，以不诚实方式套取优惠的行为，公司有权保留冻结，取消该团队或个人账户及账户余额的权利。</p>
              <p>3:头彩将保留对活动的最终解释权，在任何情况下都可以随时更改，停止，取消优惠活动的权利。</p>
            </div>
          </div>
          <!-- <div class="bottomCoin"></div> -->
          <div class="btn" @click="closeActivesPop"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "activesPopups",
  props: {
    popupStatus: {
      type: Boolean,
      default: false
    },
    curImgUrl: {
      type: Number,
      default: 0
    }
  },
  methods: {
    closeActivesPop() {
      this.$emit("closeActivesPop");
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~common/sass/variable'
.popupActive
  z-index: 8
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  .shadow
      z-index: 9
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: #111
      opacity: 0.7
  .main
      z-index: 10
      width: 800px
      position: fixed
      top: 50%
      left: 0
      right: 0
      margin: 0 auto
      transform: translateY(-50%)
      .inner
          position: relative
          background-image: url("./images/activeBackground.png")
          background-size: cover
          height: 400px
          overflow: hidden
          overflow-y: auto
          padding-bottom: 140px
          .bottomCoin
            width: 100%
            height: 140px
            position: absolute
            bottom: -140px
            background-image: url("./images/bottomCoin.png")
            background-size: cover
          .box
              width: 600px
              margin: 0px auto
              padding-top: 20px
              color: #FFF
              .activeExplain
                width: 100%
            
                span
                display: block
                width: 100px
                padding: 10px 30px
                text-align: center
                font-size: 18px
                font-weight: 800
                color: red
                background: #FFF
                margin: 0px auto
                margin-bottom: 50px
                -webkit-box-reflect: below 5px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.3)))
          .btn
              z-index: 9
              position: absolute
              top: 5px
              right: 6px
              width: 40px
              height: 40px
              background-image: url("./images/closedd.png")
              background-size: cover
              cursor: pointer
.popupActivedital
  font-size: 22px
  padding: 8px 3px 8px 3px
  text-align: center
  background: orange
.popupActiveConten
  padding: 10px 0px
  font-size: 16px
  line-height: 20px
  letter-spacing: 1px
  p
    padding: 5px
    line-height: 20px
    letter-spacing: 1px
.popupActiveTable
 width: 100%
 font-size: 14px
 border-collapse: separate
 border-spacing: 4px 8px
 color: black
 tr:nth-child(odd)
  background: Coral
 tr:nth-child(even)
  background: #FFF
td 
  text-align: center
  padding: 6px 2px
.tdValignM
    vertical-align: middle
    valign: middle
</style>