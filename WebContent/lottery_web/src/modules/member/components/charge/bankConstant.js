
const PAY_TYPE_ALIPAY = 2;
const PAY_TYPE_WEIXIN = 1;
const PAY_TYPE_CAIFUTONG = 3;
const PAY_TYPE_BANK = 4;

const PAY_TYPE_WEBSITE = 5;

const PAY_TYPE_NORMAL = 0;

const PAY_TYPE_MOBILE_WX_APP = 11;
const PAY_TYPE_MOBILE_ALI_APP = 12;
const PAY_TYPE_MOBILE_BANK_APP = 13;

export function testBankType(type){
	if(type == PAY_TYPE_ALIPAY || type == PAY_TYPE_WEIXIN || type == PAY_TYPE_CAIFUTONG || type == PAY_TYPE_NORMAL){
		return "thirdPay";
	}else if(type == PAY_TYPE_WEBSITE){
		return "website";
	}else{
		return "companyPay";
	}
}