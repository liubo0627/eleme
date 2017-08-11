mui.ready(function(){
	var zihao=document.querySelector('#zihao')
	var xuanzhong=document.querySelectorAll('i')
	var zihao_set=document.querySelector('#wrap')
	
	var zhengwen=document.querySelector('.zhengwen')
	var title=document.querySelector('.title')
	var author=document.querySelector('.author')
	var add_time=document.querySelector('.addtime')
	
	var licurrent=document.querySelector('.current')
	var sure=document.querySelector('.sure')
	var cancel=document.querySelector('.cancel')
	var shoucang=document.querySelector('.icon-shoucang')
	
	
	 var storage={
            set:function (key,value) {
                localStorage.setItem(key,JSON.stringify(value));
            },
            get:function (key) {
               return  JSON.parse(localStorage.getItem(key))
            }
        }
	var flag=false;
	
	
	//假定用户信息为wenwang已经登陆
	
	var arrUSER=[];
 mui.plusReady(function(){  /*必须手机测试*/
				     var queryData=plus.webview.currentWebview();
				     
				     console.log(JSON.stringify(queryData));
				     //mui.toast(111)
				     var newsid=queryData.newsId
				     var userid=queryData.userid
				     var userinfo=userid;
				     
				     //mui.toast(newsid)
				    //mui.toast(storage.get('save'))
					shoucang.style.color="black";
					flag=false;		
					var user_id='';
					
				    if(userinfo!=null&&userinfo!='')
				    {
				    	 if(storage.get('save')!=null)
						{
							 arrUSER=storage.get('save');
							 localStorage.clear();
							 console.log(arrUSER.length)
							 for(var i=0;i<arrUSER.length;i++)
							 {
							 
							 (function(i){
							    mui.ajax('http://10.36.132.129:3000/api/userid',{
								data:{
									username:userinfo
								},
								dataType:'jsonp',//服务器返回json格式数据
								type:'get',//HTTP请求类型
								success:function(data){
									var res=JSON.parse(data);					
									user_id=res.result;
									console.log(arrUSER[i])
									var news_id=arrUSER[i];
									mui.ajax('http://10.36.132.129:3000/api/collect/doadd', {
									data: {
										user_id:user_id,
										news_id:news_id
									},
									dataType: 'jsonp', //服务器返回json格式数据
									type: 'post', //HTTP请求类型
									success: function(data) {
										console.log(JSON.parse(data).status)
										if(JSON.parse(data).status == 1) {
											console.log('收藏成功')
											
											//获取收藏信息
											
											mui.ajax('http://10.36.132.129:3000/api/collectfind',{
											data:{
													user_id:user_id,
													news_id:arrUSER[i]
											},
											dataType:'jsonp',//服务器返回json格式数据
											type:'get',//HTTP请求类型
											success:function(data){
											   			
								                if(data.status==1)
								                {
								                		shoucang.style.color='deepskyblue'
														flag=true;
								                }
											}
										});
											
											
											//获取收藏信息
										}
									}
								});
									
									
					               
								}
							})})(i);
					      }
						
							 
							 
						}
						else
						{
							   
							   // console.log(111+news_id)
							   // console.log(222+user_id)
							  mui.ajax('http://10.36.132.129:3000/api/userid',{
								data:{
									username:userinfo
								},
								dataType:'jsonp',//服务器返回json格式数据
								type:'get',//HTTP请求类型
								success:function(data){
									var res=JSON.parse(data);	
									 var news_id=newsid;
									user_id=res.result;  
								mui.ajax('http://10.36.132.129:3000/api/collectfind',{
											data:{
													user_id:user_id,
													news_id:news_id
											},
											dataType:'jsonp',//服务器返回json格式数据
											type:'get',//HTTP请求类型
											success:function(data){
												var res=JSON.parse(data)
											   	console.log('data.status:'+res.status)			
								                if(res.status==1)
								                {
								                		shoucang.style.color='deepskyblue'
														flag=true;
								                }
								                else
								                {
								                		shoucang.style.color="black";
														flag=false;
								                }
											}
										});
							}
						})
						}
				    }
				    else
				    {
				    	     if(storage.get('save')!=null)
							{
								var arr=storage.get('save');
								//查重
								if(arr.indexOf(newsid)!=-1)
								{
									shoucang.style.color='deepskyblue'
									flag=true;
								}
								else
								{
									shoucang.style.color="black";
									flag=false;
								}
							}
							else{
								shoucang.style.color="black"
								flag=false;
							}
				    }
				
					
				mui.ajax('http://10.36.132.129:3000/api/news',{
					data:{
						page:1
					},
					dataType:'jsonp',//服务器返回json格式数据
					type:'get',//HTTP请求类型
					success:function(data){
						var result=JSON.parse(data);
						for(var i=0;i<result.length;i++)
						{
							if(result[i]._id==newsid)
							{
								title.innerHTML=result[i].title;
								author.innerHTML=result[i].author;
								var date=new Date(result[i].add_time);
								updatetime=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
								add_time.innerHTML=updatetime;
								zhengwen.innerHTML=result[i].content;
								break;
							}
						}
						//获得服务器响应
						
						//mui.toast(JSON.parse(data).length)					
		               
					}
				});
				     
				     
				   
					
			  //收藏
		    
		    var arrSave=[];
		//  var arrSave=storage.get('save');				
			shoucang.addEventListener('click',function(){
		    	if(!flag)
		    	{
		    		 mui.alert('收藏成功','','确定',function(){	    		 	
		    		
		    		
		    		if(userinfo!=null&&userinfo!='')
				    {
							 mui.ajax('http://10.36.132.129:3000/api/userid',{
								data:{
									username:userinfo
								},
								dataType:'jsonp',//服务器返回json格式数据
								type:'get',//HTTP请求类型
								success:function(data){
									var res=JSON.parse(data);					
									user_id=res.result;
									console.log(user_id)
									var news_id=newsid;
									console.log(news_id)
									mui.ajax('http://10.36.132.129:3000/api/collect/doadd', {
										data: {
											user_id,
											news_id
										},
										dataType: 'jsonp', //服务器返回json格式数据
										type: 'post', //HTTP请求类型
										success: function(data) {
											console.log(JSON.parse(data).status)
											if(JSON.parse(data).status == 1) {
												console.log('收藏成功')
											}
										}
								  });									
					               
								}
							});
					  shoucang.style.color='deepskyblue'
		    		 	flag=true;
				    }
				    else
				    {
				    		 if(!storage.get("save"))
				            {
				                arrSave.push(newsid);
				                storage.set("save",arrSave);
				            }
				            else
				            {
				//              console.log(storage.get("weibo"));
				                arrSave=storage.get("save");
				                arrSave.push(newsid);
				                storage.set("save",arrSave);
				            }
				             shoucang.style.color='deepskyblue'
		    		 	     flag=true;
				    }
		    		//、、、、、、、、、、、、
		    		 	
		    		 	    		 	
		    		 	
		    		 },{ duration:'long', type:'div' })
		    		
		    		 
		    	}
		    	else
		    	{
		    		
		    		
		    		
		    		
		    		 mui.alert('取消收藏','','确定',function(){
		    		if(userinfo!=null&&userinfo!='')
				    {
				    	
							 mui.ajax('http://10.36.132.129:3000/api/userid',{
								data:{
									username:userinfo
								},
								dataType:'jsonp',//服务器返回json格式数据
								type:'get',//HTTP请求类型
								success:function(data){
									var res=JSON.parse(data);					
									user_id=res.result;
									console.log(user_id)
									var news_id=newsid;
									mui.ajax('http://10.36.132.129:3000/api/collect/dodelet', {
										data: {
											user_id,
											news_id
										},
										dataType: 'jsonp', //服务器返回json格式数据
										type: 'post', //HTTP请求类型
										success: function(data) {
											console.log(JSON.parse(data).status)
											if(JSON.parse(data).status == 1) {
												console.log('收藏删除成功')
											}
										}
								  });									
					               
								}
							});
							shoucang.style.color="black"
				    		flag=false;	
					 
				    }
				    else
				    {
				    			shoucang.style.color="black"
				    		 	 flag=false;	 	 
				    		 	 arrSave=storage.get("save");
				    		 	 for(var a=0;a<arrSave.length;a++)
				    		 	 {
				    		 	 	//查找到当前文章id,删除，假定为0
				    		 	 	if(arrSave[a]==newsid)
				    		 	 	{
				    		 	 		arrSave.splice(a,1);
				    		 	 		storage.set("save",arrSave);
				    		 	 		break;
				    		 	 	}
				    		 	 }
				    }
		    		//、、、、、、、、、、、、
		    		 	
		    		 	
		    		 	
		    		 	
		    		 
		    		 	 
		    		 },{ duration:'long', type:'div' })
		    		 
		    		
		    	}
		    })
				     
				     
})
	
	
	
	
	
	

	
	zihao.addEventListener('tap',function(){
		zihao_set.style.display='block'
		document.querySelector('body').style.overflow='hidden'
	})
	var lis=document.querySelectorAll('li')
	console.log(lis.length)
	for(var i=0;i<lis.length;i++)
	{
		lis[i].index=i;
		lis[i].addEventListener('tap',function(){
			console.log(this.index)
			for(var j=0;j<lis.length;j++)
			{
				lis[j].className=''
				xuanzhong[j].className=''
			}
			this.className='current'
			xuanzhong[this.index].className='iconfont icon-xuanzhong active'
		})
	}
	console.log(licurrent.index)
	
	sure.addEventListener('tap',function(){
		licurrent=document.querySelector('.current')
		switch(licurrent.index)
		{
			case 0:zhengwen.style.fontSize='.3rem';zhengwen.style.lineHeight='.3rem';zihao_set.style.display='none';
			document.querySelector('body').style.overflow='auto'
			break;
			case 1:zhengwen.style.fontSize='.22rem';zhengwen.style.lineHeight='.24rem';zihao_set.style.display='none';
			document.querySelector('body').style.overflow='auto'
			break;
			case 2:zhengwen.style.fontSize='.18rem';zhengwen.style.lineHeight='.2rem';zihao_set.style.display='none';
			document.querySelector('body').style.overflow='auto'
			break;
			case 3:zhengwen.style.fontSize='.14rem';zhengwen.style.lineHeight='.16rem';zihao_set.style.display='none';
			document.querySelector('body').style.overflow='auto'
			break;
			
		}
	})
	
	
    cancel.addEventListener('tap',function(){
    	zihao_set.style.display='none';
    	document.querySelector('body').style.overflow='auto'
    })
    
  
    

})