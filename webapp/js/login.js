var username = document.getElementById('username');
var password = document.getElementById('password');
var btn = document.getElementById('btn');

var flag = false;
var flag1 = false;
username.onblur = function() {
	var reg = /^[\w]{6,12}$/
	if(reg.test(username.value)) {
		flag = true;
	} else {
		flag = false;
		console.log('用户名不能为空')
	}
}

password.onblur = function() {
	var reg1 = /^[\w]{6,18}$/
	if(reg1.test(password.value)) {
		flag1 = true;
	} else {
		flag1 = false;
		console.log('密码不能为空')
	}
}

btn.addEventListener('tap', function() {
	if(flag && flag1) {
		mui.ajax('http://10.36.132.15:3000/api/login', {
			data: {
				"username": username.value,
				"password": password.value,
			},
			dataType: 'jsonp', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			success: function(data) {
				console.log(data)
				if(JSON.parse(data).status > 0) {
					sessionStorage.setItem("username", username.value)
					mui.alert('登陆成功', '成功', '確定', function(e) {
						console.log(sessionStorage.getItem('username'))
						mui.openWindow({
							url: '../../index.html',
							id: 'index',
							extras: {
								username:username.value
							},
						})
					}, 'div')

				} else {
					mui.alert('登陆失败', '错误', '確定', function(e) {
						console.log('登陆失败的回调')
					}, 'div')

				}
			}
		});
	} else {
		mui.alert('用户名或密码填写不完整', '錯誤', '確定', function(e) {
			e.index
		}, 'div')
	}
})