
CommUtil = {
	isEmpty: function(str) {
		return (str == undefined || str == null || str.length == 0 || str == "undefined");
	},
	isNotEmpty: function(str) {
		return !this.isEmpty(str);
	},
	isArray: function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	},
	delArrayValue: function(arr, value) {
		log(arr);
		var len = arr.length;
		while(len--){
			console.log(len+"="+arr[len]);
			if(arr[len]==value){
				arr.splice(len,1);
				break;
			}
		}
		return arr;
	},
	delJsonArrayById: function(jsonArr, id) {
		for(var i=0,l=jsonArr.length;i<l;i++){
			log(jsonArr[i]['id']);
			if(jsonArr[i]['id']==id){
				jsonArr.splice(i,1);
				break;
			}
		}
		return jsonArr;
	},
	getJsonArrayItemById: function(jsonArr, id) {
		var item = null;
		for(var i=0,l=jsonArr.length;i<l;i++){
			log(jsonArr[i]['id']);
			if(jsonArr[i]['id']==id){
				item = jsonArr[i];
				break;
			}
		}
		return item;
	},
	containsArray: function(array, item) {
		//console.log("isArray:"+isArray(array)+"  "+array+"  --- "+item);
		var selectItem = false;
		if(isNotEmpty(array)){
			if(isArray(array)){
				for(var dex in array){
					//console.log(array[dex]+"="+item);
					if(array[dex] == item){
						selectItem = true;
						break;
					}
				}
			}else{
				//console.log(array+"="+item);
				if(array == item){
					selectItem = true;
				}
			}
		}
		return selectItem;
	},
	toText: function(obj){
		if(this.isEmpty(obj))
			return "";
		return obj;
	},
	setDefValue: function(obj, def){
		if(this.isEmpty(obj))
			return def;
		return obj;
	},
	getRandom: function (){
		return Math.ceil(Math.random()*1000000000000);
	},
	trim: function (str) {
		return str.replace(/^\s+|\s+$/g, "");
	},
	getMapLength: function (obj){
		var count = 0;
		for(var i in obj){
			if(obj.hasOwnProperty(i)){
				count++;
			}
		}
		return count;
	},
	/**
	 * 滚动条向下 滚动
	 * @param scrollNum 滚动数 px
	 */
	scrollDown: function(scrollNum){
		$(window).scrollTop(scrollNum);
	},
	/*getMainPanelHeight: function(){
		var outerHeight = top.window.outerHeight;
		var footerHeight = 250;
		return (outerHeight-footerHeight-this.getMainContentOffsetTop())+"px";
	},
	getMainContentOffsetTop: function(id){
		var mTop = $('#main-content')[0].offsetTop;
		var sTop = $(window).scrollTop();
		return mTop - sTop;
	},*/
	/**
	 * 获取 响应式 宽度
	 * @param def
	 * @returns {number}
	 */
	getResponsiveWidth: function(def){
		var inWidth = top.window.innerWidth;
		var outWidth = top.window.outerWidth;
		//移动端
		if(outWidth < 768){
			def = outWidth-40;
		}
		//dialogTip("inWidth:"+inWidth+", outWidth:"+outWidth);
		return def;
	},
	/**
	 * 获取 响应式 高度
	 * @param def
	 * @returns {number}
	 */
	getResponsiveHeight: function(def){
		var inHeight = top.window.innerHeight;
		var outHeight = top.window.outerHeight;
		//移动端
		if(outHeight < 1024){
			def = outHeight-300;
		}
		//dialogTip("inHeight:"+inHeight+", outHeight:"+outHeight);
		return def;
	},

}

StrUtil = {
	trim: function (str) {
		return str.replace(/^\s+|\s+$/g, "");
	},
}

/**
 * 日志工具类
 * @type {getTime, now, getDateStr, getTimeStr}
 */
DateUtil = {
	/**
	 * @returns 毫秒
	 */
	getTime: function(){
		return new Date().getTime();
	},
	/**
	 * @returns yyyy-MM-dd HH:mm:ss
	 */
	now: function(){
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		minute = minute < 10 ? ('0' + minute) : minute;
		var second = date.getSeconds();
		second=second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
	},
	/**
	 * @returns yyyy-MM-dd
	 */
	getDateStr: function(){
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? '0' + m : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		return y + '-' + m + '-' + d;
	},
	/**
	 * @returns HH:mm:ss
	 */
	getTimeStr: function(){
		var date = new Date();
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		minute = minute < 10 ? ('0' + minute) : minute;
		var second = date.getSeconds();
		second = second < 10 ? ('0' + second) : second;
		return h+':'+minute+':'+second;
	}
}

