var mform = document.querySelector('#abc')
var uname = document.querySelector('#username')
var password = document.querySelector('#password')
var pss = document.querySelector('#pass')
var btn = document.getElementById('btn');
var sex = mform.sex;

var flag = false; //用户名的flag
var flag1 = false; //密码用的flag
var flag2 = false; //确认密码用
uname.onblur = function() {
	var reg = /^[\w]{6,12}$/;
	if(uname.value == '' || uname.value == null) {
		console.log('用户名不能为空')
	} else if(reg.test(uname.value)) {
		mui.ajax('http://10.36.132.15:3000/api/user', {
			data: {
				username: uname.value,
			},
			dataType: 'jsonp', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			success: function(data) {
				console.log(JSON.parse(data).result)
				if(JSON.parse(data).result > 0) {
					mui.alert('用戶名已經存在', '錯誤', '確定', function(e) {
						e.index
					}, 'div')
				} else {
					console.log('y用戶名合法，可以使用')
					flag = true;
				}
			}
		});

	} else {
		mui.alert('用戶名不合法,長度6-12', '錯誤', '確定', function(e) {
			e.index
		}, 'div')
	}
}

password.onblur = function() {
	var reg1 = /^[\w]{6,18}$/
	if(password.value == '' || password.value == null) {
		mui.alert('密码不能为空', '錯誤', '確定', function(e) {
			e.index
		}, 'div')
	} else if(reg1.test(password.value)) {
		flag1 = true;
	} else {
		mui.alert('密码不合法,長度6-18', '錯誤', '確定', function(e) {
			e.index
		}, 'div')
	}
}

pass.onblur = function() {
	if(password.value != pass.value) {
		mui.alert('密码确认不一致', '錯誤', '確定', function(e) {
			e.index
		}, 'div')
	} else {
		flag2 = true;
	}
}

btn.addEventListener('tap', function() {
	console.log(sex.value)

	if(flag && flag1 && flag2) {
		mui.ajax('http://10.36.132.15:3000/api/register', {
			data: {
				"username": uname.value,
				"password": password.value,
				sex: sex.value
			},
			dataType: 'jsonp', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			success: function(data) {
				console.log(data)
				if(JSON.parse(data).status > 0) {
					mui.alert('注册成功,跳转登陆页面', '成功', '確定', function(e) {
						console.log('登陆成功回调')
						mui.openWindow({
							url: '../login/login.html',
							id: 'login'
						})
					}, 'div')
				} else {
					mui.alert('注册失败', '错误', '確定', function(e) {
//						window.location.href='../pages/register/register.html'
						console.log('登陆失败回调')
					}, 'div')
				}
			}
		});
	} else {
		mui.alert('资料填写不完整', '錯誤', '確定', function(e) {
			e.index
		}, 'div')
	}
})