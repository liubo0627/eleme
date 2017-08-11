

mui.ready(function(){
	window.addEventListener('scroll',function(e){
		var fixed=document.querySelector('.fixed')
		var homeheader=document.querySelector('.homeheader')
		var fixedHeight=fixed.offsetTop;
		var hiddenTop = document.documentElement.scrollTop||document.body.scrollTop;
		if(hiddenTop>=fixedHeight){
			//console.log(11111)
			fixed.style.position='fixed';
			fixed.style.top='.44rem';
			fixed.style.zIndex='99'
			homeheader.style.marginBottom='.44rem'
		}else{
			fixed.style.position='static';
			homeheader.style.marginBottom='0rem'
		}
	})

	

})

mui.ready(function(){
			var num=1;

			var flag=true;

			var page=1;
			
	var box=document.querySelector('.box');
	var news=document.querySelector('.news');
	
	var lastHeight=news.lastElementChild
	console.log(news.lastElementChild.offsetTop)
	
	document.addEventListener('scroll',function(e){
		var hiddenTop = document.documentElement.scrollTop||document.body.scrollTop;
		var lastHeight=news.lastElementChild.offsetTop;
		var boxHeight=430;
		//console.log(lastHeight)
		if(flag){
			if(boxHeight+hiddenTop>=lastHeight){
			flag=false;
					mui.ajax('http://10.36.132.15:3000/api/news',{
						data:{
							
						},
						jsonp:'callback',
						dataType:'jsonp',//服务器返回json格式数据
						type:'get',//HTTP请求类型
						success:function(data){
							console.log(JSON.parse(data)[0].title)
							console.log(JSON.parse(data)[0].img)
							var str='';
							
							var arr=JSON.parse(data)
							
							for(var i=0;i<arr.length;i++){
								var li = document.createElement('li');
								
								li.innerHTML='<li data-id="'+arr[i]._id+'" class="mui-table-view-cell mui-media">'
					        		 	+'<a href="javascript:;">'
					            		+'<img class="mui-media-object mui-pull-left" src="http://10.36.132.15:3000/'+arr[i].img+'">'
					            		+'<div class="mui-media-body">'
					                	+'<p class="mui-ellipsis">'+arr[i].title+'</p>'
					            		+'</div>'
					        			+'</a>'
					    				+'</li>';
								
								news.appendChild(li)
								
							}
							
							if(arr.length-news.childElementCount<=-7){
									flag=false
								}else{
									flag=true
								}
								
								
						}
					});
				
				
				
			}
		}
	})


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
				      newsId:newsid//自定义扩展参数，可以用来处理页面间传值
				    },
			}
			)
		})
})


//mui.init({
//				pullRefresh: {
//					container: '#pullrefresh-discover',
////					down: {
////						callback: pulldownRefresh
////					},
//					up: {
//						contentrefresh: '正在加载...',
//						callback: pullupRefresh
//					}
//				}
//				
//			});
//			/**
//			 * 下拉刷新具体业务实现
//			 */
////			function pulldownRefresh() {
////				setTimeout(function() {
////					var table = document.body.querySelector('.mui-table-view');
////					var cells = document.body.querySelectorAll('.mui-table-view-cell');
////					for (var i = cells.length, len = i + 3; i < len; i++) {
////						var li = document.createElement('li');
////						li.className = 'mui-table-view-cell';
////						li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
////						//下拉刷新，新纪录插到最前面；
////						table.insertBefore(li, table.firstChild);
////					}
////					mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
////				}, 1500);
////			}
//			var count = 0;
//			/**
//			 * 上拉加载具体业务实现
//			 */
//			function pullupRefresh() {
//				setTimeout(function() {
//					mui('#pullrefresh-discover').pullRefresh().endPullupToRefresh((++count > 2)); //参数为true代表没有更多数据了。
//					var table = document.body.querySelector('.mui-table-view');
//					
//					var cells = document.body.querySelectorAll('.mui-table-view-cell');
//					for (var i = cells.length, len = i + 20; i < len; i++) {
//						var li = document.createElement('li');
//						li.className = 'mui-table-view-cell mui-media';
//						li.innerHTML = '<a href="javascript:;">'
//						              +'<img class="mui-media-object mui-pull-left" src="http://placehold.it/40x30">'
//						              +'<div class="mui-media-body">'
//	                
//	                  				  +'<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>'
//	              					  +'</div>'
//	          						 +'</a>';
//						table.appendChild(li);
//						
//					}
//				}, 1500);
//			}
////			if (mui.os.plus) {
////				mui.plusReady(function() {
////					setTimeout(function() {
////						mui('#pullrefresh-discover').pullRefresh().pullupLoading();
////						
////					}, 1000);
////
////				});
////			} else {
////				mui.ready(function() {
////					mui('#pullrefresh-discover').pullRefresh().pullupLoading();
////					
////				});
////			}
//