/**
 * 绑定高亮搜索
 * @param scopeId 作用域ID
 * @param inputSearchId 搜索输入框ID
 * @param searchFormId 搜索表单ID
 */
function bindHighlightSearch(scopeId, inputSearchId, searchFormId){
	var key = "highlight_search";
	var keyword = store.get(key);
	//log("get highlight_search:"+keyword);
	if(isNotEmpty(keyword)){
		setTimeout(function(){
			$("#"+scopeId).highlight(keyword);//高亮
		},  00);
		store.set(key, null);
	}

	//表单提交时 设值
	$("#"+searchFormId).bind("submit", function(){
		keyword = $("#"+inputSearchId).val();
		if(isNotEmpty(keyword))
			store.set(key, keyword);
	});
}


/**
 * 绑定 字数统计 （初始化页面时调用）
 * @param textareaId 文本域属性id
 * @param tipId 提示标签id
 */
function bindWordCount(textareaId, tipId){
	//键盘松开事件
	$("textarea[id="+textareaId+"]").keyup(function(){
		$("#"+tipId).text($(this).val().length);
	});
}

/**
 * 获得 文本框组 值
 * @param inputId
 * @returns {Array}
 */
function getInputGroupVal(inputId) {
	var vals = new Array();
	$("#"+inputId).each(function(){
		var val = $(this).val();
		if(isNotEmpty(val))
			vals.push(val);
	});
	return vals;
}



/**
 * 打印日志
 * @param msg
 */
function log(msg){
	console.log(msg);
}

function logParam(p1, p2, p3, p4, p5, p6, p7, p8){
	console.log("param:"+getStrVal(p1)+getStrVal(p2)+getStrVal(p3)+getStrVal(p4)+getStrVal(p5)+getStrVal(p6)+getStrVal(p7)+getStrVal(p8));
}

function getStrVal(param, appendPrefix){
	appendPrefix = appendPrefix==undefined?"|":appendPrefix;
	return param==undefined?"":appendPrefix+param;
}

function getValLength( value, element ) {
	if(isNotEmpty(element)){
		switch( element.nodeName.toLowerCase() ) {
			case "select":
				return $("option:selected", element).length;
			case "input":
				if ( this.isCheckable( element) ) {
					return this.findElementByName(element.name).filter(":checked").length;
				}
		}
	}
	return value.length;
}

String.prototype.startWith=function(str){
	var reg=new RegExp("^"+str);
	return reg.test(this);
}
String.prototype.endWith=function(str){
	var reg=new RegExp(str+"$");
	return reg.test(this);
}


/**
 * 调用
 * var buffer = new StringBuffer();
 *	buffer.append("Hello ").append("javascript");
 *	alert(buffer.toString();
 */
/**
 *字符串 拼接
 * */
function StringBuffer() {
	this.__strings__ = new Array();
}
StringBuffer.prototype.append = function (str) {
	this.__strings__.push(str);
	return this;    //方便链式操作
}
StringBuffer.prototype.toString = function () {
	return this.__strings__.join("");
}
//清除
StringBuffer.prototype.clear = function () {
	this.__strings__ = new Array();
	return this;
}
/*扩展　String 原生方法*/
String.prototype.startWith=function(str){
	var reg=new RegExp("^"+str);
	return reg.test(this);
}
String.prototype.endWith=function(str){
	var reg=new RegExp(str+"$");
	return reg.test(this);
}
/*
String.prototype.replaceAll = function(s1, s2){
	return this.replace(new RegExp(s1,"gm"), s2);
}
*/


Array.prototype.containKey = function(key) {
	for (var k in this){
		if (k == key){
			return true;
		}
	}
	return false;
};


