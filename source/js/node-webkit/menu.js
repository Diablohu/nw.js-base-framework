_frame.app_menu = {
	//is_init: false,

	init: function(){
		if( _frame.app_menu.is_init )
			return true

		// 创建各种菜单
			_frame.app_menu.menus = {}


		// 事件委托
			$body.on('contextmenu.contextmenu_image', 'img', function(e){
				var img = $(this)
				attr_contextmenu = img.attr('contextmenu')
				if( !attr_contextmenu || !attr_contextmenu == 'disabled' || attr_contextmenu == 'false' ){
					e.preventDefault()
					var menu = new node.gui.Menu()
						,src = node.path.normalize(img.attr('src'))
						,paths = src.split('\\')
					menu.append(new node.gui.MenuItem({
							'label': 	'保存图片',
							'click': function(){
								if( !_frame.dom.hidden_saveform )
									_frame.dom.hidden_saveform = $('<input type="file" nwsaveas/>')
											.on('change', function(){
												var input = _frame.dom.hidden_saveform
													,dest = input.val()
												input.attr('nwsaveas', '').val('')

												if( dest ){
													var cbCalled = false
														,rd = node.fs.createReadStream(src)
													rd.on("error", function(err) {
														done(err);
													});
													var wr = node.fs.createWriteStream(dest);
														wr.on("error", function(err) {
														done(err);
													});
													wr.on("close", function(ex) {
														done();
													});
													rd.pipe(wr);
													function done(err) {
														if (!cbCalled) {
															//callback(err, src, dest);
															cbCalled = true;
														}
													}
												}
											})
											.appendTo( _frame.dom.hidden )
								_frame.dom.hidden_saveform
									.attr(
										'nwsaveas',
										img.data('filename') || ''
									).trigger('click')
							}
						}));
					menu.popup(e.clientX, e.clientY);
					return false
				}
			})

		_frame.app_menu.is_init = true
	}
}