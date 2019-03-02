export function fiftle(code,index){
	if( /5x/.test(code) ){
        return true;
    }
    if( /q4/.test(code) ){
        if(index < 4){return true;}
    }
    if( /h4/.test(code) ){
        if(index > 0){return true;}
    }
    if( /q3/.test(code) ){
        if(index < 3){return true;}
    }
    if( /z3/.test(code) ){
        if(index != 0 && index != 4){return true;}
    }
    if( /h3/.test(code) ){
        if(index > 1){return true;}
    }
    if( /q2/.test(code) ){
        if(index < 2){return true;}
    }
    if( /h2/.test(code) ){
        if(index > 2){return true;}
    }
    if( /dwd/.test(code) ){
        if(index >= 0){return true;}
    }
    if( /rx/.test(code) ){
        return true;
    }
    if( /lh/.test(code) ){
        if( /lh_lhh_wq/.test(code) ){
            if(index == 0 || index == 1){return true;}
        }
        if( /lh_lhh_wb/.test(code) ){
            if(index == 0 || index == 2){return true;}
        }
        if( /lh_lhh_ws/.test(code) ){
            if(index == 0 || index == 3){return true;}
        }
        if( /lh_lhh_wg/.test(code) ){
            if(index == 0 || index == 4){return true;}
        }
        if( /lh_lhh_qb/.test(code) ){
            if(index == 1 || index == 2){return true;}
        }
        if( /lh_lhh_qs/.test(code) ){
            if(index == 1 || index == 3){return true;}
        }
        if( /lh_lhh_qg/.test(code) ){
            if(index == 1 || index == 4){return true;}
        }
        if( /lh_lhh_bs/.test(code) ){
            if(index == 2 || index == 3){return true;}
        }
        if( /lh_lhh_bg/.test(code) ){
            if(index == 2 || index == 4){return true;}
        }
        if( /lh_lhh_sg/.test(code) ){
            if(index == 3 || index == 4){return true;}
        }
    }
    if( /wxwf/.test(code) ){
        if( /wxwf_dxds_wan/.test(code) ){
            if(index == 0){return true;}
        }
        if( /wxwf_dxds_qian/.test(code) ){
            if(index == 1){return true;}
        }
        if( /wxwf_dxds_bai/.test(code) ){
            if(index == 2){return true;}
        }
        if( /wxwf_dxds_shi/.test(code) ){
            if(index == 3){return true;}
        }
        if( /wxwf_dxds_ge/.test(code) ){
            if(index == 4){return true;}
        }
        if( /wxwf_tm_tm/.test(code) ){
            return true
        }
    }
}