function Map() {

	/** Map 大小 **/
	this.len = 0;
	/** 对象 **/
	this.entry = new Object();

	/** 存 **/
	this.put = function (key , value){
		if(key == undefined)
			return;
		if(!this.containsKey(key)){
			this.len ++ ;
		}
		this.entry[key] = value;
	}

	/** 取 **/
	this.get = function (key){
		return this.containsKey(key) ? this.entry[key] : null;
	}

	/** 删除 **/
	this.remove = function ( key ){
		if( this.containsKey(key) && ( delete this.entry[key] ) ){
			this.len --;
		}
	}

	/** 是否包含 Key **/
	this.containsKey = function ( key ){
		return (key in this.entry);
	}

	/** 是否包含 Value **/
	this.containsValue = function ( value ){
		for(var prop in this.entry){
			if(this.entry[prop] == value){
				return true;
			}
		}
		return false;
	}

	/** 所有 Value **/
	this.values = function (){
		var values = new Array();
		for(var prop in this.entry){
			values.push(this.entry[prop]);
		}
		return values;
	}

	/** 所有 Key **/
	this.keys = function (){
		var keys = new Array();
		for(var prop in this.entry){
			keys.push(prop);
		}
		return keys;
	}
	/** Map Size **/
	this.size = function (){
		return this.len;
	}
	//判断MAP是否为空
	this.isEmpty = function() {
		return this.len < 1;
	};
	/* 清空 */
	this.clear = function (){
		this.len = 0;
		this.entry = new Object();
	}
	this.toObject = function(){
		var obj = {};
		for(var key in this.entry){
			if(typeof this.entry[key] != 'function' && key != '__proto__'){
				obj[key] = this.entry[key];
			}
		}
		return obj;
	};
}


/*
 * @brief: 定义队列类
 * @remark:实现队列基本功能
 */
function Queue(){
	//存储元素数组
	var aElement = new Array();
	/*
	 * @param: obj 元素
	 * @return: 返回当前队列元素个数
	 */
	Queue.prototype.add = function(obj){
		aElement.push(obj);
		console.log("add after:"+aElement);
	}

	/*
	 * @return: 弹出队尾元素 ,当队列元素为空时,返回null
	 */
	Queue.prototype.pop = function(){
		if (aElement.length == 0)
			return null;
		else{
			var obj = aElement.pop();
			console.log("pop after:"+aElement);
			return obj;
		}
	}

	/*
	 * @brief: 获取队列元素个数
	 * @return: 元素个数
	 */
	Queue.prototype.size = function(){
		return aElement.length;
	}
	/*
	 * @brief: 返回队头素值
	 * @return: vElement
	 * @remark: 若队列为空则返回null
	 */
	Queue.prototype.getHead = function(){
		if (aElement.length == 0)
			return null;
		else
			return aElement[0];
	}
	/*
	 * @brief: 返回队尾素值
	 * @return: vElement
	 * @remark: 若队列为空则返回null
	 */
	Queue.prototype.getEnd = function(){
		var len = aElement.length;
		if (len == 0)
			return null;
		else
			return aElement[len - 1];
	}

	/*
	 * @brief: 弹出指定元素
	 * @return: vElement
	 * @remark: 若队列为空则返回null
	 */
	Queue.prototype.popObj = function(obj){
		var len = aElement.length;
		if (len == 0)
			return null;
		else{
			for (var i = 0; i < len; i++) {
				var ele = aElement[i];
				if(obj == ele){
					var popObj = aElement.splice(i, 1);
					console.log("popObj after:"+aElement);
					return popObj[0];
				}
			}
			return null;
		}
	}

	/*
	 * @brief: 获取下标位置
	 * @return: index
	 * @remark: 若队列为空则返回-1
	 */
	Queue.prototype.indexOf = function(obj){
		if (aElement.length == 0)
			return -1;
		else{
			for (var i = 0; i < aElement.length; i++) {
				var ele = aElement[i];
				if(obj == ele){
					return i;
				}
			}
			return -1;
		}
	}

	/*
	 * @brief: 判断队列是否为空
	 * @return: 队列为空返回true,否则返回false
	 */
	Queue.prototype.isEmpty = function(){
		if (aElement.length == 0)
			return true;
		else
			return false;
	}
	/*
	 * @brief: 将队列元素转化为字符串
	 * @return: 队列元素字符串
	 */
	Queue.prototype.toString = function(){
		var sResult = (aElement.reverse()).toString();
		aElement.reverse()
		return sResult;
	}
}

//***************** form *****************

function setInputVal(inputEl, val){
	$(inputEl).val(val);
}

function refreshPage(){
	parent.window.location.href = parent.window.location.href;
}


