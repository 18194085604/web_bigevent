(function() {
	$('#link_reg').on('click', function() {
		$('.login-box').css('display', 'none')
		$('.reg-box').show()
	})
	$('#link_login').on('click', function() {
		$('.reg-box').css('display', 'none')
		$('.login-box').show()
	})

	var form = layui.form
	var layer = layui.layer;
	form.verify({
		pwd: [
			/^[\S]{5,12}$/, '密码必须6到12位，且不能出现空格'
		],
		repwd:function(value){
			var pwd = $('.reg-box [name=password]').val()
			console.log(value);
			console.log(pwd);
			if(pwd!==value){
				return '两次密码不一样'
			}
			
		}
	})
	$('#form_reg').on('submit',function(e){
		e.preventDefault()
		$.post('/api/reguser',
			{username:$('#form_reg [name=username]').val(),
			 password:$('#form_reg [name=password]').val()},
			 function(res){
				 if(res.status!==0){
					 return layer.msg(res.message)
				 }
				 layer.msg('注册成功，请登陆！！！')
			 }
		)
	})
	$('#form_login').on('submit',function(e){
		e.preventDefault()
		$.ajax({
			url: '/api/login',
			method: 'POST',
			data: $(this).serialize(),
			success:function(res){
				if(res.status!==0){
					return layer.msg('登陆失败！！！');
				}
				layer.msg('登陆成功！！！')
				console.log(res.token);
				location.href = '/index.html'
			}
		})
	})
})();
