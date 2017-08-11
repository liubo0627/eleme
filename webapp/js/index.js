mui.ready(function() {

	mui.plusReady(function() {
		var user = document.getElementById('user')
		console.log(user)
		if(sessionStorage.getItem('username') == null && plus.webview.currentWebview().username) {
			sessionStorage.setItem('username', plus.webview.currentWebview().username)
			user.innerHTML = '用户:<h2>' + sessionStorage.getItem("username") + '</h2>'
		} else if(sessionStorage.getItem('username')) {
			user.innerHTML = '用户:<h2>' + sessionStorage.getItem("username") + '</h2>'
		} else {
			var str = '<div class="mui-media-body">'
			str += '<p class="mui-ellipsis mui-icon mui-icon-contact"></p>'
			str += '<p class="mui-ellipsis loading"><a href="pages/login/login.html">立即登录</a>  <a href="pages/register/register.html">立即注册</a>'
			str += '</p>'
			str += '</div>'
			user.innerHTML = str;
		}
	});

	window.addEventListener('scroll', function(e) {
		var fixed = document.querySelector('.fixed')
		var homeheader = document.querySelector('.homeheader')
		var fixedHeight = fixed.offsetTop;
		var hiddenTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(hiddenTop >= fixedHeight) {
			//console.log(11111)
			fixed.style.position = 'fixed';
			fixed.style.top = '.44rem';
			fixed.style.zIndex = '99'
			homeheader.style.marginBottom = '.44rem'
		} else {
			fixed.style.position = 'static';
			homeheader.style.marginBottom = '0rem'
		}
	})
})

mui.ready(function() {

	//	console.log(plus.webview.currentWebview().username)
	console.log(sessionStorage.getItem('username'))

	var num = 1;

	var flag = true;

	var page = 2;

	mui.ajax('http://10.36.132.129:3000/api/news?page=1', {
		data: {

		},
		jsonp: 'callback',
		dataType: 'jsonp', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		success: function(data) {
			console.log(JSON.parse(data)[0].title)
			console.log(JSON.parse(data)[0].img)
			var str = '';

			var arr = JSON.parse(data)
			console.log(arr.length)
			for(var i = 0; i < arr.length; i++) {
				var li = document.createElement('li');

				li.innerHTML = '<li data-id="' + arr[i]._id + '" class="mui-table-view-cell mui-media">' +
					'<a href="javascript:;">' +
					'<img class="mui-media-object mui-pull-left" src="http://10.36.132.129:3000/' + arr[i].img + '">' +
					'<div class="mui-media-body">' +
					'<p class="mui-ellipsis">' + arr[i].title + '</p>' +
					'</div>' +
					'</a>' +
					'</li>';

				news.appendChild(li)

			}

		}

	});

	var box = document.querySelector('.box');
	var news = document.querySelector('.news');

	var lastHeight = news.lastElementChild
//	console.log(news.lastElementChild.offsetTop)

	document.addEventListener('scroll', function(e) {
		var hiddenTop = document.documentElement.scrollTop || document.body.scrollTop;
//		var lastHeight = news.lastElementChild.offsetTop;
		var boxHeight = 430;
		//console.log(lastHeight)
		//		if(flag) {
		//			if(boxHeight + hiddenTop >= lastHeight) {
		//				flag = false;
		//				mui.ajax('http://10.36.132.129:3000/api/news', {
		//					data: {
		//
		//					},
		//					jsonp: 'callback',
		//					dataType: 'jsonp', //服务器返回json格式数据
		//					type: 'get', //HTTP请求类型
		//					success: function(data) {
		//						var str = '';
		//
		//						var arr = JSON.parse(data)
		//
		//						for(var i = 0; i < arr.length; i++) {
		//							var li = document.createElement('li');
		//
		//							li.innerHTML = '<li data-id="' + arr[i]._id + '" class="mui-table-view-cell mui-media">' +
		//								'<a href="javascript:;">' +
		//								'<img class="mui-media-object mui-pull-left" src="http://10.36.132.129:3000/' + arr[i].img + '">' +
		//								'<div class="mui-media-body">' +
		//								'<p class="mui-ellipsis">' + arr[i].title + '</p>' +
		//								'</div>' +
		//								'</a>' +
		//								'</li>';
		//
		//							news.appendChild(li)
		//
		//						}
		//
		//						if(arr.length - news.childElementCount <= -7) {
		//							flag = false
		//						} else {
		//							flag = true
		//						}
		//
		//					}
		//				});
		//
		//			}
		//		}
	})

	var news_cate = document.querySelectorAll('.news_cate')
	console.log(news_cate.length)

	for(var i = 0; i < news_cate.length; i++) {
		news_cate[i].index = i;
		news_cate[i].addEventListener('tap', function() {
			mui.ajax({
				url: "http://10.36.132.129:3000/api/news_cate",
				data: {
					"cate_id": this.index + 1
				},
				dataType: "jsonp",
				success: function(data1) {
					console.log(JSON.parse(data1).length)
					var str1 = '';

					var arr1 = JSON.parse(data1)

					for(var j = 0; j < arr1.length; j++) {
						var li = document.createElement('li');

						str1 += '<li data-id="' + arr1[j]._id + '" class="mui-table-view-cell mui-media">' +
							'<a href="javascript:;">' +
							'<img class="mui-media-object mui-pull-left" src="http://10.36.132.129:3000/' + arr1[j].img + '">' +
							'<div class="mui-media-body">' +
							'<p class="mui-ellipsis">' + arr1[j].title + '</p>' +
							'</div>' +
							'</a>' +
							'</li>';

					}
					news.innerHTML = str1
					if(arr1.length - news.childElementCount <= -7) {
						flag = false
					} else {
						flag = true
					}

				}
			})
		})
	}
//confict

//跳转新闻详情页面
	mui('.news_title').on('tap','li',function(){
		
//			console.log(this.getAttribute('data-id'))
			newsid=this.getAttribute('data-id');
			console.log(this.getAttribute('data-id'));
			mui.openWindow(
				{
				    'url':'pages/newsdetail/newsdetail.html',
					id:'newsdetail',
				    extras:{
				      newsId:newsid,//自定义扩展参数，可以用来处理页面间传值
				      userid:sessionStorage.getItem('username')||''
				    },
			}
			)
		})
//end
})

//此处轮播图ajax请求
mui.ready(function() {
	var focusimg = document.querySelectorAll('.focus-img');
	//console.log(focusimg[1].setAttribute('src','abc'))
	console.log(focusimg)
	mui.ajax('http://10.36.132.129:3000/api/focus', {
		data: {

		},
		jsonp: 'callback',
		dataType: 'jsonp', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		success: function(data) {

			console.log(JSON.parse(data)[0].img)
			var str = '';

			var arr = JSON.parse(data)

			for(var i = 0; i < arr.length; i++) {
				focusimg[i].setAttribute('src', "http://10.36.132.129:3000/" + arr[i].img)

			}

		}
	})
})