/**
 * 绑定删除按钮
 * @param btnId 按钮ID
 * @param checkBoxName checkbox名称
 * @param url 执行url
 * @param succCall
 * @param filterCheckboxRule 过滤复选框规则 (只筛选有效的数据)
 * @param filterCheckboxRuleTip 规则提示语
 */
function bindBtnDeleteRows(btnId, checkBoxName, url, succCall, filterCheckboxRule, filterCheckboxRuleTip, groupId){
	bindBtnBatchOperRows(btnId, checkBoxName, "您确定要删除吗？", "删除", url, succCall, filterCheckboxRule, filterCheckboxRuleTip, groupId);
}


/**
 * 绑定 按钮批量操作行
 * @param btnId 按钮ID
 * @param checkBoxName checkbox名称
 * @param confirmTitle 确认提示语
 * @param actionTitle  操作标题（删除/修改 等等）
 * @param url     执行url
 * @param succCall    成功回调函数 缺省则刷新当前页面
 * @param filterCheckboxRule   过滤复选框规则 (只筛选有效的数据)
 * @param filterCheckboxRuleTip  规则提示语
 * @param groupId  组ID
 * @param beforeSendFun  提交前 函数
 */
function bindBtnBatchOperRows(btnId, checkBoxName, confirmTitle, actionTitle, url, succCall, filterCheckboxRule, filterCheckboxRuleTip, groupId,  beforeSendFun){
	$("#"+btnId).click(function(){
		var selectVals;
		if(isNotEmpty(groupId))
			selectVals= getSelectGroupCheckBoxVal(groupId);
		else
			selectVals = getSelectCheckBoxVal(checkBoxName, filterCheckboxRule, filterCheckboxRuleTip);
		if(selectVals.length == 0){
			layerAlert("请至少选择一条信息操作！", "warning");
			return;
		}
		//确认
		layerConfirm(confirmTitle, function(){
			ajaxPostSelectVals(actionTitle, url, selectVals, succCall, beforeSendFun);
		});
	});
}


/**
 * 绑定 按钮操作行
 * @param btnId 按钮ID
 * @param checkBoxName checkbox名称
 * @param confirmTitle 确认提示语
 * @param actionTitle  操作标题（删除/修改 等等）
 * @param url     执行url
 * @param succCall    成功回调函数 缺省则刷新当前页面
 * @param filterCheckboxRule   过滤复选框规则 (只筛选有效的数据)
 * @param filterCheckboxRuleTip  规则提示语
 * @param groupId  组ID
 * @param beforeSendFun  提交前 函数
 */
function bindBtnOperOneRow(btnId, checkBoxName, confirmTitle, actionTitle, url, succCall, filterCheckboxRule, filterCheckboxRuleTip, groupId,  beforeSendFun){
	$("#"+btnId).click(function(){
		var selectVals;
		if(isNotEmpty(groupId))
			selectVals= getSelectGroupCheckBoxVal(groupId);
		else
			selectVals = getSelectCheckBoxVal(checkBoxName, filterCheckboxRule, filterCheckboxRuleTip);
		if(selectVals.length != 1){
			layerAlert("有且只能选1条数据进行"+actionTitle+"！", "warning");
			return;
		}
		if(confirmTitle == null){
			ajaxPostSelectVals(actionTitle, url, selectVals, succCall, beforeSendFun);
		}else{
			//确认
			layerConfirm(confirmTitle, function(){
				ajaxPostSelectVals(actionTitle, url, selectVals, succCall, beforeSendFun);
			});
		}

	});
}


/**
 * 绑定按钮 导出 Excel
 * @param btnId
 * @param checkBoxName
 * @param searchFormId
 * @param exportUrl
 */
function bindBtnExportExcel(btnId, checkBoxName, searchFormId, exportUrl){
	$("#"+btnId).click(function(){
		var selectVals = getSelectCheckBoxVal(checkBoxName);
		if(selectVals.length == 0){
			layerAlert("请至少选择一条信息操作！", "warning");
			return;
		}
		$("input[name=selectVals]").val(selectVals.join());
		var oldAction = $("#"+searchFormId).attr("action");
		$("#"+searchFormId).attr("action", ctx + exportUrl);
		$("#"+searchFormId).submit();
		//还原地址
		setTimeout(function(){
			$("#"+searchFormId).attr("action", oldAction);
		}, 100);
	});
}



//*****************************begin 复选框***************************************//

/**
 * 获取 选中行 单元格值
 * @param checkBoxName
 * @param colIndex
 * @returns {Array}
 */