export function showTxt(type,code,list){
		let count = 0;

		//前三、中三、后三、前二、后二   和值和跨度判断
		if( /zx_hz/.test(code) || /zux_hz/.test(code) || ( ( /q2/.test(code) || /h2/.test(code) ) && !/kd/.test(code) ) ){
            list.forEach( (item,index) => {
            	if( /q3/.test(code) ){
            		if(index < 3){
						count += parseInt(item);
            		}
            	}
            	if( /z3/.test(code) ){
            		if(index > 0 && index < 3){
						count += parseInt(item);
            		}
            	}
            	if( /h3/.test(code) ){
            		if(index > 1){
						count += parseInt(item);
            		}
            	}
            	if( /q2/.test(code) ){
            		if(index < 2){
						count += parseInt(item);
            		}
            	}
            	if( /h2/.test(code) ){
            		if(index > 2){
						count += parseInt(item);
            		}
            	}
            });
            return count;
        }else if(/kd/.test(code)){   //跨度
        	let newList = [];
        	let count = 0;
        	for(let i = 0; i < list.length; i++){
        		if( /q3/.test(code) ){
	    			if(i < 3){
	    				newList.push(list[i]);
	    			}
	    		}
	    		if( /z3/.test(code) ){
	    			if(i > 0 && i < 3){
	    				newList.push(list[i]);
	    			}
	    		}
	    		if( /h3/.test(code) ){
	    			if(i > 1){
	    				newList.push(list[i]);
	    			}
	    		}
	    		if( /q2/.test(code) ){
	    			if(i < 2){
	    				newList.push(list[i]);
	    			}
	    		}
	    		if( /h2/.test(code) ){
	    			if(i > 2){
	    				newList.push(list[i]);
	    			}
	    		}
    		}
      		return Math.max(...newList) - Math.min(...newList);
        }
		if( /5x/.test(code) ){
	        let a = Array.from(new Set(list));
	        if(a.length == 5){return "组选120"}
	        if(a.length == 4){return "组选60"}
	        if(a.length == 3){
	        	for(let i = 0; i < list.length; i++){
	        		let n = 0;
	        		for(let j = 0; j < list.length; j++){
	        			if(list[i] == list[j]){
	        				n++;
	        			}
	        			if(n == 3){return "组选20";}
	        		}
	        	}
	        	return "组选30";
	        }
	        if(a.length == 2){
	        	for(let i = 0; i < list.length; i++){
	        		let n = 0;
	        		for(let j = 0; j < list.length; j++){
	        			if(list[i] == list[j]){
	        				n++;
	        			}
	        			if(n == 4){return "组选5";}
	        		}
	        	}
	        	return "组选10"
	        }
	        if(a.length == 1){return "--"}
	    }
	    if( /q4/.test(code) ||  /h4/.test(code) ){
	    	let newList = [...list];
	    	if( /q4/.test(code) ){
	    		newList.splice(4,1);
	    	}else{
	    		newList.splice(0,1);
	    	}
	    	let a = Array.from(new Set(newList));
	        if(a.length == 4){return "组选24"}
	        if(a.length == 3){return "组选12";}
	        if(a.length == 2){
	        	for(let i = 0; i < newList.length; i++){
	        		let n = 0;
	        		for(let j = 0; j < newList.length; j++){
	        			if(a[i] == newList[j]){
	        				n++;
	        				if(n == 3){return "组选4";}
	        			}
	        		}
	        	}
	        	return "组选6";
	        }
	        if(a.length == 1){return "--"}
	    }
	    if( /q3/.test(code) || /z3/.test(code) || /h3/.test(code) ){
	    	let newList = [...list];
	    	if( /q3/.test(code) ){
	    		newList.splice(3,2);
	    	}else if( /z3/.test(code) ){
	    		newList.splice(0,1);
	    		newList.splice(newList.length-1,1);
	    	}else{
	    		newList.splice(0,2);
	    	}
	    	let a = Array.from(new Set(newList));
	        if(a.length == 3){return "组六";}
	        if(a.length == 2){return "组三";}
	        return "--";
	    }
	    if( /q2/.test(code) ){
	       	
	    }
	    if( /h2/.test(code) ){
	        	
	    }
	    if( /dwd/.test(code) ){
	        	
	    }
	    if( /rx/.test(code) ){
	       
	    }
	    if( /lh/.test(code) ){
	        if( /lh_lhh_wq/.test(code) ){
	        	return list[0] > list[1] ?  "龙" : list[0] == list[1] ?  "和" :  "虎";
	        }
	        if( /lh_lhh_wb/.test(code) ){
	            return list[0] > list[2] ?  "龙" : list[0] == list[2] ?  "和" :  "虎";	
	        }
	        if( /lh_lhh_ws/.test(code) ){
	            return list[0] > list[3] ?  "龙" : list[0] == list[3] ?  "和" :  "虎";	
	        }
	        if( /lh_lhh_wg/.test(code) ){
	            return list[0] > list[4] ?  "龙" : list[0] == list[4] ?  "和" :  "虎";	
	        }
	        if( /lh_lhh_qb/.test(code) ){
	            return list[1] > list[2] ?  "龙" : list[1] == list[2] ?  "和" :  "虎";	
	        }
	        if( /lh_lhh_qs/.test(code) ){
	            return list[1] > list[3] ?  "龙" : list[1] == list[3] ?  "和" :  "虎";	
	        }
	        if( /lh_lhh_qg/.test(code) ){
	            return list[1] > list[4] ?  "龙" : list[1] == list[4] ?  "和" :  "虎";	
	        }
	        if( /lh_lhh_bs/.test(code) ){
	            return list[2] > list[3] ?  "龙" : list[2] == list[3] ?  "和" :  "虎";	
	        }
	        if( /lh_lhh_bg/.test(code) ){
	            return list[2] > list[4] ?  "龙" : list[2] == list[4] ?  "和" :  "虎";	
	        }
	        if( /lh_lhh_sg/.test(code) ){
	            return list[3] > list[4] ?  "龙" : list[3] == list[4] ?  "和" :  "虎";	
	        }
	    }
	    if( /wxwf/.test(code) ){
	    	let a = "",b = "",c = "";
	        if( /wxwf_dxds_wan/.test(code) ){
	        	a = list[0] > 4 ? "大 " : "小 ";
	        	b = list[0]&1 === 1 ? "单" : "双";
	        	c = list[0] == 5 ? "和" : "";
	        }
	        if( /wxwf_dxds_qian/.test(code) ){
	            a = list[1] > 4 ? "大 " : "小 ";
	        	b = list[1]&1 === 1 ? "单" : "双";
	        	c = list[1] == 5 ? " 和" : "";	
	        }
	        if( /wxwf_dxds_bai/.test(code) ){
	           	a = list[2] > 4 ? "大 " : "小 ";
	        	b = list[2]&1 === 1 ? "单" : "双";
	        	c = list[2] == 5 ? " 和" : "";
	        }
	        if( /wxwf_dxds_shi/.test(code) ){
	            a = list[3] > 4 ? "大 " : "小 ";
	        	b = list[3]&1 === 1 ? "单" : "双";
	        	c = list[3] == 5 ? " 和" : "";	
	        }
	        if( /wxwf_dxds_ge/.test(code) ){
	            a = list[4] > 4 ? "大 " : "小 ";
	        	b = list[4]&1 === 1 ? "单" : "双";
	        	c = list[4] == 5 ? " 和" : "";	
	        }
	        if( /wxwf_tm_tm/.test(code) ){
	            return ""
	        }
	        return  a + b + c;
	    }
}