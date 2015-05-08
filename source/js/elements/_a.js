// 初始化所有 A 标签，使用delegate方式绑定事件



_p.el.links = {
	is_init:	false,
	
	// 点击事件
	click: function(el, e){
		var href = el.attr('href')
		/*
			,is_functional = href
								? (href.substr(0, 1) == '#' || href.substr(0,11).toLowerCase() == 'javascript:')
								: true
								*/

		// 带有 .disabled 的链接点击无效
		if( el.hasClass('disabled') ){
			if( e ){
				e.preventDefault()
				e.stopImmediatePropagation();
				e.stopPropagation()
			}
			return false
		}
	},

	init: function(tar){
		if( !_p.el.links.is_init ){			
			$body.on( 'click.link_delegate', 'a', function(e){
				var el = $(this)
				_p.el.links.click($(this), e)
			});

			_p.el.links.is_init = true
		}
	}
}