function getSelectCheckBoxRowColVal(checkBoxName, colIndex){
	var array = new Array();
	$("input[type=checkbox][name="+checkBoxName+"]:checked").each(function(){
		var tr = $(this).closest("tr");
		var text = tr.find("td:eq("+colIndex+")").text();
		array.push(trim(text));
	});
	return array;
}

/**
 * 获取 复选框值
 * @param checkBoxName
 * @param filterCheckboxRule 过滤复选框规则 (只筛选有效的数据)
 * @param filterCheckboxRuleTip 规则提示语
 * @returns {Array}
 */
function getSelectCheckBoxVal(checkBoxName, filterCheckboxRule, filterCheckboxRuleTip){
	var array = new Array();
	$("input[type=checkbox][name="+checkBoxName+"]:checked").each(function(){
		if(isNotEmpty(filterCheckboxRule)){
			var arr = filterCheckboxRule.split("=");
			var attrVal = $(this).attr(arr[0]);
			if(attrVal != arr[1]){
				layerAlert(filterCheckboxRuleTip, "error")
				throw new Error('异常, 终止脚本.');
				return false;
			}
		}
		array.push($(this).val());
	});
	return array;
}


/**
 * 获取 组的 复选框值
 * @param groupId 组ID 要求input加 groupId属性
 * @returns {Array}
 */
function getSelectGroupCheckBoxVal(groupId){
	var array = new Array();
	$("input[type=checkbox][groupId="+groupId+"]:checked").each(function(){
		array.push($(this).val());
	});
	return array;
}


/**
 * 绑定 checkbox 全选 eg: bindCheckBoxSelectAll("wordSelectAllId", "wordInputName");
 * @param checkBoxAllId 全选框ID
 * @param childBoxName 子checkbox 名称
 */
function bindCheckBoxSelectAll(checkBoxAllId, childBoxName){
	$("#"+checkBoxAllId).click(function(){
		var isChecked = $(this).is(":checked");
		$("input[type=checkbox][name="+childBoxName+"]").prop("checked", isChecked);
	});
}

/**
 * 绑定 checkbox 全选 eg: bindCheckBoxGroupSelectAll("wordSelectAllId", "wordInputName");
 * @param checkBoxAllId 全选框ID
 * @param childBoxName 子checkbox 名称
 */
function bindCheckBoxGroupSelectAll(checkBoxAllId, groupName){
	$("#"+checkBoxAllId).click(function(){
		var isChecked = $(this).is(":checked");
		$("input[type=checkbox][group="+groupName+"]").prop("checked", isChecked);
	});
}
//*****************************end 复选框***************************************//



SelectUtil = {
	buildSelectOptsHtml : function(selectBos){
		var opts = new StringBuffer();
		if(CommUtil.isNotEmpty(selectBos)){
			var selectBo = null;
			for(var i = 0; i < selectBos.length; i++){
				selectBo = selectBos[i];
				opts.append('<option value="'+selectBo.value+'" data-tokens="'+selectBo.text+'">'+selectBo.text+'</option>');
			}
		}
		return opts.toString();
	},
	ajaxInitSelectVals : function (url, selectId, callBuildOptStr) {
		HttpUtil.ajaxAsyncJsonPost(url, {}, function(data){
			var opts = callBuildOptStr(data);
			$("#"+selectId).append(opts);
		});
	}
}

