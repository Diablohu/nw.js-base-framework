// define and require node.js libraries & modules
var node = {
	'require': 	function(module, only_require){
		if( !node[module] && !only_require ){
			node[module] = require(module)
		}if( only_require ){
			return require(module)
		}
		return node[module]
	}
}


node.gui 		= node.require('nw.gui', true)
node.win 		= node.gui.Window.get()
node.clipboard 	= node.gui.Clipboard.get();

node.require('path')
node.require('fs')


if(typeof debugmode == 'undefined')
	var debugmode = false
						|| (
							node.gui.App.manifest['debug']
							|| node.gui.App.manifest['window']['debug']
							|| ( global.launcherOptions && (global.launcherOptions['debug'] || global.launcherOptions['window']['debug']) )
						)



// _g.root, nw.js 程序运行目录
	_g.root = node.path.dirname(process.execPath).split(node.path.sep)
	_g.root = (_g.root[_g.root.length - 1] == 'nwjs' && node.path.basename( process.execPath ) == 'nw.exe')
					? process.cwd()
					: node.path.dirname(process.execPath)
	// 对app根目录再做检查，如果不存在，则指向到缓存目录
	// 该情况通常发生于使用launcer启动时
		try{
			var stat = node.fs.lstatSync( node.path.join( _g.root , '/app/main.html' ) )
		}catch(e){
			_g.root	= node.path.join( node.gui.App.dataPath, '/Extracted Data/')
		}
