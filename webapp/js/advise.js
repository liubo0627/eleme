var btn = document.getElementById('btn');

var oForm = document.getElementById('form')
var content = oForm.content;
var gologin = document.getElementById('gologin')
var title = oForm.title;
var uName = oForm.username;
var flag1 = false; //意见内容判定用
var flag2 = false; //标题不能为空

mui.plusReady(function() {

	if(sessionStorage.getItem('username') == null && plus.webview.currentWebview().username) {
		sessionStorage.setItem('username', plus.webview.currentWebview().username)

	} else {

	}

	if(sessionStorage.getItem("username")) {
		oForm.style.display = 'block';
		uName.value = sessionStorage.getItem("username")
		gologin.style.display = 'none';
	} else {
		oForm.style.display = 'none';
		gologin.style.display = 'block';
	}

	//uName.onblur = function() {
	//	if(uName.value == '' || uName.value == null) {
	//		mui.alert('用戶名不能為空', '錯誤', '確定', function(e) {
	//			e.index
	//		}, 'div')
	//	} else {
	//		mui.ajax('http://10.36.132.15:3000/api/user', {
	//			data: {
	//				username: uName.value,
	//			},
	//			dataType: 'jsonp', //服务器返回json格式数据
	//			type: 'get', //HTTP请求类型
	//			success: function(data) {
	//				if(JSON.parse(data).result > 0) {
	//					flag = true;
	//				} else {
	//					mui.alert('用戶名不存在', '錯誤', '確定', function(e) {
	//						e.index
	//					}, 'div')
	//				}
	//			}
	//		});
	//	}
	//}

	title.onblur = function() {
		if(title.value == '' || title.value == null) {
			mui.alert('标题内容不能為空', '錯誤', '確定', function(e) {
				e.index
			}, 'div')
		} else {
			flag1 = true;
		}
	}

	content.onblur = function() {
		if(content.value == '' || content.value == null) {
			mui.alert('意見內容不能為空', '錯誤', '確定', function(e) {
				e.index
			}, 'div')
		} else {
			flag2 = true;
		}
	}

	
});
btn.addEventListener('tap', function() {
		if(flag1 && flag2) {
			mui.ajax('http://10.36.132.15:3000/api/advise/add', {
				data: {
					username: uName.value,
					title: title.value,
					content: content.value
				},
				dataType: 'jsonp', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				success: function(data) {
					console.log(JSON.parse(data).status)
					if(parseInt(JSON.parse(data).status) == 1) {
						console.log('意见提交成功')
						mui.alert('意见提交成功', '成功', '確定', function(e) {
							window.location.href="../../index.html"
						mui.openWindow({
							url: '../../index.html',
							id: 'index'
						});
					}, 'div')
					}
				}
			});
		} else {
			mui.alert('用户名不正确或意见内容不完整', '錯誤', '確定', function(e) {
				e.index
			}, 'div')
		}
	})