HttpUtil = {

	/**
	 * ajax POST异步请求
	 * @param url
	 * @param paramArr
	 * @param succCall 或消息
	 * @param errorCall
	 * @param beforeSendFun 非必填
	 */
	ajaxAsyncJsonPost: function (url, paramArr, succCall, errorCall, beforeSendFun){
		$.ajax({
			type: "post",
			dataType: "json",
			url: ctx + url,
			data: paramArr,
			beforeSend: function(){
				if(typeof beforeSendFun == 'function'){
					beforeSendFun();
				}
			},
			success: function (data) {
				if(data.statusCode == 200){
					if(typeof succCall == 'function'){
						succCall(CommUtil.isEmpty(data.data)?data.message:data.data);
					}else if(typeof succCall == 'string'){
						dialogTip(succCall);
					}else{
						if(CommUtil.isEmpty(data.data) && succCall==undefined){
							dialogTip(data.message);
						}else{
							dialogTip("succCall参数不能为空", "error");
						}
					}
				}else{
					log("error:"+data.exception);
					if(typeof errorCall == 'function'){
						errorCall();
					}else{
						dialogTip(data.message, "error");
					}
				}
			},
			error: function(e){
				log(e)
				HttpUtil.ajaxErrorTip(e);
			}
		});
	},
	/**
	 * ajax GET异步请求
	 * @param url
	 * @param succCall
	 * @param dataType html/json/xml
	 */
	ajaxAsyncGET: function (url, succCall, dataType){
		dataType = CommUtil.setDefValue(dataType, "html");
		$.ajax({
			type: "GET",
			dataType: dataType,
			url: url,
			data: {},
			success: function (data) {
				succCall(data);
			},
			error: function(e){
				log(e)
				HttpUtil.ajaxErrorTip(e);
			}
		});
	},
	ajaxErrorTip: function (e, defMessage){
		console.log(e);
		if(e.status == 403){
			dialogTip("您没有操作权限，请联系管理员", "error");
		}else if(e.status == 404){
			dialogTip("请求不存在, 请联系管理员", "error");
		}else if(e.status == 500) {
			dialogTip("服务器内部错误，请联系管理员", "error");
		}else if(e.status == 0) {
			dialogTip("网络故障, 系统出错", "error");
		}else{
			if(CommUtil.isNotEmpty(defMessage))
				dialogTip("服务器内部错误，请联系管理员", "error");
		}
	}
}

BindUtil = {
		bindCheckBoxStatus: function(status){
			status = CommUtil.isEmpty(status)?"0":status;
			return status=="1"?"checked":"";
		},

}


//https://github.com/montagejs/collections

TableUtil = {
	/**
	 * 绑定 tr菜单选中
	 * @param tableId
	 */
	bingTrMenuActive: function(tableId){
		$(tableId).find("tr").on("click", function(){
			$(this).siblings().removeClass("active");//移除兄弟标记样式
			$(this).addClass("active");
		});
	},
	/**
	 * 向上 移动行
	 * @param thisEle 当前元素
	 */
	trMoveUp: function (thisEle){
		resetField = resetField == undefined ? false : resetField;
		//当前单元格
		var thisParent = $(thisEle).closest("tr");
		//当前单元格下标
		var thisIndex = $(thisParent).index();
		if(thisIndex != 1){
			//上一个单元格
			var prev = thisParent.prev();
			//克隆当前单元格
			var thisParentClone = thisParent.clone();
			thisParent.remove();
			prev.before(thisParentClone);
			if(resetField)
				tbl.trMoveAfterResetFieldIndex();//重置 字段下班
		}
	},
	/**
	 * 向下 移动行
	 * @param thisEle 当前元素
	 */
	trMoveDown: function (thisEle, resetField){
		resetField = resetField == undefined ? false : resetField;
		//当前单元格
		var thisParent = $(thisEle).closest("tr");
		//当前单元格下标
		var thisIndex = $(thisParent).index();
		var parentSibCount = thisParent.siblings().length;
		if(thisIndex != parentSibCount){
			//下一个单元格
			var next = thisParent.next();
			//克隆当前单元格
			var thisParentClone = thisParent.clone();
			thisParent.remove();
			next.after(thisParentClone);
			if(resetField)
				tbl.trMoveAfterResetFieldIndex();//重置 字段下班
		}
	},
	trMoveAfterResetFieldIndex : function(){

	}

}

FormUtil = {
	/**
	 * 过滤 空参数
	 * @param params
	 */
	filterNullParam: function(serializeArray){
		log(serializeArray);
		var newParams = {};
		var obj = null;
		for(var i=0; i<serializeArray.length; i++){
			obj = serializeArray[i];
			if(CommUtil.isNotEmpty(obj.value)){
				newParams[obj.name] = obj.value;
			}
		}
		log(newParams);
		return newParams;
	},
	paramToObject: function(paramStr){
		log(paramStr);
		var paramArray = paramStr.split("&");
		var params = {};
		var param = null;
		for(var i=0; i<paramArray.length; i++){
			param = paramArray[i].split("=");
			params[param[0]] = param[1];
		}
		log(params);
		return params;
	},
	/**
	 * 设置 输入值
	 * @param inputId
	 * @param formId
	 */
	setInputVal: function(inputId, value, formId){
		if(CommUtil.isNotEmpty(formId)){
			$(formId).find(inputId).val(value);
		}else{
			$(inputId).val(value);
		}
	},
	tryLockSubmit: function(){
		var key = "lockSubmit";
		var value = CacheUtil.get(key);
		var now = DateUtil.getTime();
		var timeout = 3000;
		if(value != null && ((now-value) < timeout)){
			dialogTip("请勿重复提交!", "error");
			throw new Error('请勿重复提交!');
		}else{
			CacheUtil.set(key, DateUtil.getTime());
			setTimeout(function(){
				CacheUtil.remove(key);
			}, timeout);
		}
	},
	//绑定排序
	bindOrder: function (searchFormId){
		if(CommUtil.isEmpty(searchFormId))
			searchFormId = "searchForm";

		var form = $("#"+searchFormId);
		var orderBy = CommUtil.setDefValue(form.find("#orderBy").val(), "");
		var order = CommUtil.setDefValue(form.find("#order").val(), "").toLowerCase();
		//绑定样式
		$("th[sort-field]").each(function(){
			var field = $(this).attr("sort-field");
			if(orderBy===field){
				$(this).addClass("sorting_"+order);
			}else{
				$(this).addClass("sorting");
			}
		});

		//绑定click
		$("th[sort-field]").bind("click", function(event){
			var field = $(this).attr("sort-field");
			var orderStr = $(this).attr("class");
			var order = "asc";
			var arr = orderStr.split("_");
			if(orderStr.length > 1){
				order = arr[1];
			}
			order = order==="asc"?"desc":"asc";
			form.find("#orderBy").val(field);
			form.find("#order").val(order);
			form.submit();
			event.stopPropagation();
		});
	},
	//搜索表单
	searchForm: function (searchFormId, pageNo, pageSize){
		if(CommUtil.isEmpty(searchFormId))
			searchFormId = "searchForm";
		var form = $("#"+searchFormId);
		form.find("#pageNo").val(pageNo);
		form.find("#pageSize").val(pageSize);
		form.submit();
	},
	bindFormAddBtn: function(title, width, height, btnId){
		btnId = CommUtil.setDefValue(btnId, "#addBtn")
		var url = $(btnId).data("href");
		var iframeId = CommUtil.getRandom();
		dialogOpenFullPage(iframeId, title, url, function(){
			var iframe = dialogGetIFrame(iframeId);
			iframe.contentWindow.ajaxSubmitIframeForm(function(){
				setTimeout(function(){
					dialogCloseIFrame(iframeId);
				}, 1000);
			});
		});
	},
	bindPromptAddBtn: function(title, isRefreshPage, type, btnId){
		btnId = CommUtil.setDefValue(btnId, "#addBtn");
		isRefreshPage = CommUtil.setDefValue(isRefreshPage, true);
		var url = $(btnId).data("href");
		dialogPrompt(title, function(content){
			HttpUtil.ajaxAsyncJsonPost(url, {text: content}, function(data){
				dialogTip(title+"成功");
				if(isRefreshPage){
					setTimeout(function(){
						window.location.href = window.location.href;
					}, 1000);
				}
			});
		}, type);
	},
	bindSwitchAjax: function(){
		$("input[type=checkbox][data-switch-url]").on("change", function(){
			var url = $(this).data("switch-url");
			var flag = $(this).is(":checked");
			if(CommUtil.isEmpty(url)){
				dialogAlert("程序代码有误，请联系管理员", "warning")
				return;
			}
			HttpUtil.ajaxAsyncJsonPost(url, {flag: flag}, function(message){
				dialogTip(message);
			});
		});


	}

}

/**
 * 缓存工具类
 * @ref store.js
 * @type {{get, set, has, remove}}
 */
CacheUtil = {
	get: function(key){
		return store.get(key);
	},
	set: function(key, val){
		return store.set(key, val);
	},
	has: function(key){
		return store.has(key);
	},
	remove: function (key){
		store.remove(key);
	}
}


SessionUtil = {
	get: function(key){
		return window.sessionStorage.getItem(key);
	},
	set: function(key, val){
		return window.sessionStorage.setItem(key, val);
	},
	has: function(key){
		var obj = this.get(key);
		return CommUtil.isNotEmpty(obj);
	},
	remove: function remove(key){
		return window.sessionStorage.removeItem(key);
	}
}


function refreshCache(){
	var url = "/common/clearCache";
	HttpUtil.ajaxAsyncJsonPost(url, {}, function(message){
		dialogTip(message);
	});
}